# Local Video Studio — Wan 2.2 + giọng Việt

Code sản xuất video local: tạo cảnh Wan2.2-TI2V-5B, thuyết minh nữ Ngọc Linh bằng VieNeu v3 Turbo, ghép phụ đề/âm thanh và chạy hàng đợi 10 phim khí hậu. Repo `ai-collections` vẫn là bộ ghi chú; thư mục này bổ sung một ví dụ có thể chạy được khi đã chuẩn bị runtime và model.

**Trạng thái kiểm chứng, 21/10/2026:** pipeline gốc đã tạo các clip Wan trên Windows/RTX 5070 Ti 16 GB; giọng Việt và bản ghép thử 1080p có âm thanh đã chạy được. Bản đóng gói này có cấu hình đường dẫn riêng, test tạo 10 project và smoke render CPU. Chưa render lại toàn bộ series từ bản đóng gói. Các phim dài đang được tạo ở workspace gốc; không coi việc có kịch bản hoặc `prepare` thành công là đã có video hoàn chỉnh.

## Đầu vào và đầu ra

- Python 3.11, RTX/CUDA phù hợp, Node không bắt buộc. Máy gốc: i9-14900K, RAM 128 GB, RTX 5070 Ti 16 GB.
- Cảnh gốc: 832 × 480, 121 frame ở 24 fps, 40 bước UniPC. Worker dùng BF16, SDPA, FFN chunking và phương án offload khi thiếu VRAM.
- Phim: 1920 × 1080 được nâng từ 480p bằng Lanczos, điều chỉnh thời gian bằng optical flow, phụ đề ASS/SRT, AAC. **Không phải sinh hình native Full HD.**
- Tạo giọng trên CPU, dùng preset có sẵn; không cần API key dịch vụ video/TTS.
- Bộ 10 tập có 16–18 chương/tập. Job chỉ đi tiếp khi giọng và timeline đạt hơn 601 giây, đồng thời ít nhất 540 giây tiếng đọc. File xuất cuối phải dài hơn 600 giây. Không thêm khoảng lặng để đạt số phút.
- `COMPLETE.txt` là kiểm tra kỹ thuật, không thay việc xem chuyển động, nghe giọng và kiểm chứng nội dung.

## Cấu hình

Chạy từ thư mục này. Có thể giữ trọng số trên SSD khác với repo:

```powershell
Copy-Item config.example.json config.json
# Sửa ai_home trong config.json, hoặc đặt biến môi trường:
$env:AI_STUDIO_HOME = 'E:\AI'
python studio.py doctor
```

`ai_home` dùng layout tương thích workspace đã test:

```text
<ai_home>/
  Wan2.2-official/                  # source Wan chính thức
  wan22-work/weights/               # config, index, 3 transformer shards, VAE
  t3-work/weights/                  # tên thư mục lịch sử, không cần cài T3
    models_t5_umt5-xxl-enc-bf16.pth
    google/umt5-xxl/                # tokenizer
  t3-work/.venv/                    # Python video
  voice-work/.venv/                 # Python voice riêng
  voice-work/hf-cache/              # cache VieNeu/codec
```

Có thể đặt riêng `wan_repo`, `wan_weights`, `t5_checkpoint`, `tokenizer_dir`, `video_python`, `voice_python`, `voice_cache`, `font_path` trong `config.json` để dùng layout khác. Đường dẫn tương đối được tính từ thư mục bundle. `config.json` được bỏ qua bởi Git.

## Chuẩn bị dependency và model

Tách hai venv để tránh xung đột phiên bản Hugging Face giữa video và voice. Đây là snapshot dependency đã dùng, không phải benchmark mọi phiên bản/phần cứng:

