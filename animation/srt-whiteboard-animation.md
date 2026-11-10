# srt-whiteboard-animation

> Repo: https://github.com/geeklee/srt-whiteboard-animation · MIT
>
> ⭐ **5.487 sao**, 860 fork (GitHub API, 2026-11-10) · Đã test: 2026-11-10

## Là gì

Skill cho agent (Claude Code, Codex) biến phụ đề SRT thành video vẽ tay kiểu whiteboard trên nền giấy màu kem (`#F5EBD7`).
- Agent đọc SRT, chia cảnh 25–35 giây, rồi tạo một ảnh nét vẽ (line art) cho mỗi cảnh bằng model tạo ảnh của agent.
- File `annotation.json` chia ảnh thành từng vùng, kèm thứ tự và câu phụ đề tương ứng.
- Script Python cho một bàn tay cầm bút "vẽ" từng vùng theo thứ tự lời kể: đi nét mực trước (`ink`), tô màu sau (`color`).
- Mỗi bước đều dừng lại chờ người duyệt rồi mới làm bước tiếp.

## Đã test

| Bước | Kết quả |
|---|---|
| Đọc `prepare_env.py` | ✅ Chỉ tạo venv riêng và cài 4 thư viện: opencv-python, numpy, av, Pillow |
| Cài thư viện | ✅ 56 giây (tôi tự tạo venv, dùng `opencv-python-headless`) |
| Render cảnh mẫu "khỉ giành chuối" (3 vùng) | ✅ Video 8,6 giây, 1080×600, 60 fps, render trong 41 giây trên 4 vCPU (máy đang render Blender song song). Bàn tay vẽ lần lượt hòn non bộ và khỉ nhỏ, khỉ lớn giật chuối, rồi nhóm trẻ con |
| Tạo ảnh nét vẽ cho SRT của mình | ⛔ Không test: bước này cần model tạo ảnh (công cụ tạo ảnh của agent), repo không tự vẽ |

## Kết luận nhanh

✅ Phần hoạt hình "tay vẽ" miễn phí, chạy CPU nhanh, kết quả giống VideoScribe.
⚠️ Nói "thay thế miễn phí cho VideoScribe" chỉ đúng một nửa: bạn vẫn phải tự có ảnh nét vẽ cho từng cảnh (vẽ tay hoặc dùng model tạo ảnh) và tự chia vùng. Ảnh bàn tay mặc định có in chữ Trung Quốc trên thân bút; nên thay bằng ảnh tay của mình (`assets/drawing-hand.png`).

## Cài đặt

```bash
git clone https://github.com/geeklee/srt-whiteboard-animation ~/.claude/skills/srt-whiteboard-animation
cd ~/.claude/skills/srt-whiteboard-animation
python scripts/prepare_env.py            # in ra ENV_PY=<đường dẫn python>
<ENV_PY> scripts/render_stream_whiteboard.py examples/scene-01-monkey-mountain-banana.png \
  examples/scene-01-monkey-mountain-banana.annotation.json out.mp4 assets/drawing-hand.png \
  --ink-path grid --color-fill contour-wipe
```
