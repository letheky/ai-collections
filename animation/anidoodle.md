# anidoodle

> Repo: https://github.com/alexgreensh/anidoodle · Apache-2.0
>
> ⭐ **993 sao**, 81 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Bộ skill/plugin (Claude Code, Codex, Grok) kèm một engine JavaScript. Engine vẽ tranh phong cách vẽ tay bằng code (README liệt kê 32 phong cách)
và xuất phim quá trình vẽ từng nét.

- **Nguyên tắc:** mỗi bức tranh là một hàm thuần có random theo seed, nên cùng source luôn ra cùng kết quả.
- **Render:** dùng Chromium headless. Phim cần thêm ffmpeg.
- **Đầu ra:** PNG, MP4, GIF, WebM, APNG, HTML.

## Đã test

| Bước | Kết quả |
|---|---|
| `scaffold.mjs art --still hero --film intro --duration 4` | ✅ Tạo project. `npm install` chỉ cài 3 gói |
| `node tools/still.mjs hero` | ✅ PNG 1080×1080: quả lê màu nước có texture giấy và bóng đổ. Vẽ mất 74 ms, md5 lặp lại được (**reproducible**) |
| `node tools/render.mjs intro` | ✅ MP4 H.264 1080×1080, **120 khung hình / 4 giây**, render mất **4,3 giây** chỉ bằng CPU |
| Cảnh báo tự động | ⚠️ Engine báo frame 0 gần như trống và gợi ý dùng `--poster-frame` để làm thumbnail |

Engine tự tìm Chromium trong cache Playwright, không cần cấu hình thêm.

## Kết luận nhanh

✅ Cài nhẹ, render nhanh và ổn định, kết quả lặp lại được. Hợp với minh họa blog và video ngắn có phong cách vẽ tay.
Sửa nét vẽ thì phải chạy lại lệnh render; không có live preview.

## Cài đặt

```bash
# Claude Code
/plugin marketplace add alexgreensh/anidoodle
/plugin install anidoodle@alexgreensh-anidoodle
# hoặc dùng trực tiếp
node <anidoodle>/skills/anidoodle/engine/tools/scaffold.mjs ~/art --still hero --film intro
cd ~/art && npm install
node tools/still.mjs hero --out out/hero.png
node tools/render.mjs intro
```

Cần Node 20+, Chromium (Playwright) và ffmpeg. Gói âm thanh tùy chọn nặng 373 MB.
