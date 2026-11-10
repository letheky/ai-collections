# MoneyPrinterTurbo

> Repo: https://github.com/harry0703/MoneyPrinterTurbo · MIT · PyPI `mpt`
>
> ⭐ **141.638 sao**, 22.606 fork (GitHub API, 2026-11-10) · Đã test: 2026-11-10 (cài và chạy test, chưa ra video hoàn chỉnh)

## Là gì

Công cụ trọn gói làm video ngắn từ một chủ đề: LLM viết kịch bản → tìm footage → giọng đọc → phụ đề → nhạc nền → ghép video 9:16, 16:9 hoặc 1:1. Dùng qua WebUI (cổng 8501), API (8080), CLI, hoặc để agent tự chạy theo `docs/skill/SKILL.md`.
- **LLM:** Kimi, OpenAI, Claude, Gemini, DeepSeek, Qwen, Ollama, OpenRouter, **gói Claude Code**… hoặc tự đưa kịch bản có sẵn.
- **Footage:** Pexels, Pixabay, Coverr (miễn phí, cần key), ảnh/video của bạn, hoặc các dịch vụ sinh video trả phí (Seedance, MiniMax, WaveSpeed, MuAPI…).
- **Giọng đọc:** **Edge TTS (miễn phí, có giọng Việt)**, Azure, ElevenLabs, MiniMax, Kokoro, Fish Audio…
- Đăng thẳng lên TikTok, Instagram, YouTube Shorts.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv sync --frozen` | ✅ 37 giây, Python 3.11.17 |
| `pytest test` | ⚠️ **3.191 đạt, 9 lỗi**, 71 bỏ qua (9 phút 30 giây). Các lỗi nằm ở phần kiểm tra file audio (nhạc nền, giọng tải lên); chưa tìm nguyên nhân |
| Edge TTS giọng Việt | ✅ Có `vi-VN-HoaiMyNeural` (nữ) và `vi-VN-NamMinhNeural` (nam). Đọc được câu thử 3,5 giây. ⚠️ Sau proxy công ty phải chỉ định proxy tường minh (`edge-tts --proxy …`), nếu không kết nối websocket bị lỗi DNS |
| Lấy key Pexels | ❌ Ngày 10/11/2026 trang Pexels báo **tạm dừng cấp key API mới** |
| Ra video hoàn chỉnh | ⛔ Chưa làm (thiếu nguồn footage) |

## Kết luận nhanh

✅ Dự án lớn, bảo trì đều, bộ test hơn 3.000 ca. Là cách nhanh nhất để có pipeline "chủ đề → video" miễn phí: kịch bản bằng LLM bạn đang có, giọng Edge TTS, footage stock miễn phí.
⚠️ Footage stock ghép tự động dễ thành nội dung lặp lại kiểu "AI slop", nên duyệt kịch bản và chọn lại cảnh. Pexels tạm ngưng cấp key mới. Edge TTS là dịch vụ của Microsoft dùng không chính thức, có thể bị chặn. README có link giới thiệu (affiliate) tới nhà tài trợ Kimi và vài dịch vụ khác.

## Cài đặt

```bash
python -m pip install mpt && mpt webui            # cách nhanh
# hoặc từ source:
git clone https://github.com/harry0703/MoneyPrinterTurbo && cd MoneyPrinterTurbo
uv python install 3.11 && uv sync --frozen
# Docker: docker compose -f docker-compose.release.yml up   → http://127.0.0.1:8501
```
