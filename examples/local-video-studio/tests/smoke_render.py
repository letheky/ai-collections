"""CPU-only composition smoke: generated test pattern and tone, never private footage."""
import json,os,shutil,subprocess,sys,tempfile
from pathlib import Path
import imageio_ffmpeg

BASE=Path(__file__).resolve().parents[1]
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()

def main():
    with tempfile.TemporaryDirectory() as tmp:
        root=Path(tmp)
        for folder in ['shots','audio','output']:(root/folder).mkdir()
        shutil.copy2(BASE/'runtime/compose.py',root/'compose.py')
        shot={'id':'test','start':0.,'end':5.,'prompt':'Synthetic moving test pattern'}
        plan={'title':'KIỂM TRA TIẾNG VIỆT','duration':5.,'model':'synthetic-test-fixture','width':832,'height':480,'frames':121,'fps':24,'steps':0,'shots':[shot]}
        timeline={'duration':5.,'intro':5.,'ending':0.,'scenes':[{'start':0.,'end':5.,'chapter':'01 / KIỂM TRA'}],'subtitles':[{'start':1.,'end':4.,'text':'Phụ đề tiếng Việt để kiểm tra bố cục.'}]}
        for name,value in [('plan.json',plan),('timeline.json',timeline)]:
            (root/name).write_text(json.dumps(value,ensure_ascii=False),encoding='utf-8')
        subprocess.run([ffmpeg,'-v','error','-y','-f','lavfi','-i','testsrc2=size=832x480:rate=24','-frames:v','121','-c:v','libx264','-threads','2','-pix_fmt','yuv420p',str(root/'shots/test.mp4')],check=True)
        subprocess.run([ffmpeg,'-v','error','-y','-f','lavfi','-i','sine=frequency=440:sample_rate=48000:duration=5','-c:a','pcm_s16le',str(root/'audio/soundtrack.wav')],check=True)
        env=dict(os.environ,LOCAL_VIDEO_STUDIO=str(BASE),PYTHONUTF8='1')
        subprocess.run([sys.executable,str(root/'compose.py'),'--preview'],check=True,env=env)
        info=json.loads((root/'output/preview-info.json').read_text(encoding='utf-8'))
        assert info['frames']==120 and info['duration']==5.
        assert (info['width'],info['height'])==(1920,1080)
        assert info['audio_rms']>.005
        assert not (root/'READY.txt').exists()
        print('PASS: 120 frames, 1080p, Vietnamese overlays, decoded audio; no production-ready marker')

if __name__=='__main__':main()
