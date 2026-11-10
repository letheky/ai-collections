"""Chạy cli.py của MoneyPrinterTurbo, ép edge-tts đi qua proxy HTTPS_PROXY (MoneyPrinterTurbo không tự truyền proxy cho edge-tts).
Dùng: python run_mpt.py <đường dẫn MoneyPrinterTurbo> <các tham số của cli.py>"""
import os
import runpy
import sys

import edge_tts

_orig = edge_tts.Communicate.__init__


def _init(self, *a, **k):
    if os.environ.get("HTTPS_PROXY"):
        k.setdefault("proxy", os.environ["HTTPS_PROXY"])
    _orig(self, *a, **k)


edge_tts.Communicate.__init__ = _init
os.chdir(sys.argv[1])
sys.path.insert(0, os.getcwd())
sys.argv = ["cli.py"] + sys.argv[2:]
runpy.run_path("cli.py", run_name="__main__")
