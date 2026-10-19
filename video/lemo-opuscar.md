# lemo-opuscar

> Repo: https://github.com/lemomo-ai/lemo-opuscar · Code MIT; phim mẫu CC BY 4.0
>
> ⭐ **3.060 sao**, 339 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Skill cho Claude Code (tác giả LemoLab) để làm phim ngắn **hoàn toàn bằng code**, không dùng model tạo video.

- **Phong cách:** repo có 53 thư mục `styles/`. Mỗi phong cách gồm một `STYLE.md` và một phim mẫu.
- **Cách render:** mỗi phim là một `index.html` có hàm `window.render(t)`. Chrome headless chụp từng khung hình, ffmpeg ghép lại.
- **Âm thanh:** nhạc tổng hợp từ thư viện sample miễn phí; giọng đọc bằng Kokoro (offline, tiếng Anh) hoặc edge-tts (tiếng Trung).
- README ghi các phong cách được tinh chỉnh cho Claude Opus 5.5.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` | ✅ 2 gói (playwright-core, three) |
| Render lại phim mẫu có sẵn (`styles/pictogram-motion/demo`) | ❌ **Không render được từ bản clone mới**: thư mục `fonts/` của demo bị loại khỏi git (`.gitignore`), nên trang không bao giờ báo `READY` |
| Pipeline lõi `core/render/video.mjs` với một phim canvas 3 giây tự viết (vòng tròn + chữ tiếng Việt) | ✅ MP4 **72 khung hình** trong **4,1 giây**, chạy song song 3 worker |
| WebGL trên Linux không có GPU | ⚠️ Chuyển sang SwiftShader (render bằng phần mềm), nên các phong cách 3D/CRT sẽ chậm |
| Gói nhạc, giọng, HDRI | ⛔ Không test. `tools/fetch.sh` tải chúng từ GitHub Release, mỗi thư viện 70–400 MB |

## Kết luận nhanh

⚠️ Bộ công cụ render chạy tốt và nhanh trên CPU, nhưng phim mẫu không tái tạo ngay được vì thiếu font.
Hãy dùng như một khung để agent viết phim mới, đừng kỳ vọng `clone` xong là render lại được demo.
README ước tính mỗi phim mất 30–60 phút và khá nhiều token.

## Cài đặt

```bash
claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab
```

Cần Node 20+, ffmpeg, Python 3.11+ (hoặc uv). Phong cách 3D nên có GPU.
