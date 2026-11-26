# VieNeu narration for v7: one sentence per call, trimmed; per-sentence timing for subtitles
import json, re, os, numpy as np, soundfile as sf
from vieneu import Vieneu
txt = open("script.txt", encoding="utf-8").read()
segs = re.findall(r"\[(N\w+)\]\s*\n\s*\n(.+?)(?=\n\s*\n\[|\Z)", txt, re.S)
tts = Vieneu(); v = tts.get_preset_voice("Thiện Minh"); SR = tts.sample_rate
os.makedirs("seg", exist_ok=True)
def trim(a, thr=0.012, pad=0.05):
    env = np.convolve(np.abs(a), np.ones(SR // 100) / (SR // 100), "same"); idx = np.where(env > thr)[0]
    return a if not len(idx) else a[max(0, idx[0] - int(pad * SR)): idx[-1] + int(pad * SR)]
out = []
for code, body in segs:
    body = " ".join(body.split()); sents = [s.strip() for s in re.findall(r"[^.?!:;]+[.?!:;]?", body) if len(s.strip()) > 1]
    f = f"seg/{code}.wav"; tj = f"seg/{code}.json"
    if not os.path.exists(tj):
        parts, times, t = [], [], 0.0
        for s in sents:
            a = trim(tts.infer(text=s, voice=v, temperature=0.3)); times.append([round(t, 3), round(t + len(a) / SR, 3), s])
            parts += [a, np.zeros(int(SR * 0.22), np.float32)]; t += len(a) / SR + 0.22
        sf.write(f, np.concatenate(parts[:-1]), SR); json.dump(times, open(tj, "w"), ensure_ascii=False)
    out.append({"id": code, "sents": json.load(open(tj)), "dur": round(sf.info(f).duration, 3)}); print(code, out[-1]["dur"], flush=True)
json.dump({"sr": SR, "segs": out}, open("timing.json", "w"), ensure_ascii=False, indent=1); print("DONE", round(sum(s["dur"] for s in out), 1))
