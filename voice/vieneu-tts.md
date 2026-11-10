# VieNeu-TTS

> Repo: https://github.com/pnnbao97/VieNeu-TTS · Apache-2.0 (cả code và model) · PyPI `vieneu`
>
> ⭐ **3.176 sao**, 970 fork (GitHub API, 2026-11-10) · Đã test: 2026-11-10 (bản 3.8.3)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/QovAghxN6vmvbz2iW2nu55 (nghe so sánh với Edge TTS trên cùng kịch bản)

## Là gì

TTS tiếng Việt chạy ngay trên máy, do Phạm Nguyễn Ngọc Bảo xây dựng và huấn luyện từ đầu (hơn 10.000 giờ dữ liệu song ngữ Việt–Anh).
- **Chạy CPU không cần PyTorch** (dùng ONNX Runtime). Có GPU thì tự chuyển sang PyTorch, nhanh hơn khoảng 25 lần.
- **25 giọng có sẵn** đủ 3 miền Bắc, Trung, Nam; phong cách tự nhiên, kể chuyện, tin tức, đọc truyện.
- **Clone giọng** từ một đoạn audio mẫu, chế độ podcast hai người, fine-tune LoRA.
- **API tương thích OpenAI** (`POST /v1/audio/speech`) và Docker, nên gắn được vào các pipeline đang dùng OpenAI TTS.

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install vieneu` (bản CPU) | ✅ 36 giây |
| Tải model lần đầu | ✅ 541 MB từ Hugging Face (`pnnbao-ump/VieNeu-TTS-v3-Turbo`) |
| Chạy với onnxruntime 1.31.1 (bản mới nhất pip cài) | ❌ Lỗi `External data path escapes model directory`: onnxruntime mới chặn đọc dữ liệu model khi cache Hugging Face để các file ở thư mục con khác nhau |
| Hạ `onnxruntime==1.22.1` | ✅ Chạy được, nạp model 7,6 giây |
| Đọc kịch bản video cà phê (144 từ) bằng 3 giọng trên 4 vCPU | ✅ Thùy Dung (nữ, Nam) 31,5 giây audio trong 26,9 giây; Thiện Minh (nam, Bắc) 35,5 giây trong 30,5 giây; Ngọc Trân (nữ, Trung) 40,5 giây trong 36,0 giây. RTF 0,82–0,89 |
| Kiểm tra đọc sót bằng faster-whisper | ✅ Cả 3 giọng nghe ra 139/144 từ, không sót đoạn nào (phần lệch là Whisper đổi chữ thành số, ví dụ "1946"). Giọng miền Trung Whisper nhận kém nhất |
| Watermark audio | ✅ Chỉ bật khi cài thêm `vieneu[watermark]`; bản cài mặc định không gắn |

## Kết luận nhanh

✅ Lựa chọn TTS tiếng Việt miễn phí tốt nhất trong số tôi đã thử: chạy offline trên CPU, nhiều giọng 3 miền, Apache-2.0 nên dùng thương mại được, không phụ thuộc dịch vụ nào. Hợp để thay Edge TTS khi cần ổn định hoặc cần giọng địa phương.
⚠️ Trên máy 4 nhân chỉ nhanh hơn thời gian thực một chút; video dài nên chạy ở nền hoặc dùng GPU. Phải ghim `onnxruntime==1.22.1` cho tới khi tác giả sửa lỗi tương thích.

## Cài đặt

```bash
pip install vieneu
pip install "onnxruntime==1.22.1"     # nếu gặp lỗi external data path
```

```python
from vieneu import Vieneu
tts = Vieneu()
print(tts.list_preset_voices())                 # 25 giọng
v = tts.get_preset_voice("Thùy Dung")
tts.save(tts.infer(text="Xin chào các bạn", voice=v), "out.wav")
```

Web UI: `uv run vieneu-web` trong repo đã clone. GPU NVIDIA: `pip install "vieneu[cuda]"`.
