# html-video

> Repo: https://github.com/nexu-io/html-video · **Apache-2.0** (từng template ghi giấy phép riêng, có yêu cầu ghi công)
>
> ⭐ **4.849 sao**, 584 fork (GitHub API, 2026-11-17) · Đã chạy: 2026-11-17 (commit `ae9a8cd`)

## Là gì

Lớp điều phối của đội Open Design: agent chọn template HTML, điền nội dung, xuất MP4 ngay trên máy.
- Engine duy nhất đang chạy được là **HyperFrames**; Remotion, Motion Canvas, Manim mới ở mức "planned".
- Có studio trên trình duyệt và CLI (`html-video`).
- Repo có 23 thư mục template (README ghi 21).
- Nhạc nền AI và lời đọc **cần API key MiniMax** (trả phí); repo không kèm sẵn nhạc.

## Đã test

| Bước | Kết quả |
|---|---|
| `pnpm install` + `pnpm -r build` | ✅ 42 giây |
| `doctor` | ✅ Nhận diện 23 template, adapter HyperFrames và Remotion |
| Render `frame-pentagram-stat` | ⚠️ Lỗi ở môi trường: repo ghim Playwright 1.65.1, cần trình duyệt mà máy test không tải được. Trỏ adapter sang Playwright 1.56 có sẵn thì render được: 5 giây 1080p60 trong 10 giây |
| Điền nội dung bằng CLI (`project-set-vars`: tiêu đề "23:30", phụ đề tiếng Việt) | ❌ Biến được lưu vào project nhưng **video xuất ra vẫn là nội dung mẫu** (95.7, AIME). Đã kiểm tra 13 template có file HTML: không template nào đọc biến được truyền vào (`window.__HV_VARS__`) |

## Kết luận nhanh

⚠️ Lời hứa "điền nội dung rồi xuất MP4" chưa chạy được qua CLI. Đổi nội dung là phải để agent sửa thẳng file HTML trong studio. Nếu đã quen HyperFrames thì dùng [HyperFrames](../animation/claude-motion-studio-15-repos.md) trực tiếp sẽ đơn giản hơn. Template đẹp, có thể lấy làm mẫu tham khảo.

## Cài đặt

```bash
git clone https://github.com/nexu-io/html-video && cd html-video
pnpm install && pnpm -r build
node packages/cli/dist/bin.js studio   # http://127.0.0.1:3071
```

## Lưu ý

- Cách render là quay màn hình trình duyệt theo thời gian thực (`recordVideo` của Playwright) rồi cắt bằng ffmpeg, không phải chụp từng khung cố định như renderer gốc của HyperFrames. Máy yếu có thể bị giật hoặc rớt khung.
- Lỗi "Executable doesn't exist ... chromium_headless_shell-1255" nghĩa là chưa cài trình duyệt cho Playwright 1.65: chạy `npx playwright install chromium-headless-shell ffmpeg`.
