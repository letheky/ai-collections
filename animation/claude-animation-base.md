# Claude Animation Base

> Repo: https://github.com/JohnHeibel/ClaudeAnimationBase · MIT
>
> ⭐ **2.812 sao**, 263 fork (GitHub API, 2026-11-10) · Chưa chạy: 2026-11-10 (chỉ đọc mã nguồn)

## Là gì

Bộ khởi đầu để Claude làm phim hoạt hình vẽ tay nhân vật Clawd (linh vật con cua của Claude Code) bằng p5.js và p5.brush (cọ màu nước).
- `ANIMATION_GUIDE.md` (461 dòng) là bộ luật cho model: lên storyboard trước, mỗi cảnh phải có chuyện xảy ra, luôn có chuyển cảnh, không chữ.
- `src/clawd.js` chứa sẵn các góc nhìn, biểu cảm, mũ, điệu nhảy của Clawd; `src/core.js` lo nét cọ, camera, ánh sáng, giấy.
- `render.mjs` mở Chrome headless (qua puppeteer-core), chụp từng khung, ghép bằng ffmpeg.

## Đã test

| Bước | Kết quả |
|---|---|
| Đọc README, `package.json` | ✅ Chỉ 3 phụ thuộc: p5, p5.brush, puppeteer-core |
| `npm install` và render demo 11 giây | ⛔ Chưa chạy: môi trường chặn chạy code tải về từ repo ngoài |

## Kết luận nhanh

⚠️ Đáng thử nếu muốn phong cách màu nước vẽ tay. Tác giả cảnh báo: không có GPU thì lớp tô màu nước mất vài giây mỗi khung; máy không GPU phải thêm `--soft-gl` hoặc bảo model bỏ lớp màu nước.
⚠️ Bộ này dựng sẵn cho Clawd. Muốn nhân vật khác phải nhờ model vẽ lại toàn bộ.

## Cài đặt

```bash
git clone https://github.com/JohnHeibel/ClaudeAnimationBase && cd ClaudeAnimationBase
npm install
node render.mjs --clip --out=out/video.mp4            # thêm --soft-gl nếu máy không có GPU
```
Rồi bảo Claude Code: "Read ANIMATION_GUIDE.md, then make a 15-second video of Clawd …".
