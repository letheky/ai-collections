# Biên bản cuộc họp tiếng Việt tự động

Hai cách, đều chạy trên máy của bạn:

| | **Cách A: Meetily** | **Cách B: WhisperX + `bien_ban.py`** |
|---|---|---|
| Dạng | App desktop, bấm ghi là xong | Dòng lệnh, xử lý file ghi âm |
| Ghi âm trực tiếp mic + loa | ✅ | ❌ (tự ghi file trước) |
| Tách người nói | ❌ (bản miễn phí không có) | ✅ (pyannote) |
| Mẫu biên bản tiếng Việt | ❌ mẫu tóm tắt tùy chỉnh chỉ có ở bản Pro | ✅ mẫu trong `bien_ban.py`, sửa tự do |
| Hệ điều hành | Windows, macOS có bộ cài; Linux phải build | Windows, macOS, Linux |

Model nhận dạng giọng nói và LLM đều tải từ Hugging Face hoặc Ollama, nên máy cần truy cập được các trang đó.

## Cách A: Meetily

1. Tải bộ cài từ [Releases](https://github.com/Zackriya-Solutions/meeting-minutes/releases/latest):
   - Windows: file `x64-setup.exe` (CPU phải hỗ trợ AVX2).
   - macOS Apple Silicon: file `.dmg`, kéo vào Applications.
   - Linux: build từ source theo `docs/building_in_linux.md` của repo.
2. Mở app → **Settings → Transcription**:
   - Engine: chọn **Whisper**, không chọn Parakeet. Parakeet trong app là `parakeet-tdt-0.6b-v2`, chỉ nhận tiếng Anh.
   - Model: `large-v3-turbo` nếu máy mạnh, `medium` hoặc `small` nếu máy yếu.
   - Language: **Vietnamese**.
3. **Settings → Summary:** chọn Ollama (chạy trên máy) hoặc Claude, OpenAI, OpenRouter. Chọn ngôn ngữ tóm tắt Vietnamese.
4. Bấm ghi âm khi họp. File cũ thì dùng **Import** (đang Beta).

## Cách B: WhisperX + script biên bản

### 1. Cài công cụ

```bash
# Python 3.10–3.13 và ffmpeg
#   Windows: winget install Gyan.FFmpeg
#   macOS:   brew install ffmpeg
#   Ubuntu:  sudo apt install ffmpeg
pip install whisperx          # hoặc: uv tool install whisperx
# Lần cài đầu tải khoảng 7–8 GB (PyTorch + CUDA), hãy chừa đủ ổ đĩa
```

Có card NVIDIA thì cài CUDA toolkit 12.8 trước (theo README của WhisperX). Không có thì chạy bằng CPU, chậm hơn nhiều.

### 2. Bật tách người nói (một lần)

1. Tạo token **Read** tại https://huggingface.co/settings/tokens
2. Mở https://huggingface.co/pyannote/speaker-diarization-community-1 và bấm đồng ý điều khoản.
3. `export HF_TOKEN=hf_...` (Windows PowerShell: `$env:HF_TOKEN="hf_..."`)

### 3. Chuyển ghi âm thành chữ

```bash
# Có GPU
whisperx hop.m4a --model large-v3 --language vi --diarize --hf_token $HF_TOKEN \
  --min_speakers 2 --max_speakers 6 --output_format json --output_dir out

# Chỉ có CPU
whisperx hop.m4a --model medium --language vi --diarize --hf_token $HF_TOKEN \
  --device cpu --compute_type int8 --output_format json --output_dir out
```

Luôn ghi rõ `--language vi`. WhisperX tự dùng `nguyenvulebinh/wav2vec2-base-vi-vlsp2020` để căn timestamp cho tiếng Việt.

### 4. Cài LLM để viết biên bản

Chạy trên máy với [Ollama](https://ollama.com):

```bash
ollama pull qwen3:8b
```

Hoặc dùng API qua endpoint tương thích OpenAI:

```bash
export LLM_BASE_URL=https://api.openai.com/v1 LLM_MODEL=gpt-5.5 LLM_API_KEY=sk-...
```

Model nhỏ chạy trên máy viết tiếng Việt kém hơn model lớn trên cloud. Họp quan trọng thì nên dùng model lớn.

### 5. Tạo biên bản

```bash
python3 bien_ban.py out/hop.json --speakers "SPEAKER_00=Anh Nam,SPEAKER_01=Chị Lan"
```

Kết quả:
- `out/hop.transcript.txt`: lời thoại theo người nói, có mốc thời gian.
- `out/hop.bien-ban.md`: biên bản gồm thành phần, nội dung chính, quyết định, việc cần làm (người phụ trách, hạn) và vấn đề còn bỏ ngỏ.

Script chỉ dùng thư viện chuẩn của Python. Buổi họp dài được chia thành nhiều phần (mặc định 12.000 ký tự mỗi phần), viết nháp từng phần rồi gộp lại. Prompt dặn LLM không bịa thông tin và đánh dấu `(?)` ở những từ nghe không rõ.

## Mẹo cho tiếng Việt

- Mỗi người một mic, hoặc họp online ghi từ máy tính, sẽ chính xác hơn nhiều so với một điện thoại đặt giữa bàn.
- Tên riêng và thuật ngữ hay bị nghe sai, nên đọc lại `transcript.txt` trước khi gửi biên bản.
- Muốn chính xác hơn có thể thử [PhoWhisper](https://github.com/VinAIResearch/PhoWhisper) của VinAI. Bản large đạt WER 4,67% trên VIVOS theo bảng của tác giả. Model này ở định dạng transformers, phải chuyển sang CTranslate2 thì WhisperX mới dùng được. Tôi chưa kiểm chứng bước chuyển này.

## Đã kiểm chứng gì (2026-10-23)

- `bien_ban.py`: test với file JSON giả lập đầu ra WhisperX và mock LLM. Đổi tên người nói, gộp câu liên tiếp, chia đoạn rồi gộp, báo lỗi khi file rỗng đều chạy đúng.
- `uv tool run whisperx --help`: ✅ cài được bản 3.8.6 từ PyPI, mất 4 phút 33 giây, tải về khoảng 7,6 GB (gồm cả thư viện CUDA). Có đủ các tham số dùng ở trên: `--language`, `--diarize`, `--hf_token`, `--min_speakers`, `--device`, `--compute_type`, `--output_format`.
- Meetily: đối chiếu với README và source. Danh sách ngôn ngữ có `vi`, engine Parakeet là bản v2. App chưa được cài thử.
- **Chưa** chạy nhận dạng giọng nói thật: máy test chặn Hugging Face nên không tải được model.
