# ffmpeg-skill

> Repo: https://github.com/kajisho5/ffmpeg-skill · **MIT**
>
> ⭐ **7.151 sao**, 645 fork (GitHub API, 2026-11-17) · Đã chạy: 2026-11-17, bản 3.10.1 (commit `f1c97cb`)

## Là gì

Skill cho Claude Code, Cursor, Codex. Agent dựng video bằng ffmpeg trên máy, không cần cloud hay API key.
- 42 công cụ dạng script Python (chỉ dùng thư viện chuẩn): cắt, ghép, bỏ đoạn lặng, đổi tỷ lệ khung, phụ đề karaoke, chuẩn hóa âm lượng, kiểm tra trước khi đăng...
- Mỗi công cụ có "hợp đồng" (`contract --json`) mô tả tham số và cách kiểm tra kết quả.
- Có MCP server (`mcp/server.py`).
- Quy trình bắt buộc: đo file trước (`probe`), làm, rồi tự đo lại kết quả.

## Đã test

Chạy trên tư liệu phim Berlin: video pilot 19,6 giây 1080p và lời dẫn VieNeu.

| Bước | Kết quả |
|---|---|
| `doctor` | ✅ ffmpeg 6.1: 86 khả năng có sẵn, chỉ thiếu 2 tùy chọn (Whisper, Parakeet). Có cảnh báo ffmpeg 6.1 chưa vá CVE-2026-8461 |
| `contract --json` | ✅ Đúng 42 công cụ |
| MCP `tools/list` | ⚠️ Chỉ hiện **12** công cụ. Đây là chủ ý, README có ghi: đặt `FFMPEG_SKILL_MCP_FULL=1` để hiện đủ 42; 30 công cụ còn lại vẫn gọi được bằng tên |
| `fit.py --aspect 9:16 --fit blur` | ✅ Pilot 16:9 thành 1080×1920, nền mờ, mất 24 giây |
| `loudness.py -I -14` (60 giây lời dẫn) | ✅ Đo hai lượt, 3,5 giây. ffmpeg đo lại độc lập: −14,9 LUFS, đỉnh −1,0 dBTP. Công cụ tự báo đúng −14,93 và chấp nhận vì nằm trong dung sai 1 LU |
| `check.py --platform shorts` | ✅ Bắt đúng lỗi thật của pilot: âm lượng −19,8 LUFS (FAIL), âm thanh 24 kHz (WARN), không có track phụ đề (WARN). 10 mục còn lại PASS |
| `caption.py --transcribe --language vi --animate pop --karaoke` | ✅ 11 câu phụ đề, tô từng chữ, dấu tiếng Việt hiển thị đúng, mất 25 giây. ⚠️ Model mặc định là Whisper `base` nên nghe sai ("Bờ Linh" thay vì "Berlin") |

## Kết luận nhanh

✅ Công cụ ffmpeg cho agent tốt nhất trong các repo đã thử: chạy ngay, không phụ thuộc gì, và **tự kiểm tra kết quả** thay vì chỉ báo "xong". Rất hợp để hoàn thiện kênh phim tài liệu: chuẩn hóa âm lượng, làm bản Shorts, kiểm tra trước khi đăng.

## Cài đặt

```bash
sudo apt install ffmpeg
npx ffmpeg-skill            # cài vào ~/.claude/skills/ffmpeg-skill (--cursor, --codex, --all)
npx ffmpeg-skill doctor     # kiểm tra máy
```

Phụ đề tự động cần thêm `pip install faster-whisper`.

## Lưu ý

- `--json-brief` của `loudness.py` in **mức mục tiêu** (−14,0) chứ không phải mức đo được. Xem số thật trong `--json` đầy đủ (mục `verification`).
- Với lời Việt nên dùng `--model small` trở lên; cứ thêm `--write-ass` để sửa chữ sai bằng tay rồi render lại.
- faster-whisper 1.2.1 lỗi với PyAV ≥ 16 (`metadata_errors`). Cách sửa là cài `av<16`. Lỗi này nằm ở faster-whisper, không phải ở skill.
- Bản cài vào `~/.claude/skills` không tự cập nhật; chạy lại `npx ffmpeg-skill` để lên bản mới.
