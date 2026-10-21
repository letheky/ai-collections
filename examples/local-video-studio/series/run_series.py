"""Sequential, resumable long-form queue. Does not manage any other local model service."""
import json,time,subprocess,sys,traceback,shutil,os,argparse
from pathlib import Path
ROOT=Path(__file__).resolve().parent
sys.path.insert(0,str(ROOT.parent))
from studio_config import settings
series=json.loads((ROOT/'series.json').read_text(encoding='utf-8'))

def status(**kw):
    kw['updated_at']=time.strftime('%Y-%m-%d %H:%M:%S')
    p=ROOT/'queue-status.tmp';p.write_text(json.dumps(kw,ensure_ascii=False,indent=2),encoding='utf-8');p.replace(ROOT/'queue-status.json')

def run(args,project,label):
    with (project/(label+'.stdout.log')).open('a',encoding='utf-8') as out,(project/(label+'.stderr.log')).open('a',encoding='utf-8') as err:
        result=subprocess.run([str(x) for x in args],cwd=project,stdout=out,stderr=err)
    if result.returncode:raise RuntimeError(f'{project.name}: {label} failed; see its logs')

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--no-wait',action='store_true');args=parser.parse_args()
    os.environ['PYTHONUTF8']='1';os.environ['LOCAL_VIDEO_STUDIO']=str(ROOT.parent)
    wait_for=(ROOT/series['wait_for']).resolve()
    if not args.no_wait:
        while not wait_for.exists():
            status(phase='waiting-for-demo',wait_for=str(wait_for));time.sleep(15)
    prepared=ROOT/'prepared.json'
    ready=json.loads(prepared.read_text()) if prepared.exists() else {'ready':[]}
    if len(ready['ready'])!=len(series['episodes']):raise RuntimeError('Run studio.py prepare before starting the queue')
    for i,ep in enumerate(series['episodes']):
        project=ROOT/'episodes'/ep['id']
        if (project/'COMPLETE.txt').exists():continue
        if shutil.disk_usage(ROOT).free<15*1024**3:raise RuntimeError('Less than 15 GiB free; stopping before another episode')
        if not (project/'plan.json').exists():
            status(phase='narrating',episode=ep['id'],number=i+1,total=len(series['episodes']))
            run([settings.voice_python,ROOT/'narrate_long.py',project],project,'narration')
        plan=json.loads((project/'plan.json').read_text(encoding='utf-8'))
        if plan['duration']<=601:raise RuntimeError('Episode is not longer than ten minutes')
        status(phase='generating-video',episode=ep['id'],number=i+1,total=len(series['episodes']),duration=plan['duration'],shots=len(plan['shots']))
        run([settings.video_python,project/'produce.py'],project,'generation')
        status(phase='composing',episode=ep['id'],number=i+1,total=len(series['episodes']))
        run([settings.video_python,project/'compose.py'],project,'composition')
        info=json.loads((project/'output/film-info.json').read_text(encoding='utf-8'))
        if info['duration']<=600:raise RuntimeError('Encoded episode is not longer than ten minutes')
        (project/'COMPLETE.txt').write_text(str(project/'output/film.mp4'),encoding='utf-8')
    status(phase='complete',completed=len(series['episodes']),total=len(series['episodes']))

if __name__=='__main__':
    # OS lock releases automatically on a crash. Keep two queue instances from sharing one GPU.
    with (ROOT/'queue.lockfile').open('a+b') as lock:
        lock.seek(0);lock.write(b'0');lock.flush();lock.seek(0)
        try:
            if os.name=='nt':
                import msvcrt
                msvcrt.locking(lock.fileno(),msvcrt.LK_NBLCK,1)
            else:
                import fcntl
                fcntl.flock(lock.fileno(),fcntl.LOCK_EX|fcntl.LOCK_NB)
        except OSError:raise SystemExit('Another series queue is already running')
        try:main()
        except Exception:
            error=traceback.format_exc();(ROOT/'QUEUE-ERROR.txt').write_text(error,encoding='utf-8');status(phase='error',error=error);raise
