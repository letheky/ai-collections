# Shorts "3 điều thú vị về cà phê Việt Nam"

Video 9:16, 43,6 giây, làm hoàn toàn miễn phí, không cần GPU (2026-11-10):

| Khâu | Làm bằng |
|---|---|
| Kịch bản tiếng Việt | Claude viết, người duyệt (`script.json`) |
| Hình motion graphics 1080×1920 | Canvas 2D tự viết (`scenes.html`), 5 cảnh, render bằng `render_video.py` của [Code Animation Prompts](../../animation/code-animation-prompts.md). Khoảng 7 phút trên CPU |
| Giọng đọc | Edge TTS, giọng `vi-VN-HoaiMyNeural` |
| Phụ đề, nhạc nền, ghép | [MoneyPrinterTurbo](../../video/moneyprinterturbo.md) với footage local, ghép tuần tự. 2 phút 14 giây |

Mỗi cảnh dài đúng bằng câu đọc tương ứng. Mốc thời gian lấy từ word boundary của Edge TTS: mở đầu 5,6 giây, ý 1 12,1 giây, ý 2 9,8 giây, ý 3 10,6 giây, kết 6,2 giây.

## Làm lại

```bash
# 1. Render từng cảnh: tạo bản sao scenes.html với SCENE cố định (hook, export, phin, egg, outro), rồi:
python <code-animation-prompts>/scripts/render_video.py sc_hook/index.html --output clips/hook.mp4 \
  --duration 5.6 --fps 30 --width 1080 --height 1920
# 2. Ghép bằng MoneyPrinterTurbo (đã uv sync)
python run_mpt.py /path/MoneyPrinterTurbo --task-id $(python -c "import uuid;print(uuid.uuid4())") \
  --video-subject "3 điều thú vị về cà phê Việt Nam" --video-script "<toàn bộ lời trong script.json>" \
  --video-language vi --video-source local --video-materials clips/hook.mp4,clips/export.mp4,clips/phin.mp4,clips/egg.mp4,clips/outro.mp4 \
  --video-aspect 9:16 --video-concat-mode sequential --video-transition-mode none --video-clip-duration 13 \
  --no-match-materials-to-script --voice-name vi-VN-HoaiMyNeural-Female --bgm-type random --bgm-volume 0.12 \
  --font-name BeVietnamPro-Bold.ttf --font-size 62 --stroke-width 2.5 --subtitle-position bottom
```

Lưu ý: `--task-id` phải là UUID. Dữ kiện trong kịch bản là thông tin phổ biến (Việt Nam xuất khẩu cà phê lớn thứ hai; phần lớn là Robusta; cà phê trứng ra đời ở Hà Nội năm 1946); nên kiểm lại nguồn trước khi đăng.
