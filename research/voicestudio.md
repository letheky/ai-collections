# VoiceStudio có thay được ElevenLabs không?

> Repo: https://github.com/debpalash/VoiceStudio
> Ngày nghiên cứu: 2026-10-19. Phiên bản mới nhất lúc nghiên cứu: v0.5.6 (2026-09-23).

## Tóm tắt

VoiceStudio là app desktop (Electron) kèm một dịch vụ giọng nói chạy cục bộ. README tự giới thiệu là
"the open-source, fully-local ElevenLabs alternative".

- Giấy phép: AGPL-3.0 cho code của app. Trọng số (weights) của từng model có giấy phép riêng.
- Khoảng 75.5k sao, 8.3k fork, 4.3k commit, 109 issue đang mở.
- Bản chất là một **bộ định tuyến engine**: TTS mặc định là OmniVoice (k2-fsa). Ngoài ra có VoxCPM2, CosyVoice 3,
  IndexTTS 2.5, MOSS-TTS (8B), dots.tts, GPT-SoVITS, Kyutai PocketTTS, MLX-Audio (Kokoro/CSM/Dia)…

## So sánh với ElevenLabs

| Tính năng | VoiceStudio | Ghi chú |
|---|---|---|
| TTS | ✅ | Có stream qua WebSocket `/ws/tts`. |
| Clone giọng zero-shot | ✅ | Nên dùng 5–15 giây audio sạch, tối đa 75 giây. Profile giọng cần có transcript. |
| Thiết kế giọng (voice design) | ✅ | Model được huấn luyện trên tiếng Anh và tiếng Trung; với ngôn ngữ ít dữ liệu có thể không ổn định. |
| Lồng tiếng video (dubbing) | ✅ | Gồm STT, dịch bằng NLLB, tách vocal, phân biệt người nói (pyannote). |
| Audiobook / chạy batch | ✅ | Chương dài chạy được trên GPU 8 GB. |
| STT / đọc chính tả | ✅ | Có endpoint tương thích OpenAI `/v1/audio/transcriptions` và bản stream. |
| API tương thích OpenAI cho TTS | ✅ (v0.5.6) | Dùng thẳng được openai SDK, chấp nhận tên giọng của OpenAI. |
| API tương thích ElevenLabs | ❌ Không thấy | Code đang gọi API ElevenLabs phải viết lại. |
| MCP server | ✅ | Hỗ trợ cả HTTP và stdio. |
| Đổi giọng speech-to-speech, hiệu ứng âm thanh, nhạc | ❌ Không thấy | ElevenLabs có các tính năng này. |
| Chạy offline, không giới hạn ký tự | ✅ | Đây là lợi thế lớn nhất. |

## Tiếng Việt

- **Có hỗ trợ.** `docs/languages.md` liệt kê Vietnamese (`vi`) với khoảng **8.482 giờ** dữ liệu huấn luyện cho OmniVoice.
  Con số này xếp khoảng thứ 13/646 ngôn ngữ (tiếng Anh 206k giờ, tiếng Thái 10,5k, tiếng Hàn 8,6k).
- Chưa có đánh giá chất lượng tiếng Việt công khai. Tài liệu cũng thừa nhận "accent quality still vary".
  Cần tự nghe thử, nhất là phần dấu thanh.

## Phần cứng

- **OmniVoice (engine mặc định):** khuyến nghị **tối thiểu 6 GB VRAM** trên GPU rời.
  Card 4 GB sẽ phải tràn sang RAM, mỗi lần render mất vài phút.
  Máy yếu có thể dùng bản OmniVoice GGUF (đã lượng tử hóa, tốn ít bộ nhớ hơn).
- **Mức VRAM:** từ 16 GB trở lên chạy được 3–4 tác vụ song song; 10 GB trở xuống chạy tuần tự từng tác vụ.
- **Nền tảng hỗ trợ:**
  - NVIDIA CUDA trên Windows và Linux.
  - AMD ROCm chỉ trên Linux.
  - Apple Silicon qua MPS/MLX.
  - CPU chạy được nhưng chậm.
  - Windows dùng GPU AMD/Intel thì chỉ chạy CPU. Mac Intel chỉ chạy giao diện, phần xử lý phải đặt ở máy khác.
- **Tốc độ:** chưa có benchmark nào được công bố (bảng trong `benchmarks.md` còn trống). Lần chạy đầu chậm vì phải nạp model.

## ⚠️ Giấy phép thương mại: điểm quan trọng nhất

- Trọng số OmniVoice (engine mặc định) theo **CC-BY-NC**, tức **không được dùng thương mại**.
  Bản OmniVoice-GGUF, NLLB-200 (dùng để dịch khi dubbing) và Breeze-TTS-2 cũng là non-commercial.
- Bảng kê model của chính dự án ghi rằng chưa có model nào được xác nhận là dùng thương mại được.
- Vì vậy: dùng cá nhân hoặc nghiên cứu thì ổn. **Làm video kiếm tiền hay dịch vụ cho khách hàng thì không thay ElevenLabs được**
  bằng cấu hình mặc định. Phải chuyển sang engine có giấy phép cho phép thương mại và tự kiểm tra từng giấy phép.

## Kết luận

| Nhu cầu | Thay được ElevenLabs? |
|---|---|
| Cá nhân, thử nghiệm, nội dung không kiếm tiền, cần riêng tư, xử lý khối lượng lớn | ✅ Được, nếu có GPU từ 6–8 GB VRAM |
| Thương mại (YouTube có kiếm tiền, khách hàng, sản phẩm) | ❌ Chưa, vì giấy phép model mặc định là NC |
| Cần độ ổn định, giọng có sẵn chất lượng cao, đổi giọng speech-to-speech, hiệu ứng âm thanh, API ElevenLabs | ❌ ElevenLabs vẫn hơn |

Lưu ý khác:
- Bộ cài chưa được ký số hoặc notarize, nên Windows và macOS sẽ hiện cảnh báo.
- Repo có vị trí quảng cáo trả phí ("paid placement") trong README.

## Nguồn

- https://github.com/debpalash/VoiceStudio
- https://github.com/debpalash/VoiceStudio/releases
- https://raw.githubusercontent.com/debpalash/VoiceStudio/main/README.md
- https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/languages.md
- https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/engines/omnivoice.md
- https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/licensing/model-inventory.md
- https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/benchmarks.md
