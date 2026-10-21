"""Official Wan 2.2 components with a Windows SDPA replacement for FlashAttention.

Model arithmetic and weights belong to Wan-Video/Wan2.2; see THIRD_PARTY.md.
This module intentionally imports only the TI2V implementation, avoiding unrelated
speech/avatar dependencies in wan.__init__.
"""
import sys,types
from pathlib import Path
import torch

_bundle=next(p for p in Path(__file__).resolve().parents if (p/'studio_config.py').is_file())
sys.path.insert(0,str(_bundle))
from studio_config import settings

if not (settings.wan_repo/'wan/textimage2video.py').is_file():
    raise RuntimeError(f'Official Wan source is missing at {settings.wan_repo}. Run studio.py doctor and configure wan_repo.')
pkg=types.ModuleType('wan');pkg.__path__=[str(settings.wan_repo/'wan')];sys.modules['wan']=pkg
from wan.configs.wan_ti2v_5B import ti2v_5B
import wan.modules.attention as attention

def sdpa(q,k,v,q_lens=None,k_lens=None,dropout_p=0.,softmax_scale=None,q_scale=None,causal=False,**kwargs):
    dtype=v.dtype if v.dtype in (torch.float16,torch.bfloat16) else torch.bfloat16
    q=q.transpose(1,2).to(dtype);k=k.transpose(1,2).to(dtype);v=v.transpose(1,2).to(dtype)
    if q_scale is not None:q=q*q_scale
    mask=None
    if k_lens is not None and not bool((k_lens==k.shape[2]).all()):
        mask=torch.arange(k.shape[2],device=k.device)[None,:]<k_lens.to(k.device)[:,None]
        mask=mask[:,None,None,:]
    return torch.nn.functional.scaled_dot_product_attention(q,k,v,attn_mask=mask,dropout_p=dropout_p,is_causal=causal,scale=softmax_scale).transpose(1,2).contiguous()

attention.flash_attention=sdpa
from wan.textimage2video import WanTI2V
import wan.modules.model as model_module
model_module.flash_attention=sdpa
