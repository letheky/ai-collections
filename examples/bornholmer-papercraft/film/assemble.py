# Assemble the papercraft draft of the film: Ken Burns moves over 2400x1350 stills, three pop-up clips, crossfades,
# narration with per-sentence subtitles (script text, not ASR), an intro title, loudness to -14 LUFS.
import json, os, subprocess, glob, numpy as np
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__)); SH = f"{D}/shots"
W, H, FPS, XF = 1920, 1080, 25, 10          # output, crossfade frames
T = json.load(open(f"{D}/timing.json")); SR = T["sr"]
LEAD, GAP, INTRO_AFTER, INTRO = 0.6, 0.6, "N00b", 4.0

PLAN = {   # segment -> shots (stills by name, V_* = pop-up clips); time is split evenly
  "N00a": ["V_berlin", "B_closed_crowd"], "N00c": ["B_closed_barrier"], "N00b": ["B_closed_officer"],
  "INTRO": ["M_city"],
  "N02a": ["M_city", "M_city_west"], "N02b": ["M_city_bridge", "B_bridge_empty"], "N01a": ["B_closed_booth", "B_closed_crowd"],
  "N03a": ["V_map", "M_city_wall"], "N03b": ["M_city_wall", "B_closed_wide"], "N04a": ["M_europe", "M_europe_hun"],
  "N04b": ["M_europe_cssr", "M_europe"], "N05b": ["M_demo"], "N06b": ["P_desk"], "N07a": ["P_desk", "P_wide"],
  "N07b": ["P_desk", "B_closed_booth"], "N08a": ["P_desk"], "N10a": ["V_press", "P_spk"], "N10b": ["P_wide", "P_table"],
  "N11a": ["P_spk"], "N11b": ["P_spk", "P_table"], "N09a": ["P_desk", "B_closed_barrier"], "N13a": ["P_news"],
  "N13b": ["P_news", "B_closed_crowd"], "N14b": ["B_closed_officer", "B_closed_booth"], "N15b": ["B_few_bridge", "B_closed_barrier"],
  "N16a": ["B_few_bridge"], "N16b": ["B_few_bridge", "B_closed_officer"], "N17b": ["B_closed_crowd", "B_closed_wide"],
  "N20a": ["B_closed_wide", "B_closed_crowd"], "N21a": ["B_closed_barrier", "B_open_barrier"], "N21b": ["V_flow", "B_open_bridge"],
  "N22a": ["B_closed_officer", "B_morning_wide"], "N23a": ["M_city", "B_open_wide"], "N23b": ["V_back"],
}
TAGS = {"N10b": "Chèn băng gốc: họp báo 9.11.1989", "N23b": "Chèn ảnh tư liệu: 10.11.1989"}

# ---- timeline ---------------------------------------------------------------------------------------------------------
segs, t = [], LEAD
for s in T["segs"]:
    segs.append({"id": s["id"], "start": t, "dur": s["dur"], "sents": s["sents"]}); t += s["dur"] + GAP
    if s["id"] == INTRO_AFTER: segs.append({"id": "INTRO", "start": t, "dur": INTRO - GAP, "sents": []}); t += INTRO
TOTAL = t + 1.0
slots = []   # (shot, start, dur)
for k, sg in enumerate(segs):
    end = segs[k + 1]["start"] if k + 1 < len(segs) else TOTAL
    names = PLAN[sg["id"]]; span = end - sg["start"]
    fixed = {n: len(glob.glob(f"{SH}/{n}/*.png")) / FPS for n in names if n.startswith("V_")}
    rest = (span - sum(fixed.values())) / max(1, len([n for n in names if not n.startswith("V_")]))
    tt = sg["start"] if k else 0.0
    if k == 0: span += sg["start"]; rest += sg["start"] / max(1, len([n for n in names if not n.startswith("V_")]))
    for n in names:
        d = fixed.get(n, rest); slots.append((n, tt, d)); tt += d

# ---- frames -------------------------------------------------------------------------------------------------------------
cache = {}
def still(n):
    if n not in cache: cache[n] = Image.open(f"{SH}/{n}.png").convert("RGB")
    return cache[n]
def kb(n, i, u):
    """Ken Burns: u in [0,1] over the shot; alternate zoom in / out and pan direction by occurrence index i."""
    im = still(n); iw, ih = im.size
    z0, z1 = (1.0, 1.13) if i % 2 == 0 else (1.13, 1.0)
    e = u * u * (3 - 2 * u); z = z0 + (z1 - z0) * e
    cw, ch = iw / z * (W / iw) * (iw / W), ih / z
    cw = min(iw, iw / z); ch = cw * H / W
    px = [(-1, 0), (1, 0), (0, -1), (0, 1), (1, 1), (-1, -1)][i % 6]
    cx = iw / 2 + px[0] * (iw - cw) / 2 * (e - 0.5) * 0.9; cy = ih / 2 + px[1] * (ih - ch) / 2 * (e - 0.5) * 0.9
    box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
    return np.asarray(im.resize((W, H), Image.BICUBIC, box=box), dtype=np.float32)
