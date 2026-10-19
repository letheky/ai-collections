# Pretext

> Repo: https://github.com/chenglou/pretext · MIT · npm `@chenglou/pretext`
>
> ⭐ **50.831 sao**, 2.761 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Thư viện JS/TS (tác giả Cheng Lou) đo và dàn trang văn bản nhiều dòng **không cần hỏi DOM**,
tức là không gây reflow. Gọi `prepare(text, font)` một lần, sau đó gọi `layout(prepared, width, lineHeight)` ở bất kỳ độ rộng nào.
Đây không phải thư viện animation: nó chỉ tính trước chữ chiếm bao nhiêu chỗ.

## Đã test

Test trên Chromium headless, với đoạn văn tiếng Việt khoảng 700 ký tự, font `16px DejaVu Sans`, line-height 24px.

| Bước | Kết quả |
|---|---|
| `npm i @chenglou/pretext` | ✅ v1.0.0, gói 1,2 MB, không có dependency |
| So `layout().height` với chiều cao DOM thật ở **61 độ rộng** (120 → 900px) | ✅ **60/61 khớp tuyệt đối**, lệch 1 trường hợp |
| 2.000 lần tính layout | ✅ Pretext **17 ms** so với DOM reflow **196 ms**, tức **nhanh hơn khoảng 11,5 lần** trong micro-benchmark này |

## Kết luận nhanh

✅ Chính xác và nhanh với tiếng Việt. Hợp với chat, feed, virtual list, và chữ chuyển động trên Canvas/SVG.
Muốn có hiệu ứng thì vẫn cần GSAP, Motion hoặc `requestAnimationFrame`.

## Lưu ý (từ README)

- Cần Canvas 2D, tức là phải chạy trong trình duyệt. Chạy trong Node, Bun hay jsdom thì phải tự cung cấp `OffscreenCanvas.measureText`.
- Chỉ hỗ trợ `white-space: normal/pre-wrap`, `word-break: normal/keep-all`. Không khớp khi dùng `text-wrap: balance`, `hyphens: auto` hay kerning tùy chỉnh.
- Font:
  - Font size phải là px.
  - Đợi web font tải xong rồi mới `prepare()`.
  - Không dùng `system-ui` trên macOS.
- Nên đặt `<html lang="vi">`.
