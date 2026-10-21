import sys,json,time,gc,argparse
from pathlib import Path
ROOT=Path(__file__).parent

import os
_bundle_override=os.environ.get('LOCAL_VIDEO_STUDIO')
_bundle=Path(_bundle_override).resolve() if _bundle_override else next(p for p in Path(__file__).resolve().parents if (p/'studio_config.py').is_file())
import sys
sys.path.insert(0,str(_bundle))
from studio_config import settings

sys.path.insert(0,str(_bundle/'runtime'))
import wan_runtime as runtime
import torch
import imageio.v2 as imageio
from PIL import Image
import wan.textimage2video as wan_pipeline

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--probe',action='store_true'); parser.add_argument('--limit',type=int)
    args=parser.parse_args(); torch.set_num_threads(16)
    plan=json.loads((ROOT/'plan.json').read_text(encoding='utf-8'))
    status={'phase':'loading','total_shots':len(plan['shots']),'completed':0}
    def update(**changes):
        status.update(changes); status['updated_at']=time.strftime('%Y-%m-%d %H:%M:%S')
        temp=ROOT/'status.tmp'; temp.write_text(json.dumps(status,ensure_ascii=False,indent=2),encoding='utf-8');temp.replace(ROOT/'status.json')
    update()
    import copy
    cfg=copy.deepcopy(runtime.ti2v_5B)
    cfg.t5_checkpoint=str(settings.t5_checkpoint)
    cfg.t5_tokenizer=str(settings.tokenizer_dir)
    pipe=runtime.WanTI2V(cfg,str(settings.wan_weights),t5_cpu=False,init_on_cpu=True,convert_model_dtype=True)
    pipe.vae.model.cpu(); torch.cuda.empty_cache()
    class ChunkFFN(torch.nn.Module):
        def __init__(self,m): super().__init__();self.m=m
        def forward(self,x): return torch.cat([self.m(c) for c in x.split(512,dim=1)],dim=1)
    for block in pipe.model.blocks: block.ffn=ChunkFFN(block.ffn)
    todo=[]
    for shot in plan['shots']:
        out=ROOT/'shots'/(shot['id']+'.mp4'); info=out.with_suffix('.json')
        if out.exists() and info.exists():
            record=json.loads(info.read_text())
            if record.get('frames')==plan['frames'] and record.get('steps')==plan['steps']:
                status['completed']+=1;continue
        todo.append(shot)
    if args.limit:todo=todo[:args.limit]
    if not todo:update(phase='shots-complete');return
    negative=cfg.sample_neg_prompt
    cache={}
    update(phase='encoding-prompts')
    encoder=pipe.text_encoder
    encoder.model.to('cuda')
    with torch.inference_mode():
        for index,text in enumerate([negative]+[s['prompt'] for s in todo]):
            cache[text]=[c.cpu() for c in encoder([text],torch.device('cuda'))]
            print(f'Prompt {index+1}/{len(todo)+1}',flush=True)
    encoder.model.cpu(); del encoder; pipe.text_encoder=None;gc.collect();torch.cuda.empty_cache()
    class CachedEncoder:
        model=torch.nn.Identity()
        def __call__(self,texts,device): return [cache[t][0].to(device) for t in texts]
    pipe.text_encoder=CachedEncoder()
    model=pipe.model
    mode='full-gpu'
    def block_offload():
        nonlocal mode
        mode='block-offload';model.cpu();torch.cuda.empty_cache()
        for b in model.blocks:
            b.register_forward_pre_hook(lambda m,args:m.to('cuda') and None)
            b.register_forward_hook(lambda m,args,out:(m.cpu(),out)[1])
        for name,child in model.named_children():
            if name!='blocks':child.to('cuda')
        class Guard(torch.nn.Module):
            def __init__(self,m):super().__init__();self.m=m
            def forward(self,*args,**kw):return self.m(*args,**kw)
            def to(self,*args,**kw):return self
            def cpu(self):return self
        pipe.model=Guard(model)
    original_decode=pipe.vae.decode
    current={}
    def decode(zs):
        update(phase='decoding',step=current['steps'])
        torch.save([z.cpu() for z in zs],ROOT/'shots'/(current['id']+'.latents.pt'))
        pipe.vae.model.to('cuda');torch.cuda.empty_cache()
        return original_decode(zs)
    pipe.vae.decode=decode
    def progress(seq):
        for i,t in enumerate(seq):
            if i%5==0:update(phase='denoising',step=i,steps=current['steps'],memory_mode=mode)
            yield t
            print(f'{current["id"]}: {i+1}/{current["steps"]}',flush=True)
    wan_pipeline.tqdm=progress
    for index,shot in enumerate(todo):
        current.update(id=shot['id'],steps=2 if args.probe else plan['steps'])
        out=ROOT/'shots'/(shot['id']+('-probe' if args.probe else '')+'.mp4')
        update(phase='denoising',shot=shot['id'],step=0,steps=current['steps'])
        started=time.monotonic()
        while True:
            failed=False
            try:
                torch.cuda.reset_peak_memory_stats()
                with torch.inference_mode():
                    video=pipe.generate(shot['prompt'],size=(plan['width'],plan['height']),frame_num=plan['frames'],sampling_steps=current['steps'],seed=1000+plan['shots'].index(shot),offload_model=True)
            except torch.OutOfMemoryError:
                if mode!='full-gpu':raise
                failed=True
            if not failed:break
            gc.collect();torch.cuda.empty_cache();block_offload()
            update(phase='retrying-with-offload');print('Retrying with CPU block offload',flush=True)
        # Release VAE before converting/writing frames to avoid unnecessary GPU pressure.
        pipe.vae.model.cpu();torch.cuda.empty_cache()
        frames=((video.cpu().float().clamp(-1,1)+1)*127.5).round().byte().permute(1,2,3,0).numpy()
        with imageio.get_writer(str(out),fps=plan['fps'],codec='libx264',quality=9,macro_block_size=1) as writer:
            for frame in frames:writer.append_data(frame)
        for tag,n in [('first',0),('middle',len(frames)//2),('last',len(frames)-1)]:
            Image.fromarray(frames[n]).save(out.with_name(out.stem+'-'+tag+'.jpg'),quality=92)
        reader=imageio.get_reader(str(out));count=reader.count_frames();shape=reader.get_data(0).shape;reader.close()
        if count!=plan['frames'] or shape[:2]!=(plan['height'],plan['width']):raise RuntimeError('Shot validation failed')
        record=dict(**shot,model=plan['model'],frames=count,steps=current['steps'],width=plan['width'],height=plan['height'],fps=plan['fps'],seed=1000+plan['shots'].index(shot),elapsed_seconds=time.monotonic()-started,peak_GiB=torch.cuda.max_memory_allocated()/2**30,memory_mode=mode)
        out.with_suffix('.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
        status['completed']+=1;update(phase='shot-complete',last_elapsed_seconds=record['elapsed_seconds'])
        print(json.dumps(record,ensure_ascii=True),flush=True)
        del video,frames;gc.collect();torch.cuda.empty_cache()
        if args.probe:break
    update(phase='probe-complete' if args.probe else 'shots-complete')
if __name__=='__main__':
    try:main()
    except Exception:
        import traceback
        (ROOT/'ERROR.txt').write_text(traceback.format_exc(),encoding='utf-8');raise
