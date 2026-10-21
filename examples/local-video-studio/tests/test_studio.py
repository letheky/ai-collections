import importlib.util,json,os,py_compile,shutil,sys,tempfile,unittest,subprocess,time
from pathlib import Path

BASE=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(BASE))
from studio_config import load_settings

class StudioTests(unittest.TestCase):
    def test_configuration_uses_one_explicit_ai_home(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);config=root/'config.json';config.write_text(json.dumps({'ai_home':str(root)}))
            old=os.environ.pop('AI_STUDIO_HOME',None)
            try:settings=load_settings(config)
            finally:
                if old is not None:os.environ['AI_STUDIO_HOME']=old
            self.assertEqual(settings.wan_repo,(root/'Wan2.2-official').resolve())
            self.assertEqual(settings.voice_cache,(root/'voice-work/hf-cache').resolve())

    def test_ten_authored_scripts_materialize_without_gpu(self):
        spec=importlib.util.spec_from_file_location('prepare',BASE/'series/prepare.py')
        module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
        episodes=module.SERIES['episodes'];self.assertEqual(len(episodes),10)
        self.assertEqual(len({e['id'] for e in episodes}),10)
        with tempfile.TemporaryDirectory() as tmp:
            module.ROOT=Path(tmp);shutil.copytree(BASE/'series/scripts',module.ROOT/'scripts')
            for episode in episodes:
                self.assertTrue(module.prepare(episode))
                project=module.ROOT/'episodes'/episode['id']
                scenes=json.loads((project/'scenes.json').read_text(encoding='utf-8'))
                self.assertGreaterEqual(len(scenes),12)
                self.assertTrue(all(s['visual'] and s['source_urls'] and s['sentences'] for s in scenes))
                for name in ['produce.py','compose.py']:py_compile.compile(str(project/name),doraise=True)

    def test_runtime_templates_do_not_reference_original_workstation(self):
        for name in ['runtime/produce.py','runtime/compose.py','series/narrate_long.py','series/prepare.py','series/queue.py']:
            text=(BASE/name).read_text(encoding='utf-8')
            self.assertNotIn('E:/AI/',text)
            self.assertNotIn('E:\\AI\\',text)
            py_compile.compile(str(BASE/name),doraise=True)

    def test_final_duration_is_enforced_before_and_after_encoding(self):
        queue=(BASE/'series/queue.py').read_text(encoding='utf-8')
        self.assertIn("plan['duration']<=601",queue)
        self.assertIn("info['duration']<=600",queue)

    def test_second_queue_cannot_acquire_same_os_lock(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);series=root/'series';series.mkdir()
            shutil.copy2(BASE/'studio_config.py',root/'studio_config.py')
            shutil.copy2(BASE/'series/queue.py',series/'queue.py')
            (series/'series.json').write_text(json.dumps({'wait_for':'missing-marker','episodes':[]}))
            python=getattr(sys,'_base_executable',sys.executable)
            env=dict(os.environ,PYTHONUTF8='1')
            first=subprocess.Popen([python,str(series/'queue.py')],stdout=subprocess.PIPE,stderr=subprocess.PIPE,env=env)
            try:
                deadline=time.monotonic()+8
                while not (series/'queue-status.json').exists():
                    if first.poll() is not None:self.fail(first.communicate()[1].decode())
                    if time.monotonic()>deadline:self.fail('Queue did not enter its waiting state')
                    time.sleep(.05)
                second=subprocess.run([python,str(series/'queue.py')],capture_output=True,text=True,env=env,timeout=5)
                self.assertNotEqual(second.returncode,0)
                self.assertIn('already running',second.stderr)
            finally:
                first.terminate();first.communicate(timeout=5)

if __name__=='__main__':unittest.main()
