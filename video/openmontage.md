# OpenMontage

> Repo: https://github.com/calesthio/OpenMontage · AGPLv3 · Trang: https://openmontage.video
>
> ⭐ **69.548 sao**, 8.986 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/SLcZu7ZYH9Q2Q1o7MJJpo1 (ảnh/video kết quả chạy thật kèm số đo)

## Là gì

Hệ thống sản xuất video do coding agent điều khiển. Agent đi qua các bước: nghiên cứu, viết kịch bản, tạo hoặc tìm tư liệu, dựng, render.

- **Engine dựng:** Remotion (React) hoặc HyperFrames (HTML/GSAP); FFmpeg cho hậu kỳ.
- **Không cần key:** giọng đọc Piper TTS, footage miễn phí (Archive.org, NASA, Wikimedia, Pexels).
- **Có thêm key:** gọi được các model tạo ảnh và video (Veo, Kling…).

## Đã test

| Bước | Kết quả |
|---|---|
| `make setup` | ✅ Xong trong **53 giây**: venv, 16 gói Python, `npm install` cho remotion-composer, piper-tts |
| `make demo-list` | ✅ 3 demo không cần key: `code-to-screen`, `focusflow-pitch`, `world-in-numbers` |
| `npx remotion render … world-in-numbers.json --browser-executable <headless_shell>` | ✅ MP4 **1920×1080, 690 khung hình (23 giây), 4,3 MB**, render mất **2 phút 6 giây** bằng CPU |
| Cần chỉnh khi chạy | ⚠️ `make demo` gọi Remotion, mà Remotion muốn tự tải Chrome. Máy offline thì phải chỉ định `--browser-executable` |
| Giọng Piper | ⛔ Không test: model giọng tải từ Hugging Face, bị chặn trong môi trường test |
| Pipeline đầy đủ bằng agent | ⛔ Không test (cần phiên agent và API key cho các provider) |

## Kết luận nhanh

✅ Cài nhanh, demo không cần key render được ngay ra video 1080p bằng CPU.
Video chất lượng cao kiểu điện ảnh thì cần key trả phí cho các model tạo video. Ngoài ra agent điều khiển cũng tốn token.

## Cài đặt

```bash
git clone https://github.com/calesthio/OpenMontage && cd OpenMontage
make setup
make demo-list && make demo
```

Cần Python, Node.js, FFmpeg. Giấy phép AGPL: nếu sửa rồi cung cấp như dịch vụ mạng thì phải công bố source.
