# Stickman Video Director

> Repo: https://github.com/kaomei/stickman-video-director · **MIT**
>
> ⭐ **7.778 sao**, 1.366 fork (GitHub API, 2026-11-24) · Đã chạy: 2026-11-24 (commit `e8a450e`)

## Là gì

Skill cho Claude Code, Codex... làm video người que (stickman) cho kênh không lộ mặt. Agent nhận chủ đề hoặc kịch bản, viết truyện, chia cảnh, thêm giọng đọc, phụ đề, âm thanh. Có 16 phong cách, chia hai chế độ:

| | A · Model Engine (A1–A8) | B · Code Engine (B1–B8) |
|---|---|---|
| Cách làm | Gửi prompt sang model tạo video (mẫu trong repo làm bằng **Google Flow**) | Tạo ảnh nhân vật, đạo cụ trước, rồi viết code dựng chuyển động, render trên máy |
| Hình | Chuyển động mượt, ánh sáng điện ảnh, cảnh 3D | Nét vẽ tay, nhân vật giữ nguyên qua các cảnh |
| Chi phí | **Tốn credit tạo video**; video càng dài và tạo lại càng nhiều thì càng đắt | Không tốn credit video, nhưng vẫn cần công cụ tạo ảnh và TTS |

Mọi demo chế độ B được làm bằng Codex, dùng công cụ tạo ảnh có sẵn của Codex. FAQ của repo ghi rõ: skill miễn phí, nhưng gói agent, API ảnh và giọng đọc (Gemini, ElevenLabs...) thì tự trả tiền.

## Đã test

| Bước | Kết quả |
|---|---|
| Clone | ⚠️ Repo nặng **1,7 GB** (ảnh và video mẫu), dù chỉ clone 1 commit gần nhất |
| `npm install` trong `skills/directing-stickman-videos` | ✅ 2 giây (chỉ 2 thư viện: `@napi-rs/canvas`, `sharp`) |
| `autopilot.mjs doctor` | ✅ Đủ node, ffmpeg, canvas, sharp, font. Chưa có key Gemini |
| `npm test` | ✅ **603/603** test đạt trong 255 giây |
| Project mẫu `examples/b1` qua bước kiểm tra (`validate`) | ❌ Báo lỗi "principal picture inactive for over 2.5s". Project mẫu chưa theo kịp quy tắc kiểm tra hiện tại: thiếu `id`, `motion.role`, `motion.reason` cho lớp có chuyển động, và có đoạn hình đứng yên quá 2,5 giây |
| Sau khi tôi bổ sung các trường đó và thêm chuyển động nhỏ cho đạo cụ ở mỗi cảnh | ✅ Qua `validate`; `preview` ra video 1280×720, 16,4 giây trong **16 giây** trên CPU. Hình vẽ tay đẹp, phụ đề đúng nhịp |
| Làm video mới từ đầu (cần ảnh mới và giọng đọc) | ⛔ Chưa chạy: cần công cụ tạo ảnh (Codex hoặc API trả phí) và TTS |

## Kết luận nhanh

✅ Skill nghiêm túc: 603 test, quy trình duyệt nhiều bước (xem trước → duyệt → mới được render bản cuối), có bước chặn hình đứng yên quá lâu. Chế độ B render nhanh trên CPU.

⚠️ Hai điều nên biết trước:
- Kiểu "thế giới 3D, ánh sáng như phim" mà các reel quảng cáo thuộc **chế độ A**, phải tốn credit tạo video, không miễn phí.
- Project mẫu không qua được bước kiểm tra của chính repo; agent sẽ phải sửa thêm.

## Cài đặt

```bash
git clone --depth 1 https://github.com/kaomei/stickman-video-director
ln -s "$PWD/stickman-video-director/skills/directing-stickman-videos" ~/.claude/skills/
cd stickman-video-director/skills/directing-stickman-videos && npm install
node scripts/autopilot.mjs doctor
```

## Lưu ý

- Quy trình chế độ B: `validate` → `preview` → `approve` (cần file duyệt hình và chữ) → `render`. Không có bản xem trước được duyệt thì lệnh `render` từ chối chạy.
- Phụ đề mặc định tiếng Anh; ngôn ngữ khác phải yêu cầu rõ. Tiếng Việt chưa thử.
- Phong cách A3 ghi rõ là lấy cảm hứng từ kênh YouTube @Zenn0009. Khi làm theo phong cách người khác, nên tạo khác đi đủ nhiều.
