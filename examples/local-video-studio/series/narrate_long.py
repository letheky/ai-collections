import os,sys,json,re,gc,math,subprocess
from pathlib import Path

import os
_bundle_override=os.environ.get('LOCAL_VIDEO_STUDIO')
_bundle=Path(_bundle_override).resolve() if _bundle_override else next(p for p in Path(__file__).resolve().parents if (p/'studio_config.py').is_file())
import sys
sys.path.insert(0,str(_bundle))
from studio_config import settings

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
os.environ['HF_HOME']=str(settings.voice_cache)
os.environ['HF_HUB_DISABLE_XET']='1'
os.environ['HF_HUB_DOWNLOAD_TIMEOUT']='120'
import numpy as np
import soundfile as sf
from vieneu import Vieneu
import imageio_ffmpeg
ROOT=Path(sys.argv[1]).resolve();sr=48000
ep=json.loads((ROOT/'episode.json').read_text(encoding='utf-8'))
minimum=ep.get('minimum_duration_seconds',601)
minimum_speech=ep.get('minimum_speech_seconds',540)
scenes=json.loads((ROOT/'scenes.json').read_text(encoding='utf-8'))
tts=Vieneu(mode='v3turbo',device='cpu',backend='onnx',precision='fp32',threads=8)
intro=8.;ending=12.;cursor=intro
waves=[np.zeros(round(intro*sr),dtype=np.float32)];subtitles=[];timeline=[];speech=0.
for i,scene in enumerate(scenes):
    start=cursor
    for j,text in enumerate(scene['sentences']):
        path=ROOT/'audio'/f'{i:02d}-{j:03d}.wav'
        if path.exists():audio,rate=sf.read(path,dtype='float32')
        else:
            audio=np.asarray(tts.infer(text,voice='Ngọc Linh',apply_watermark=False),dtype=np.float32).reshape(-1);rate=sr
            if not np.isfinite(audio).all() or len(audio)<sr/3:raise RuntimeError('Invalid narration chunk')
            peak=float(np.max(np.abs(audio)))
            if peak>.95:audio*=.95/peak
            raw=path.with_suffix('.raw.wav');sf.write(raw,audio,sr)
            subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-y','-i',str(raw),'-af','atempo=0.95','-ar',str(sr),str(path)],check=True)
            audio,rate=sf.read(path,dtype='float32');raw.unlink()
        if rate!=sr:raise RuntimeError('Unexpected audio rate')
        duration=len(audio)/sr;speech+=duration
        subtitles.append(dict(start=cursor,end=cursor+duration,text=text));waves.append(audio);cursor+=duration
        waves.append(np.zeros(round(.32*sr),dtype=np.float32));cursor+=.32
        print(f'{ROOT.name}: chapter {i+1}/{len(scenes)}, chunk {j+1}/{len(scene["sentences"])}',flush=True)
    waves.append(np.zeros(round(.8*sr),dtype=np.float32));cursor+=.8
    timeline.append(dict(**scene,start=start,end=cursor))
waves.append(np.zeros(round(ending*sr),dtype=np.float32))
audio=np.concatenate(waves);duration=len(audio)/sr
if duration<=minimum or speech<minimum_speech:raise RuntimeError(f'Expand script: duration={duration:.1f}s, speech={speech:.1f}s. No silent padding is added to meet the length requirement.')
sf.write(ROOT/'audio'/'narration.wav',audio,sr)
# Original quiet ambient bed, kept below narration; no external music dependency.
t=np.arange(len(audio),dtype=np.float64)/sr
pad=sum((np.sin(2*np.pi*f*t+.4*np.sin(t*.12))*.0025).astype('float32') for f in [130.8128,164.8138,195.9977])
env=np.minimum(1,t/4)*np.minimum(1,(duration-t)/5)
sf.write(ROOT/'audio'/'soundtrack.wav',np.clip(audio+pad*env,-.98,.98),sr)
data=dict(duration=duration,speech_duration=speech,sample_rate=sr,voice='Ngọc Linh',scenes=timeline,subtitles=subtitles,intro=intro,ending=ending)
(ROOT/'timeline.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
def stamp(t):
    ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(ROOT/'subtitles.vi.srt').write_text('\n'.join(f'{i}\n{stamp(s["start"])} --> {stamp(s["end"])}\n{s["text"]}\n' for i,s in enumerate(subtitles,1)),encoding='utf-8')
ep=json.loads((ROOT/'episode.json').read_text(encoding='utf-8'))
style=' Photorealistic nature documentary footage, natural colors, one continuous shot with visible natural motion, no cuts, no text, no logos.'
camera=['Camera slowly glides forward in a wide view.','Camera smoothly tracks sideways at a moderate distance.','Camera gently approaches the main subject while preserving a natural perspective.','Camera slowly drifts backward to reveal the surrounding landscape.']
shots=[dict(id='00-intro',start=0.,end=intro,prompt=scenes[0]['visual']+'. '+camera[0]+style)]
for i,scene in enumerate(timeline):
    # Anchor cuts to actual narration chunk boundaries, splitting long chunks into moving takes.
    cues=[s for s in subtitles if scene['start']<=s['start']<scene['end']]
    starts=[scene['start']]
    for cue in cues:
        if cue['start']-starts[-1]>=4.5:starts.append(cue['start'])
        while cue['end']-starts[-1]>8.5:starts.append(starts[-1]+6.5)
    if scene['end']-starts[-1]<3 and len(starts)>1:starts.pop()
    bounds=starts+[scene['end']]
    for j,(a,b) in enumerate(zip(bounds,bounds[1:])):
        spoken=' '.join(s['text'] for s in cues if s['start']<b and s['end']>a)
        shots.append(dict(id=f'{i+1:02d}-scene-{j+1:02d}',start=a,end=b,chapter=scene['chapter'],narration=spoken,source_urls=scene['source_urls'],prompt=scene['visual']+'. '+camera[j%len(camera)]+style))
shots.append(dict(id='99-credits',start=timeline[-1]['end'],end=duration,prompt=scenes[-1]['visual']+'. '+camera[3]+style))
plan=dict(title=ep['title'],duration=duration,model='Wan2.2-TI2V-5B',width=832,height=480,frames=121,fps=24,steps=40,output_width=1920,output_height=1080,shots=shots)
(ROOT/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(dict(duration=duration,speech_duration=speech,shots=len(shots))),flush=True)