def clip_frames(n):
    fs = sorted(glob.glob(f"{SH}/{n}/*.png")); return fs
def frame_of(slot_i, f):
    n, s0, d = slots[slot_i]; occ = sum(1 for k in range(slot_i) if slots[k][0] == n)
    if n.startswith("V_"):
        fs = clip_frames(n); idx = min(len(fs) - 1, f)
        return np.asarray(Image.open(fs[idx]).convert("RGB").resize((W, H), Image.BICUBIC), dtype=np.float32)
    nf = max(1, round(d * FPS)); return kb(n, occ + slot_i, min(1.0, f / nf))

yy, xx = np.mgrid[0:H, 0:W]; rr = ((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2
VIG = (1 - 0.2 * np.clip(rr - 0.25, 0, None) ** 1.2)[..., None].astype(np.float32)
GR = [np.random.default_rng(k).normal(0, 2.2, (H, W, 1)).astype(np.float32) for k in range(6)]
FADE_IN, FADE_OUT = 1.0, 1.8
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                       "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", f"{D}/video_noaudio.mp4"], stdin=subprocess.PIPE)
total_frames = round(TOTAL * FPS)
bounds = [round(s0 * FPS) for _, s0, _ in slots] + [total_frames]
for i in (range(len(slots)) if not os.environ.get('AUDIO_ONLY') else []):
    for f in range(bounds[i + 1] - bounds[i]):
        a = frame_of(i, f)
        if i > 0 and f < XF:   # crossfade from the previous shot continuing its move
            prev_len = bounds[i] - bounds[i - 1]; b = frame_of(i - 1, prev_len + f); w = (f + 1) / (XF + 1); a = a * w + b * (1 - w)
        fr = bounds[i] + f; tsec = fr / FPS
        a = a * VIG + GR[fr % 6]
        k = min(1.0, tsec / FADE_IN, (TOTAL - tsec) / FADE_OUT); a = a * max(0.0, k)
        ff.stdin.write(np.clip(a, 0, 255).astype(np.uint8).tobytes())
    print(slots[i][0], f"{slots[i][1]:.1f}s", flush=True)
ff.stdin.close(); ff.wait()

# ---- audio: narration on the timeline, loudness -14 LUFS / -1.5 dBTP --------------------------------------------------
import soundfile as sf
mix = np.zeros(int(TOTAL * SR) + SR, np.float32)
for sg in segs:
    if sg["id"] == "INTRO": continue
    a, _ = sf.read(f"{D}/seg/{sg['id']}.wav", dtype="float32"); i0 = int(sg["start"] * SR); mix[i0:i0 + len(a)] += a
sf.write(f"{D}/narration.wav", mix, SR)
# narration alone to -16 LUFS (two-pass, after a gentle compressor), so the bed can sit under it
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/narration.wav", "-af", "acompressor=threshold=-22dB:ratio=3:attack=5:release=120:makeup=4dB,alimiter=limit=0.8", "-ar", "48000", f"{D}/narr_c.wav"], check=True)
def norm(src, dst, I):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", src, "-af", f"loudnorm=I={I}:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(r[r.rindex("{"):r.rindex("}") + 1])
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", f"loudnorm=I={I}:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true", "-ar", "48000", dst], check=True)
norm(f"{D}/narr_c.wav", f"{D}/narr_n.wav", -15)
narr, _ = sf.read(f"{D}/narr_n.wav", dtype="float32"); N = len(narr); tt = np.arange(N) / SR
# a quiet score: A-minor pad (detuned sines, slow swells) and sparse felt-piano notes on the chord tones
rng = np.random.default_rng(9)
CH = [[57, 60, 64], [53, 57, 60], [48, 55, 60], [55, 59, 62], [57, 60, 64], [50, 53, 57], [53, 57, 60], [52, 56, 59]]
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
pad = np.zeros(N, np.float32); CL = 8.0
for c in range(int(N / SR / CL) + 2):
    t0 = c * CL; i0 = int(t0 * SR); i1 = min(N, int((t0 + CL + 3) * SR))
    if i0 >= N: break
    seg = tt[i0:i1] - t0; env = np.clip(seg / 2.5, 0, 1) * np.clip((CL + 3 - seg) / 3.0, 0, 1)
    for m in CH[c % len(CH)] + [CH[c % len(CH)][0] - 12]:
        for det in (-0.6, 0.6): pad[i0:i1] += (np.sin(2 * np.pi * (hz(m) + det) * seg) * env * (0.5 if m < 50 else 0.32)).astype(np.float32)
