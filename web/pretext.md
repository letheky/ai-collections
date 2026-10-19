# Pretext: đo và dàn trang văn bản không cần chạm vào DOM

> Nguồn: bài "Làm Full Hoạt Ảnh Nhanh Hơn Với Các Dự Án Mã Nguồn Mở Miễn Phí" do người dùng cung cấp.
> Repo: https://github.com/chenglou/pretext. Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `chenglou/pretext`: **50.831 sao**, 2.761 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Pretext là thư viện JavaScript/TypeScript chuyên **đo và dàn trang văn bản nhiều dòng**.
Tác giả là Cheng Lou, cựu kỹ sư React core ở Facebook, hiện làm ở Midjourney. Dự án ra mắt tháng 3/2026, giấy phép MIT, dung lượng khoảng 15 KB, không có dependency.

- **Bài toán nó giải:** muốn biết một đoạn văn cao bao nhiêu, cách thông thường là hỏi DOM
  (`getBoundingClientRect`, `offsetHeight`). Mỗi lần hỏi như vậy buộc trình duyệt tính lại layout (reflow), rất tốn.
  Pretext tự tính số dòng và chiều cao bằng phép toán thuần, chỉ dùng canvas `measureText` làm chuẩn.
- **Cách dùng:** gọi `prepare()` một lần cho mỗi cặp văn bản + font, sau đó gọi `layout()` ở bất kỳ độ rộng nào.
  Kết quả có thể vẽ ra DOM, Canvas hoặc SVG.
- **Cài đặt:** `npm install @chenglou/pretext`

```js
import { prepare, layout } from '@chenglou/pretext'
const p = prepare('Xin chào thế giới…', '16px Inter')
const { height, lineCount } = layout(p, 320, 24)   // chiều rộng 320px, line-height 24px
```

## Liên quan gì đến "làm hoạt ảnh"?

Bài giới thiệu ghép Pretext vào nhóm công cụ hoạt ảnh, nhưng **Pretext không phải thư viện animation**.
Nó không có timeline, easing hay tween. Nó hữu ích cho animation ở chỗ dàn lại chữ đủ nhanh để làm mỗi khung hình:

- Chữ chảy vòng quanh một vật thể đang di chuyển (demo con rồng bay xuyên đoạn văn).
- Chữ rơi theo "vật lý", ASCII art, visualizer nhạc, game làm từ chữ.
- Danh sách ảo hoặc chat cần biết chiều cao từng dòng trước khi render, tránh giật khi cuộn.
- Kinetic typography trên Canvas/SVG, ví dụ trong các pipeline video bằng code như HyperFrames hay Remotion.

Muốn có chuyển động thì vẫn phải ghép với GSAP, Motion, `requestAnimationFrame` hoặc Canvas.
Demo chính thức: https://chenglou.me/pretext (hoặc clone repo rồi chạy `bun install && bun start`).

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả |
|---|---|
| Miễn phí, mã nguồn mở | ✅ MIT. |
| Dễ tùy biến, tích hợp thẳng vào dự án | ✅ Một gói npm nhỏ, không phụ thuộc framework. |
| "Làm full hoạt ảnh nhanh hơn" | ⚠️ Nói quá. Nó chỉ giải quyết phần **đo và dàn chữ**, là một mảnh ghép cho animation có chữ. |
| Nhanh hơn 300–600× (các blog bên thứ ba) | ⚠️ Chưa kiểm chứng. README không nêu con số này; mức nhanh hơn phụ thuộc vào trường hợp so sánh với DOM reflow. |

## Hạn chế (theo README)

- **Phải chạy trong trình duyệt:** cần Canvas 2D. Chạy trong Node, Bun hay jsdom sẽ báo lỗi, trừ khi bạn tự cung cấp một `OffscreenCanvas` có `measureText`.
- **Chỉ hỗ trợ cấu hình chữ phổ biến:** `white-space: normal/pre-wrap`, `word-break: normal/keep-all`, `line-break: auto`.
  Không khớp kết quả khi dùng `text-wrap: balance/pretty`, `hyphens: auto`, hoặc kerning/word-spacing khác mặc định.
- **Không xử lý thứ tự hiển thị bidi:** văn bản trộn Anh và Ả Rập phải để trình duyệt tự sắp thứ tự.
- **Font:**
  - Không dùng `system-ui` trên macOS; phải dùng tên font cụ thể.
  - Phải đợi web font tải xong rồi mới `prepare()`.
  - Font size phải là px, không dùng rem/em.
- **Tiếng Việt:** có dấu nhưng vẫn ngắt dòng theo khoảng trắng, nên dùng được bình thường (khác với tiếng Thái, Lào, Khmer cần `Intl.Segmenter`).
  Nên khai báo `lang="vi"` trên thẻ `<html>` và chọn font có đủ dấu tiếng Việt.

## Hợp với ai

Dev frontend làm UI nặng chữ: chat, feed, editor, virtual list, masonry. Người làm kinetic typography hoặc video bằng code cần biết trước chữ chiếm bao nhiêu chỗ.
Không hợp nếu bạn cần một thư viện animation hoàn chỉnh; khi đó dùng GSAP hoặc Motion.

## Nguồn

- https://github.com/chenglou/pretext
- https://chenglou.me/pretext
- https://www.pretext.cool/
- https://pasqualepillitteri.it/en/news/2293/pretext-15kb-zero-dom-text-layout-engine
