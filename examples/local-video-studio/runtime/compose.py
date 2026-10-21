import json,math,shutil,subprocess,argparse
from pathlib import Path
import imageio_ffmpeg
import imageio.v2 as imageio
import numpy as np
from PIL import Image,ImageDraw,ImageFont

import os
_bundle_override=os.environ.get('LOCAL_VIDEO_STUDIO')
_bundle=Path(_bundle_override).resolve() if _bundle_override else next(p for p in Path(__file__).resolve().parents if (p/'studio_config.py').is_file())
import sys
sys.path.insert(0,str(_bundle))
from studio_config import settings

ROOT=Path(__file__).parent
ORIGINAL=ROOT
FFMPEG=imageio_ffmpeg.get_ffmpeg_exe()

def ass_time(t):
    cs=round(t*100);return f'{cs//360000}:{cs//6000%60:02d}:{cs//100%60:02d}.{cs%100:02d}'
def escape(s):return s.replace('\\','\\\\').replace('{','(').replace('}',')').replace('\n',r'\N')
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--preview',action='store_true');args=ap.parse_args()
    plan=json.loads((ROOT/'plan.json').read_text(encoding='utf-8'))
    timeline=json.loads((ORIGINAL/'timeline.json').read_text(encoding='utf-8'))
    output=ROOT/'output';output.mkdir(exist_ok=True)
    segments=ROOT/'segments';segments.mkdir(exist_ok=True)
    shots=plan['shots'][:1] if args.preview else plan['shots']
    paths=[]
    for i,shot in enumerate(shots):
        src=ROOT/'shots'/(shot['id']+'.mp4')
        if not src.exists():raise RuntimeError('Missing generated scene: '+str(src))
        frame_total=round(shot['end']*24)-round(shot['start']*24)
        duration=frame_total/24;segment=segments/(shot['id']+('-preview-v3' if args.preview else '-v3')+'.mp4')
        valid=False
        if segment.exists():
            try:
                check=imageio.get_reader(str(segment));valid=check.count_frames()==frame_total;check.close()
            except Exception:valid=False
        if not valid:
            # Retiming uses optical flow on the generated video, then upscale/crop to 16:9.
            # This is not native Full HD generation; the source resolution is retained in metadata.
            factor=(frame_total-1)/(plan['frames']-1)
            vf=f'setpts={factor:.9f}*(PTS-STARTPTS),tpad=stop_mode=clone:stop_duration=1,minterpolate=fps=24:mi_mode=mci:mc_mode=obmc:me_mode=bidir:vsbmc=1,setpts=PTS-STARTPTS,fps=24:start_time=0,tpad=stop_mode=clone:stop_duration=1,trim=end_frame={frame_total},setpts=N/(24*TB),scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,setsar=1'
            cmd=[FFMPEG,'-y','-hide_banner','-loglevel','error','-i',str(src),'-an','-vf',vf,'-fps_mode','passthrough','-frames:v',str(frame_total),'-c:v','libx264','-preset','fast','-crf','18','-threads','8','-pix_fmt','yuv420p',str(segment)]
            subprocess.run(cmd,check=True,cwd=ROOT)
            check=imageio.get_reader(str(segment));actual=check.count_frames();check.close()
            if actual!=frame_total:raise RuntimeError(f'Segment frame count {actual} != {frame_total}: {segment}')
        paths.append(segment)
        print(f'Prepared shot {i+1}/{len(shots)}',flush=True)
    concat=ROOT/('preview-concat.txt' if args.preview else 'concat.txt')
    concat.write_text(''.join("file '"+p.as_posix()+"'\n" for p in paths),encoding='utf-8')
    header='''[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
ScaledBorderAndShadow: yes
WrapStyle: 0
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Subtitle,Segoe UI,43,&H00FFFFFF,&H00FFFFFF,&H60000000,&H60000000,0,0,0,0,100,100,0,0,3,2,0,2,125,125,66,1
Style: Label,Segoe UI,24,&H00FFFFFF,&H00FFFFFF,&H78000000,&H78000000,0,0,0,0,100,100,0,0,3,3,0,9,55,55,38,1
Style: Chapter,Segoe UI,30,&H00FFFFFF,&H00FFFFFF,&H60000000,&H60000000,-1,0,0,0,100,100,0,0,3,4,0,7,55,55,38,1
Style: Title,Segoe UI,76,&H00FFFFFF,&H00FFFFFF,&H40000000,&H80000000,-1,0,0,0,100,100,0,0,1,2,1,5,100,100,0,1
Style: Credits,Segoe UI,36,&H00FFFFFF,&H00FFFFFF,&H40000000,&H80000000,0,0,0,0,100,100,0,0,1,2,1,5,120,120,0,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
    events=[]
    def event(start,end,style,text):events.append(f'Dialogue: 0,{ass_time(start)},{ass_time(end)},{style},,0,0,0,,{text}\n')
    total=5. if args.preview else plan['duration']
    event(0,total,'Label','MINH HỌA TẠO BẰNG AI')
    event(.3,4.7,'Title',r'{\fad(400,500)\fs58}'+escape(plan['title']))
    for scene in timeline['scenes']:
        event(scene['start']+.15,min(scene['start']+4.,scene['end']),'Chapter',r'{\fad(250,500)}'+escape(scene['chapter']))
    for sub in timeline['subtitles']:event(sub['start'],sub['end'],'Subtitle',escape(sub['text']))
    event(timeline['scenes'][-1]['end']+.4,plan['duration']-.5,'Credits',r'{\fad(500,600)}HIỂU ĐÚNG ĐỂ HÀNH ĐỘNG\N\N{\fs29}Nguồn khoa học: NOAA\NMinh họa video: Wan 2.2 · Thuyết minh: VieNeu v3 Turbo\NNhững cảnh quay là mô phỏng AI, không phải tư liệu quan sát.')
    ass=ROOT/('preview.ass' if args.preview else 'film.ass');ass.write_text(header+''.join(events),encoding='utf-8-sig')
    final=output/('layout-preview.mp4' if args.preview else 'film.mp4')
    cmd=[FFMPEG,'-y','-hide_banner','-f','concat','-safe','0','-i',str(concat),'-i',str(ORIGINAL/'audio'/'soundtrack.wav'),'-vf',f"ass={ass.name}",'-c:v','libx264','-preset','fast','-crf','18','-threads','8','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-af','loudnorm=I=-16:TP=-1.5:LRA=9','-t',str(total),'-movflags','+faststart',str(final)]
    with (output/('preview-encode.log' if args.preview else 'encode.log')).open('w',encoding='utf-8') as log:subprocess.run(cmd,check=True,cwd=ROOT,stdout=subprocess.DEVNULL,stderr=log)
    reader=imageio.get_reader(str(final));meta=reader.get_meta_data();count=reader.count_frames()
    if tuple(meta['size'])!=(1920,1080) or abs(meta['duration']-total)>.5 or count<math.floor(total*24)-3:raise RuntimeError('Final video validation failed: '+str(meta))
    times=[1,3] if args.preview else [2]+[round(total*i/12) for i in range(1,12)]
    cols=3;thumbs=[];font=ImageFont.truetype(str(settings.font_path),17)
    for t in times:
        image=Image.fromarray(reader.get_data(min(round(t*24),count-1)))
        thumb=image.resize((640,360));ImageDraw.Draw(thumb).text((12,10),f'{t}s',font=font,fill='white',stroke_width=2,stroke_fill='black');thumbs.append(thumb)
    reader.close()
    sheet=Image.new('RGB',(cols*640,math.ceil(len(thumbs)/cols)*360))
    for i,thumb in enumerate(thumbs):sheet.paste(thumb,((i%cols)*640,(i//cols)*360))
    sheet.save(output/('layout-preview.jpg' if args.preview else 'contact-sheet.jpg'),quality=94)
    # Decode the complete audio track as well, so a corrupt or empty soundtrack cannot be marked ready.
    audio=subprocess.run([FFMPEG,'-v','error','-i',str(final),'-vn','-f','f32le','-ac','1','-ar','16000','-'],stdout=subprocess.PIPE,check=True).stdout
    samples=np.frombuffer(audio,dtype=np.float32)
    if len(samples)<(total-.5)*16000 or float(np.sqrt(np.mean(samples**2)))<.005:raise RuntimeError('Missing/empty soundtrack')
    info=dict(path=str(final),duration=meta['duration'],frames=count,width=1920,height=1080,fps=24,source_resolution=[832,480],upscaled=True,model=plan['model'],generated_shots=len(shots),retiming='optical-flow to narration duration',voice='VieNeu v3 Turbo / Ngọc Linh',audio_rms=float(np.sqrt(np.mean(samples**2))),bytes=final.stat().st_size)
    (output/('preview-info.json' if args.preview else 'film-info.json')).write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding='utf-8')
    if not args.preview:
        shutil.copy2(ORIGINAL/'subtitles.vi.srt',output/'subtitles.vi.srt')
        (ROOT/'READY.txt').write_text(str(final),encoding='utf-8')
        (ROOT/'status.json').write_text(json.dumps(dict(phase='complete',completed=len(shots),total_shots=len(shots),output=str(final)),ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(info,ensure_ascii=True),flush=True)
if __name__=='__main__':main()
