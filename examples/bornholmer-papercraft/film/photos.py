# Archive photos as prints on paper: white border, soft shadow, slight tilt, credit line printed under each
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
D = "/tmp/claude-0/-home-user-ai-collections/b52dd93b-206a-5a07-81bb-9e25946ecad0/scratchpad"
W, H = 2400, 1350
F = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30); FI = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
def paper(seed, base=(222, 212, 190)):
    r = np.random.default_rng(seed); n = r.normal(0, 1, (H // 6, W // 6)); im = Image.fromarray(((n - n.min()) / (np.ptp(n)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(6))
    a = np.asarray(im, np.float32)[..., None] / 255; fib = r.normal(0, 1, (H, W, 1)).astype(np.float32)
    img = np.array(base, np.float32)[None, None, :] * (0.9 + 0.12 * a) + fib * 3
    yy, xx = np.mgrid[0:H, 0:W]; v = 1 - 0.28 * (((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    return Image.fromarray(np.clip(img * v[..., None], 0, 255).astype(np.uint8))
def print_on(bg, photo, credit, out, ph_h=1000, tilt=-1.6, cx=0.5, cy=0.42, grade=(1.0, 0.98, 0.93)):
    p = Image.open(photo).convert("RGB"); w = int(p.width * ph_h / p.height); p = p.resize((w, ph_h), Image.LANCZOS)
    a = np.asarray(p, np.float32) * np.array(grade); p = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    b = 34; card = Image.new("RGB", (w + 2 * b, ph_h + 2 * b + 70), (246, 242, 232)); card.paste(p, (b, b))
    fs = 30
    while fs > 16 and ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", fs).getlength(credit) > w: fs -= 1
    ImageDraw.Draw(card).text((b, ph_h + b + 18), credit, font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", fs), fill=(70, 62, 52))
    sh = Image.new("L", card.size, 0); sh = Image.new("L", (card.width + 80, card.height + 80), 0); ImageDraw.Draw(sh).rectangle((40, 40, 40 + card.width, 40 + card.height), fill=150); sh = sh.filter(ImageFilter.GaussianBlur(22))
    cardR = card.rotate(tilt, Image.BICUBIC, expand=True, fillcolor=(0, 0, 0)); mask = Image.new("L", card.size, 255).rotate(tilt, Image.BICUBIC, expand=True); shR = sh.rotate(tilt, Image.BICUBIC, expand=True)
    x = int(W * cx - cardR.width / 2); y = int(H * cy - cardR.height / 2)
    bg = bg.copy(); dark = Image.new("RGB", shR.size, (40, 28, 18)); bg.paste(dark, (x - 40 + 18, y - 40 + 26), shR); bg.paste(cardR, (x, y), mask); bg.save(out)
print_on(paper(3), f"{D}/arch/danigel_1989-11-10.jpg", "Bösebrücke, Bornholmer Straße, 10.11.1989 · Ảnh: Gerd Danigel · CC BY 3.0 · Wikimedia Commons", f"{D}/film/shots/A_danigel.png", ph_h=930, tilt=-1.4)
print_on(paper(5, (214, 206, 186)), f"{D}/arch/schabowski_1989-11-09.jpg", "Họp báo, Berlin, 9.11.1989 · Ảnh: Bundesarchiv, Bild 183-1989-1109-030 / Thomas Lehmann · CC BY-SA 3.0 de", f"{D}/film/shots/A_schabowski.png", ph_h=930, tilt=1.2, grade=(1.0, 1.0, 1.0))
print("ok")
