# Freefield

> Repo: https://github.com/neuregex/freefield · MIT
>
> ⭐ **229 sao**, 51 fork (GitHub API, 2026-10-30) · Đã test: 2026-10-30
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/Gq4szHmbhpdZrcSdT7GbGE (ComfyUI CPU duyệt 122 workflow + 334 lab case, app smoke chạy thật)

## Là gì

Một "studio" gồm **120 app** sáng tạo (ảnh, video, VFX, audio), bố cục giống Higgsfield nhưng mỗi app là một **workflow ComfyUI trên open weights**. Không có code riêng cho từng app: mỗi app chỉ là thư mục trong `apps/` với một `app.json` và một workflow ComfyUI. Web UI, runner, bản đồ VRAM, tải model và test đều sinh ra từ các manifest đó.
- **Open weights hoàn toàn:** không dùng API hay node trả phí. Mỗi model là một file tải từ Hugging Face, ghi rõ repo, dung lượng, giấy phép.
- **Chạy trên GPU:** qua Modal (dịch vụ GPU đám mây) hoặc GPU của bạn. 70 app vừa card 24 GB, một số app cần Modal (model lớn).
- **Lab LoRA:** 334 case có seed cố định để so sánh và kiểm tra chất lượng.

## Đã test

Máy test **không có GPU**, nên tôi chạy đúng những gì CI chạy mà không cần GPU — gồm cả bước nặng nhất: dựng ComfyUI CPU và cho nó duyệt mọi workflow.

| Bước | Kết quả |
|---|---|
| `npm ci` | ✅ 2,9 giây, 0 lỗ hổng |
| `npm run validate` (validator manifest) | ✅ **120 app, 0 lỗi, 0 cảnh báo** |
| `npm test` | ✅ **40/40 test đạt** |
| `npm run typecheck` (tsc) | ✅ Không lỗi |
| `python -m compileall infra lab tools` | ✅ Sạch |
| `tools/catalog.py all` + `git diff packs docs` | ✅ packs và bản đồ VRAM khớp manifest (không lệch) |
| Dựng ComfyUI 0.42.0 (`e3bee7f`) CPU + 2 custom node đã ghim | ✅ Lên sau ~12 giây (torch lấy từ PyPI vì index pytorch.org bị chặn) |
| `comfy_validate.py --placeholders` (mọi workflow app) | ✅ **122/122 hợp lệ** trong 28 giây |
| `comfy_validate.py --lab lab/cases.json` (mọi lab case) | ✅ **334/334 hợp lệ** trong 80 giây |
| Chạy app **smoke** end-to-end qua ComfyUI | ✅ Ra ảnh 256×256 đúng màu đặt trong workflow (RGB 42,111,151). Chứng minh cả chuỗi runner chạy được trên CPU |
| Chạy app có model (ảnh/video/audio thật) | ⛔ Cần GPU và tải model từ Hugging Face; nhiều app cần Modal (một số đỉnh 27–55 GB VRAM) |

## Kết luận nhanh

✅ Dự án rất chỉn chu về kỹ thuật: mọi thứ sinh từ manifest, validator chặt, test và type check sạch, và quan trọng là **ComfyUI thật chấp nhận toàn bộ 122 workflow và 334 lab case** — không phải chỉ hợp lệ trên giấy. App smoke chạy ra kết quả thật. Là cách hay để có bộ công cụ kiểu Higgsfield mà không khóa vào dịch vụ nào.
⚠️ Để tạo ảnh/video thật bạn cần GPU mạnh (nhiều app cần Modal, đỉnh tới 44–55 GB VRAM) và tải hàng chục GB model từ Hugging Face (một số model cần chấp nhận giấy phép). Đây không phải thứ cài xong là chạy trên laptop. Repo mới (229 sao, tạo 20/10).

## Cài đặt

Trên GPU của bạn (không cần Modal):

```bash
python tools/local_backend.py setup ~/freefield-comfy          # ComfyUI + custom node + proxy
python tools/local_backend.py download ~/freefield-comfy image-flux3 --dry-run   # xem thiếu model gì
python tools/local_backend.py download ~/freefield-comfy image-flux3             # cần HF_TOKEN cho repo gated
python tools/setup_token.py --env-only
python tools/local_backend.py serve ~/freefield-comfy          # :8188 ComfyUI, :8000 gateway
npm install && npm run serve                                   # http://127.0.0.1:3000
```

Cần Node 22+, Python 3.12, và bản PyTorch hợp với GPU của bạn. Xem app nào vừa card của bạn ở `docs/vram-map.md`.
