# edge-tts

> Repo: https://github.com/rany2/edge-tts · LGPL-3.0 (riêng `srt_composer.py` là MIT) · PyPI `edge-tts`
>
> ⭐ **12.496 sao**, 1.179 fork (GitHub API, 2026-11-10) · Đã test: 2026-11-10

## Là gì

Thư viện Python và CLI gọi dịch vụ đọc văn bản của Microsoft Edge ("Read aloud"). Miễn phí, không cần tài khoản hay API key, trả về audio kèm mốc thời gian từng từ để làm phụ đề. MoneyPrinterTurbo, pyVideoTrans và nhiều pipeline video khác dùng làm giọng đọc mặc định.

## Đã test

| Bước | Kết quả |
|---|---|
| `edge-tts --list-voices` | ✅ Có 2 giọng Việt: `vi-VN-HoaiMyNeural` (nữ) và `vi-VN-NamMinhNeural` (nam) |
| Đọc câu thử | ✅ 3,5 giây audio |
| Đọc cả kịch bản 144 từ, lấy mốc thời gian từng từ | ✅ 43,5 giây audio, 144 mốc từ; dùng để căn cảnh trong [video cà phê](../examples/caphe-vietnam-shorts/README.md) |
| Chạy sau proxy công ty | ⚠️ Kết nối websocket không tự đi qua proxy, lỗi DNS. Phải thêm `--proxy "$HTTPS_PROXY"` (CLI) hoặc `proxy=` (Python) |

## Kết luận nhanh

✅ Cách nhanh và rẻ nhất để có giọng Việt nghe tự nhiên.
⚠️ Chỉ có 2 giọng Việt. Đây là dịch vụ của Microsoft được dùng không chính thức, nên có thể bị giới hạn hoặc chặn bất cứ lúc nào. Muốn ổn định, chạy offline, nhiều giọng hơn thì xem [VieNeu-TTS](vieneu-tts.md).

## Cài đặt

```bash
pip install edge-tts
edge-tts --voice vi-VN-HoaiMyNeural --text "Xin chào các bạn" --write-media out.mp3 --write-subtitles out.srt
```