```powershell
uv venv --python 3.11 "$env:AI_STUDIO_HOME\t3-work\.venv"
uv pip install --python "$env:AI_STUDIO_HOME\t3-work\.venv\Scripts\python.exe" torch==2.8.0 torchvision==0.23.0 --index-url https://download.pytorch.org/whl/cu128
uv pip install --python "$env:AI_STUDIO_HOME\t3-work\.venv\Scripts\python.exe" -r requirements-video.txt

uv venv --python 3.11 "$env:AI_STUDIO_HOME\voice-work\.venv"
uv pip install --python "$env:AI_STUDIO_HOME\voice-work\.venv\Scripts\python.exe" -r requirements-voice.lock
uv pip install --python "$env:AI_STUDIO_HOME\voice-work\.venv\Scripts\python.exe" --no-deps vieneu==3.8.3
```

Lấy source Wan chính thức ở commit ghi trong `THIRD_PARTY.md`. Chuẩn bị từ [checkpoint TI2V-5B](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B/tree/main): `config.json`, `diffusion_pytorch_model.safetensors.index.json`, ba file `diffusion_pytorch_model-0000N-of-00003.safetensors`, `Wan2.2_VAE.pth`. Text encoder và tokenizer có trong [Wan2.1-T2V-1.3B](https://huggingface.co/Wan-AI/Wan2.1-T2V-1.3B/tree/main), cũng được dùng cho pipeline này. Tokenizer gồm `tokenizer.json`, `tokenizer_config.json`, `special_tokens_map.json`, `spiece.model`.

Không chạy `make install-gpu`, script tải tự động hoặc cài thêm FlashAttention. Runtime này thay attention bằng PyTorch SDPA trên Windows. VieNeu có thể tải model/codec cần thiết ở lần chạy đầu nếu cache chưa có. Quyền sử dụng các dependency/model tuân theo upstream, xem `THIRD_PARTY.md`.

## Chạy

```powershell
python studio.py prepare             # tạo 10 project, không tải model hoặc dùng GPU
python studio.py run-demo            # phim ngắn hiệu ứng nhà kính
python studio.py queue               # đợi demo xong, chạy 10 tập lần lượt
python studio.py status

# Hoặc bỏ bước đợi demo, khi chủ động chạy series:
python studio.py queue --no-wait
```

`start-series.ps1` giữ yêu cầu không tự sleep trong khi chạy và thực hiện prepare → queue. Một lệnh Sleep chủ động từ ứng dụng/người dùng vẫn có thể làm gián đoạn máy. Không chạy nhiều worker video hoặc model khác chiếm VRAM cùng lúc. Bundle không tự tắt hay khởi động dịch vụ Qwen trên máy khác.

Trong mỗi `series/episodes/<id>/`:

- `SCRIPT.md`, `scenes.json`, `SOURCES.md`: nội dung và hướng cảnh.
- `timeline.json`, `subtitles.vi.srt`, `audio/`: giọng và thời gian thực tế.
- `plan.json`: cảnh bám mốc đoạn đọc.
- `shots/`: clip gốc, latent, ảnh đầu/giữa/cuối, thông số.
- `status.json` và log: tiến độ.
- `output/film.mp4`: phim sau khi ghép, kèm SRT/contact sheet/metadata.

Queue có khóa OS để ngăn hai instance trong cùng bundle, chạy tuần tự và giữ các cảnh đã có metadata. Khi lỗi, xem `series/QUEUE-ERROR.txt` và log tập tương ứng, sửa rồi chạy lại. Không sửa kịch bản/prompt giữa một job rồi dùng lại audio/shot cache cũ; tạo project mới khi thay nội dung. Không có bước tự đăng video.

## Kiểm tra

```powershell
python -m unittest discover -s tests -v
& "$env:AI_STUDIO_HOME\t3-work\.venv\Scripts\python.exe" tests/smoke_render.py
```

Unit test dùng thư viện chuẩn, kiểm tra cấu hình và việc tạo 10 project trong thư mục tạm. Smoke test CPU dùng test pattern chuyển động và âm tone tổng hợp, kiểm tra 5 giây/120 frame/1080p/âm thanh; không gọi model, không dùng footage cá nhân và không đánh dấu đó là phim hoàn chỉnh.

Series cần nhiều ngày GPU hoạt động liên tục ở cấu hình gốc; thời gian thay đổi theo số cảnh, model và máy. Chưa benchmark Linux hoặc cấu hình GPU khác cho bản bundle này.
