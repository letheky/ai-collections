# anything2explainer

> Repo: https://github.com/Vincentwei1021/anything2explainer · **PolyForm Noncommercial 1.0.0** (GitHub ghi "NOASSERTION"; dùng thương mại phải xin phép tác giả)
>
> ⭐ **3.369 sao**, 427 fork (GitHub API, 2026-11-17) · Đã chạy: 2026-11-17 (commit `4f73818`)

## Là gì

Skill cho Claude Code / Codex: đưa vào một chủ đề hoặc bài viết, agent làm ra video giải thích nền tối 1280×720.
- Đầu ra gồm giọng đọc, phụ đề theo từng từ, thẻ chương, thanh tiến trình chương.
- Không phải công cụ dòng lệnh. Repo chứa template Remotion 4, thư viện hình vẽ, script TTS, script kiểm tra chất lượng và quy trình chi tiết trong `SKILL.md` (tiếng Trung).
- Quy trình chạy 1–3 giờ: agent nghiên cứu, viết lời, tạo giọng, chia cảnh, rồi nhiều agent dựng các cảnh song song. Người dùng duyệt ở 4 điểm dừng.
- Ngôn ngữ chính thức: chỉ tiếng Trung (edge-tts) và tiếng Anh (kokoro).

## Đã test

| Bước | Kết quả |
|---|---|
| Quy tắc nguồn tin trong `SKILL.md` | ✅ Đúng như bản tin: mọi con số, năm, tên người trên hình phải có URL nguồn trong tài liệu nghiên cứu, chưa kiểm chứng thì không đưa lên. B-roll phải ghi vào `MANIFEST` |
| `test_portable_scripts.py` | ✅ 8/8 test đạt trong 1,4 giây |
| `npm install` + `tsc --noEmit` | ✅ 16 giây, không lỗi kiểu |
| Lời Việt qua `tts_build.py` (đoạn N21a–N21b phim Berlin, `TTS_ENGINE=edge VOICE=vi-VN-NamMinhNeural`, `lang: 'en'`) | ✅ 12 giây ra file âm thanh, timeline 25,3 giây, phụ đề chia khối. Phải bọc script để edge-tts đi qua proxy |
| Render toàn bộ (`remotion render`, 758 khung) | ✅ 88 giây trên CPU. Phụ đề tiếng Việt đủ dấu, thẻ tiêu đề và thanh chương đúng. Phần giữa trống vì các cảnh do agent tự viết sau |
| Chạy trọn quy trình 1–3 giờ với agent | ⛔ Chưa chạy |

## Kết luận nhanh

⚠️ Bộ quy trình làm video giải thích rất kỹ, đặc biệt quy tắc "số liệu phải có nguồn", hợp với kênh tài liệu. Nhưng:
- **Giấy phép phi thương mại**: kênh YouTube có kiếm tiền là dùng thương mại.
- Không hỗ trợ tiếng Việt chính thức; muốn dùng phải tự đổi giọng như cách đã thử ở trên.
- Một video tốn 1–3 giờ chạy agent.

## Cài đặt

```bash
git clone https://github.com/Vincentwei1021/anything2explainer.git
ln -s "$PWD/anything2explainer" ~/.claude/skills/anything2explainer
cd anything2explainer/template && npm install
pip install 'edge-tts==7.2.8' numpy pillow scipy
```

## Lưu ý

- Trên Linux không tải được trình duyệt của Remotion thì đặt `REMOTION_BROWSER_EXECUTABLE` trỏ tới Chromium có sẵn (ở đây dùng `headless_shell` của Playwright).
- Đặt `lang: 'en'` cho tiếng Việt để phụ đề chia theo khoảng trắng (khối ≤ 48 ký tự) thay vì đếm chữ Hán.
- Cuối video mặc định có dòng `built by Anything2Explainer skill`; tắt bằng `builtBy: ''` trong `src/config.ts`.
- Phong cách hình ghi rõ là lấy cảm hứng từ một kênh Douyin (@图灵宇宙).
