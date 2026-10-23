# vox-director

> Repo: https://github.com/Alisa0808/vox-director · MIT
>
> ⭐ **2.417 sao**, 350 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/WGCtf6iFXo2Uyy3R6vxrde (phim mẫu của tác giả + lần tôi chạy offline phần ghép video)

## Là gì

Agent skill (SKILL.md) cho Claude Code hoặc Codex: từ một chủ đề, tạo video giải thích kiểu cắt dán giấy như Vox. Quy trình:
1. Viết `beats.json` (dàn ý). Bạn duyệt.
2. Thử 3–4 phong cách. Bạn chọn.
3. Tạo keyframe, làm chuyển động, giọng đọc và nhạc.
4. Ghép bằng ffmpeg.

Mọi bước AI gọi qua **Atlas Cloud** (nano-banana-2, gemini-omni-flash, kling, seedance, xai/tts, minimax/music). Chỉ bước ghép chạy ở máy. Có thêm chế độ restyle video nói chuyện (A-roll), dựng quanh một ảnh (C-roll) và người dẫn ảo (Host).

## Đã test

| Bước | Kết quả |
|---|---|
| Clone repo | ✅ 61 MB: 22 script Python, 5 file `beats.json` mẫu, 4 phim mẫu |
| Bước AI (keyframe, motion, TTS, nhạc) | ⛔ Không test: cần `ATLASCLOUD_API_KEY` (trả phí) |
| Dùng ảnh giả và âm sine thay cho output AI, chạy `kenburns.py` trên mẫu `money-15s` | ✅ 3 clip zoom 5 giây |
| `assemble.py` | ✅ `final.mp4` 15 giây, 1080×1920, H.264 + AAC, ghép trong 36 giây trên CPU |
| Phụ đề trên Linux | ⚠️ Script chỉ tìm font Arial theo đường dẫn macOS. Không thấy thì dùng font bitmap mặc định rất nhỏ, gần như không đọc được. Thêm DejaVu vào danh sách font là hết lỗi |
| Watermark | ⚠️ Mặc định in "Made with Atlas Cloud · vox-director" lên video. Đổi bằng trường `watermark` trong `beats.json` |
| `confetti.py` | ✅ Tạo được lớp giấy vụn chuyển động |

## Kết luận nhanh

⚠️ Đây là bộ prompt và script ghép video, phụ thuộc hoàn toàn vào Atlas Cloud. README gắn link giới thiệu (`utm_source`) tới dịch vụ này và mặc định in watermark của họ. Phim mẫu đẹp, nhưng tôi chỉ kiểm chứng được phần ghép ffmpeg. Người dùng Linux cần sửa font phụ đề.

## Cài đặt

```bash
git clone https://github.com/Alisa0808/vox-director.git ~/.claude/skills/vox-director
export ATLASCLOUD_API_KEY="sk-..."
# cần ffmpeg, ffprobe, Python 3 + Pillow
```

Sau đó yêu cầu agent, ví dụ: "Make me a Vox-style collage video about … — English, 16:9, 15 seconds".
