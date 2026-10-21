"""Local paths only. No credentials or model downloads are handled here."""
import json,os
from dataclasses import dataclass
from pathlib import Path

BUNDLE=Path(__file__).resolve().parent

def resolve_path(value,base=BUNDLE):
    path=Path(os.path.expandvars(str(value))).expanduser()
    return path.resolve() if path.is_absolute() else (base/path).resolve()

@dataclass(frozen=True)
class Settings:
    ai_home:Path
    wan_repo:Path
    wan_weights:Path
    t5_checkpoint:Path
    tokenizer_dir:Path
    video_python:Path
    voice_python:Path
    voice_cache:Path
    font_path:Path

def load_settings(config_path=None):
    path=Path(config_path) if config_path else BUNDLE/'config.json'
    data=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
    home=resolve_path(os.environ.get('AI_STUDIO_HOME') or data.get('ai_home','.runtime'))
    python_name='Scripts/python.exe' if os.name=='nt' else 'bin/python'
    font='C:/Windows/Fonts/segoeui.ttf' if os.name=='nt' else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    defaults=dict(wan_repo=home/'Wan2.2-official',wan_weights=home/'wan22-work/weights',
        t5_checkpoint=home/'t3-work/weights/models_t5_umt5-xxl-enc-bf16.pth',tokenizer_dir=home/'t3-work/weights/google/umt5-xxl',
        video_python=home/'t3-work/.venv'/python_name,voice_python=home/'voice-work/.venv'/python_name,
        voice_cache=home/'voice-work/hf-cache',font_path=font)
    return Settings(ai_home=home,**{k:resolve_path(data.get(k,v)) for k,v in defaults.items()})

settings=load_settings()
