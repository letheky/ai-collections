# ghost-editor

> Repo: https://github.com/kurbaitaev/ghost-editor · MIT · Phiên bản 0.3
>
> ⭐ **75 sao**, 7 fork (GitHub API, 2026-10-22) · Repo tạo 2026-09-24 · Đã test: 2026-10-22

## Là gì

Skill cho Claude Code biến video nói trước camera (talking-head) thành reel cho Instagram, TikTok, YouTube Shorts.
Skill tự làm các việc sau:

- **Cắt dựng:** giữ câu nói tốt nhất, bỏ khoảng lặng và câu vấp.
- **Phụ đề:** canh từng từ, đặt né khuôn mặt.
- **Motion graphics và B-roll:** hiện con số, thẻ chữ, cảnh minh họa đúng lúc nói.
- **Âm thanh:** chèn hiệu ứng âm thanh và nhạc nền.
- **Tự kiểm tra** video trước khi giao.

Có 7 phong cách: clean, pop, cinematic, editorial, kinetic, launch, meme. Có 6 công thức dựng (recipe), ví dụ seoul-list, stan-style, explainer-vector.
Render bằng HyperFrames.

## Yêu cầu (theo README)

- **Claude Code bản trả phí** (Pro, Max, Team) hoặc API credit.
- **Mac chip Apple.** Phần kiểm tra phụ đề dùng OCR có sẵn của macOS; Linux chưa được test.
- **Công cụ phụ:** ffmpeg, Node, Python, Whisper, OpenCV. Khoảng **4 GB**, thêm tới khoảng 6 GB nếu cài phần mở rộng.
- **Key Gemini (gói miễn phí):** dùng để kiểm tra B-roll. **Frame video được gửi lên Google.**
- **Key ElevenLabs:** chỉ cần cho giọng đọc của mẫu explainer.
- **Thời gian:** README ước tính một reel 60 giây mất khoảng 15–25 phút máy chạy trên M3.

## Đã test (Linux, không có Claude Code)

| Bước | Kết quả |
|---|---|
| `scripts/doctor.sh` | Có 8 mục OK. 5 mục thiếu: hyperframes, whisper, opencv, bộ hiệu ứng âm thanh, nhạc nền. Script in sẵn lệnh để sửa từng mục |
| `tests/test_assemble_sync.py` | ✅ **PASS**: hình và tiếng đồng bộ trên 20 đoạn, lệch tối đa 0,7 ms |
| `tests/test_decode_levels.py` | ✅ **ALL OK**: giải mã mức màu đúng |
| `tests/test_cutout_fx.py` | ❌ **Lỗi**: sai lệch 20,7, trong khi ngưỡng là 1,5 (môi trường Linux, chưa rõ có phải do khác nền tảng không) |
| Dựng một reel thật | ⛔ Không test (cần Claude Code, video quay người thật và key Gemini) |

## Kết luận nhanh

⚠️ Bộ công cụ chi tiết, phần đồng bộ hình–tiếng đã được kiểm chứng. Nhưng repo nhỏ (75 sao), nhắm vào Mac,
cần Claude Code trả phí, và gửi frame video lên Google khi kiểm tra B-roll.
Hợp với người làm reel nói trước camera trên Mac.

## Cài đặt (theo README)

Trong Claude Code, gõ:

> Install the ghost-editor skill: clone https://github.com/kurbaitaev/ghost-editor into ~/.claude/skills/ghost-editor and follow its docs/INSTALL.md.