F = np.fft.rfft(pad); fr = np.fft.rfftfreq(N, 1 / SR); F *= 1 / (1 + (fr / 900) ** 2); pad = np.fft.irfft(F, N).astype(np.float32)
pno = np.zeros(N, np.float32)
for k in range(int(N / SR / 3.2)):
    if rng.random() < 0.35: continue
    t0 = k * 3.2 + rng.random() * 0.4; c = int(t0 / CL) % len(CH); m = rng.choice(CH[c]) + 12 * rng.integers(0, 2)
    i0 = int(t0 * SR); L = min(N - i0, int(4 * SR)); seg = np.arange(L) / SR
    note = sum(np.sin(2 * np.pi * hz(m) * j * seg) * np.exp(-seg * (1.2 + j * 0.9)) / j ** 1.5 for j in (1, 2, 3)) * np.clip(seg / 0.01, 0, 1)
    pno[i0:i0 + L] += (note * 0.5).astype(np.float32)
music = pad / (np.abs(pad).max() + 1e-6) * 0.6 + pno / (np.abs(pno).max() + 1e-6) * 0.45
# duck the music under speech (smoothed narration envelope)
env = np.convolve(np.abs(narr), np.ones(SR // 5) / (SR // 5), "same"); env = np.convolve(env, np.ones(SR // 2) / (SR // 2), "same")
duck = 1 - 0.6 * np.clip(env / (env.max() * 0.25), 0, 1)
music = music * duck * 0.085
# soft paper flaps at each cut (noise, low-passed, short, quiet)
flap = np.zeros(N, np.float32)
for _, s0, _ in slots[1:]:
    i0 = int(s0 * SR); L = int(0.22 * SR)
    if i0 + L >= N: continue
    nz = rng.normal(0, 1, L); nz = np.convolve(nz, np.ones(24) / 24, "same"); e = np.exp(-np.arange(L) / SR * 18) * np.clip(np.arange(L) / (0.004 * SR), 0, 1)
    flap[i0:i0 + L] += (nz * e * 0.05).astype(np.float32)
sf.write(f"{D}/mix_pre.wav", narr + music + flap, SR)
norm(f"{D}/mix_pre.wav", f"{D}/narration_norm.wav", -14)

# ---- subtitles (ASS): script sentences at their measured times; intro title; archive tags ---------------------------
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f"{h}:{m:02d}:{s:05.2f}"
ass = ["[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "", "[V4+ Styles]",
       "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
       "Style: Sub,DejaVu Sans,44,&H00F4F7FA,&H00FFFFFF,&H00140F0A,&H96000000,0,0,0,0,100,100,0.5,0,1,2.4,1.6,2,180,180,64,1",
       "Style: Title,DejaVu Serif,86,&H00E6F0F5,&H00FFFFFF,&H00201A14,&H80000000,1,0,0,0,100,100,2,0,1,4,2,5,80,80,80,1",
       "Style: Date,DejaVu Sans,44,&H0064C6FF,&H00FFFFFF,&H00201A14,&H80000000,1,0,0,0,100,100,6,0,1,3,1,5,80,80,80,1",
       "Style: Tag,DejaVu Sans,30,&H00F2F6FA,&H00FFFFFF,&H00201A14,&HA0202A3A,0,1,0,0,100,100,0,0,3,10,0,7,50,50,40,1",
       "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
for sg in segs:
    for a, b, text in sg["sents"]:
        ass.append(f"Dialogue: 0,{ts(sg['start'] + a)},{ts(sg['start'] + b + 0.15)},Sub,,0,0,0,,{text}")
    if sg["id"] == "INTRO":
        ass.append(f"Dialogue: 1,{ts(sg['start'] + 0.2)},{ts(sg['start'] + INTRO - 0.3)},Title,,0,0,0,,{{\\fad(400,400)}}Đêm Bức tường Berlin mở cửa")
        ass.append(f"Dialogue: 1,{ts(sg['start'] + 0.6)},{ts(sg['start'] + INTRO - 0.3)},Date,,0,0,0,,{{\\fad(400,400)\\pos({W//2},{H//2+90})}}9 . 11 . 1989")
    if sg["id"] in TAGS: ass.append(f"Dialogue: 2,{ts(sg['start'])},{ts(sg['start'] + sg['dur'])},Tag,,0,0,0,,{TAGS[sg['id']]}")
open(f"{D}/subs.ass", "w", encoding="utf-8").write("\n".join(ass) + "\n")

if os.environ.get("AUDIO_ONLY"): raise SystemExit("AUDIO_DONE")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/video_noaudio.mp4", "-i", f"{D}/narration_norm.wav", "-vf", f"ass={D}/subs.ass",
                "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
                f"{D}/berlin_papercraft_draft.mp4"], check=True)
json.dump({"segs": [{k: v for k, v in s.items() if k != "sents"} for s in segs], "slots": slots, "total": TOTAL}, open(f"{D}/timeline.json", "w"), ensure_ascii=False, indent=1)
print("FILM_DONE", round(TOTAL, 1))
