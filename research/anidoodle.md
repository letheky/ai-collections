# anidoodle: tranh vẽ tay và phim quá trình vẽ, viết bằng code

> Nguồn: bài giới thiệu do người dùng cung cấp. Repo: https://github.com/alexgreensh/anidoodle
> Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

anidoodle (khẩu hiệu: "Art and animation, written as code") là một bộ skill/plugin cho coding agent.
Nó tạo ra tranh minh họa phong cách vẽ tay, kèm phim quay lại quá trình vẽ từng nét.

- Tác giả: Alex Greenshpun (`alexgreensh`).
- Giấy phép Apache-2.0. Khoảng 990 sao, 81 fork, 280 commit.
- Chạy bằng JavaScript (ES modules) trên Node 20+. Render qua Chromium headless (playwright-core). Cần ffmpeg cho các bản hoạt hình.
- Mỗi bức tranh là một hàm thuần với random có seed, nên cùng một source luôn ra cùng một kết quả.
- Đối tượng chính là AI agent: có plugin cho Claude Code, Codex và Grok, cùng một thư mục skill chuẩn (`skills/anidoodle/SKILL.md`). Người dùng mô tả bằng lời, agent viết code vẽ. Không có MCP server.

## Kiểm chứng các nhận định trong bài

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| Vẽ tranh trông như vẽ tay bằng code | ✅ Đúng | Có 32 phong cách: bút chì và màu nước, mực tàu (sumi-e), than, sáp màu, khắc gỗ/ukiyo-e, risograph, pixel art, low-poly 3D... |
| Tạo phim quá trình vẽ từng nét | ✅ Đúng | Nét vẽ được vẽ theo đúng thứ tự một họa sĩ của chất liệu đó sẽ làm, không phải hiệu ứng fade-in. Mỗi frame do một hàm thuần vẽ ra, không phải quay màn hình. |
| "Trong thời gian thực" | ⚠️ Một phần | MP4, GIF, WebM được render sẵn. Chỉ bản HTML tự chứa (khoảng 100 KB) là vẽ lại từ đầu mỗi khi mở. |
| Màu nước chảy, lưới pixel được lấp dần | ✅ Đúng | Đây là các *phong cách* ("Pencil & watercolour", "Pixel art" với 16 màu cố định), không phải "chế độ" riêng. |
| Sửa một nét là cả hoạt hình cập nhật ngay lập tức | ❌ README không nói vậy | Sửa source thì đúng là tất cả đầu ra đều đổi theo vì chung một source. Nhưng phải chạy lại tool để render, không có live preview tức thì. |
| "Không còn cần xuất ảnh tĩnh" | ⚠️ Hiểu sai | Vẫn xuất PNG tĩnh được (`still.mjs`, kích thước in). Ý đúng là có *thêm* phim, chứ không *thay thế* ảnh tĩnh. |

## Đầu ra

PNG; MP4 có nhạc; GIF; WebM; APNG nền trong suốt; một file HTML tự chứa.
Có 4 backend: playwright, html-player, remotion, hyperframes.
Nhạc cũng được soạn bằng code. Có gói âm thanh tùy chọn (373 MB); nếu không có thì nhạc cụ được tổng hợp bằng code.

## Cài đặt

```bash
# Claude Code
/plugin marketplace add alexgreensh/anidoodle
/plugin install anidoodle@alexgreensh-anidoodle

# Codex
codex plugin marketplace add alexgreensh/anidoodle
```

Chạy trực tiếp không qua agent: `scaffold.mjs` để tạo project, sau đó `npm install && npx playwright-core install chromium`,
rồi `node tools/still.mjs <tên>` để xuất PNG hoặc `node tools/render.mjs <tên> --out out/x.gif` để xuất phim.

## Hạn chế và lưu ý

- Bộ phụ thuộc khá nặng: Node, Chromium và ffmpeg.
- Đây là dự án của một tác giả. Repo không có lịch sử release rõ ràng và README không có mục nêu hạn chế.
- README viết theo giọng quảng cáo (ví dụ "Pay once, draw forever"), nên cần tự thử trước khi tin.
- Hợp nhất với: ảnh minh họa cho blog hoặc landing page, video explainer, video launch sản phẩm, thumbnail có animation.

## Nguồn

- https://github.com/alexgreensh/anidoodle
- https://raw.githubusercontent.com/alexgreensh/anidoodle/main/README.md
