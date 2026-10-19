# Recordly

> Repo: https://github.com/webadderallorg/Recordly · AGPL-3.0 kèm điều khoản bổ sung (GitHub API ghi `NOASSERTION`) · Trang: https://recordly.dev
>
> ⭐ **34.464 sao**, 2.784 fork (GitHub API, 2026-10-19) · Repo tạo 2026-03-12 · Đã test: 2026-10-19 (bản 1.4.0)

## Là gì

App desktop (Electron 43) quay màn hình để làm video demo, chạy được trên Windows, macOS và Linux.

- **Ghi hành vi chuột** trong lúc quay, dùng `uiohook-napi`.
- **Tự đề xuất vùng zoom** dựa trên các cú click.
- **Dựng và xuất video** bằng PixiJS 8 + pixi-filters, mediabunny và ffmpeg-static; xuất ra MP4 hoặc GIF.
- Có sẵn whisper runtime (dùng cho phụ đề) và hình nền.
- Dự án bắt đầu là bản fork của OpenScreen.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` | ✅ 548 gói trong 2 phút 20 giây. Postinstall build lại module native (`uiohook-napi`) và các helper; helper riêng cho Windows tự bỏ qua trên Linux |
| `npx vitest run` | ✅ **1.604 test đạt**, bỏ qua 35, trên 181 file test, mất 33 giây |
| `npx tsc --noEmit` | ✅ Không lỗi kiểu |
| `vite build` | ✅ Build được renderer và tiến trình main của Electron |
| Mở app trong Xvfb (1440×900, `--no-sandbox --disable-gpu`) | ✅ Cửa sổ editor lên sau khoảng 110 ms. Có màn Home (Record new, Import, Folders) và hộp thoại chào mừng. Hộp thoại ghi rõ đăng nhập cloud chưa có trong bản này, nhưng vẫn lưu video vào máy được |
| Khi không có GPU | ⚠️ Màn Home báo lỗi renderer ("CanvasRenderer is not yet implemented"). App vẫn chạy |
| Quay màn hình, auto-zoom, xuất video thật | ⛔ Không test được (màn hình ảo, không có thao tác chuột thật) |
| Kiểm tra mã nguồn | Có hook `useFreshRecordingAutoZoom`; định dạng xuất `mp4` và `gif`; có giá trị bo góc 22px trong code; **không thấy SDK analytics** bên thứ ba (PostHog, Sentry, Mixpanel…). Có endpoint chia sẻ video `videos.recordly.dev` |

## Kết luận nhanh

✅ Codebase chất lượng tốt: hơn 1.600 test, typecheck sạch, build và mở app được trên Linux.
Chưa kiểm chứng được chất lượng quay và zoom; cần thử trên máy thật có GPU.
Là lựa chọn miễn phí đáng thử cho video demo sản phẩm.

## Cài đặt

- Tải bản cài từ GitHub Releases (Windows / macOS / Linux).
- Hoặc build từ source:

```bash
git clone https://github.com/webadderallorg/Recordly.git
cd Recordly && npm install && npm run dev
```

## Lưu ý về giấy phép

AGPL-3.0 kèm phần tóm tắt riêng của tác giả:
- **Không được dùng tên hoặc thương hiệu "Recordly"** cho dự án của bạn.
- Nếu dùng hoặc phái sinh code thì **phải ghi công Recordly trong giao diện và trong repo**.
- Nếu sửa code hoặc dùng để chạy dịch vụ (SaaS) thì phải công bố toàn bộ source.
