"""Small entry point; prepare/status/doctor do not import torch or consume VRAM."""
import argparse,subprocess,sys,os,json,shutil
from pathlib import Path
from studio_config import settings,BUNDLE

def run(args):
    subprocess.run([str(x) for x in args],check=True,cwd=BUNDLE)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['doctor','prepare','run-demo','queue','status'])
    parser.add_argument('--no-wait',action='store_true',help='Start the series without waiting for the demo')
    args=parser.parse_args();os.environ['PYTHONUTF8']='1';os.environ['LOCAL_VIDEO_STUDIO']=str(BUNDLE)
    if args.command=='doctor':
        required={'official Wan source':settings.wan_repo/'wan/textimage2video.py','Wan config':settings.wan_weights/'config.json',
            'Wan VAE':settings.wan_weights/'Wan2.2_VAE.pth','text encoder':settings.t5_checkpoint,'tokenizer':settings.tokenizer_dir,
            'video Python':settings.video_python,'voice Python':settings.voice_python,'font':settings.font_path}
        for name,path in required.items():print(('OK' if path.exists() else 'MISSING')+f' {name}: {path}')
        shards=list(settings.wan_weights.glob('diffusion_pytorch_model-*.safetensors'))
        print(f'Wan transformer shards: {len(shards)} (expected 3)')
        if not all(p.exists() for p in required.values()) or len(shards)!=3:raise SystemExit(1)
    elif args.command=='prepare':run([sys.executable,BUNDLE/'series/prepare.py'])
    elif args.command=='run-demo':
        project=BUNDLE/'demo'
        for folder in ['audio','shots','output','segments']:(project/folder).mkdir(exist_ok=True)
        for name in ['produce.py','compose.py']:shutil.copy2(BUNDLE/'runtime'/name,project/name)
        run([settings.voice_python,BUNDLE/'series/narrate_long.py',project])
        run([settings.video_python,project/'produce.py'])
        run([settings.video_python,project/'compose.py'])
        (project/'COMPLETE.txt').write_text(str(project/'output/film.mp4'),encoding='utf-8')
    elif args.command=='queue':
        run([settings.video_python,BUNDLE/'series/queue.py']+(['--no-wait'] if args.no_wait else []))
    else:
        for path in [BUNDLE/'demo/status.json',BUNDLE/'series/queue-status.json']:
            print(path.relative_to(BUNDLE))
            print(path.read_text(encoding='utf-8') if path.exists() else 'Not started')

if __name__=='__main__':main()
