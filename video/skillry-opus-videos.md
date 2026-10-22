# Skillry (awesome-opus5-5-videos)

> Repo: https://github.com/yihui-dev/awesome-opus5-5-videos · MIT · Trang: https://skillry.dev/ai-videos/opus-5-5
>
> ⭐ **8.751 sao**, 876 fork (GitHub API, 2026-10-22) · Repo tạo 2026-09-27 · Đã test: 2026-10-22
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/QAjKzMaye1tjEZVMq7tidm (video Remotion làm theo một prompt mẫu của bộ sưu tập)

## Là gì

Bộ sưu tập video do người dùng làm bằng Claude Opus 5.5, kèm **prompt gốc** mà tác giả chia sẻ.
Mỗi video là animation viết bằng code (HTML, Canvas, SVG, Three.js…).
Trang Skillry đặt video gốc cạnh bản làm lại (remake) để so sánh.

Lưu ý khi tìm: có nhiều repo cùng tên `awesome-opus5-5-videos` của tác giả khác. Bản có sao nhiều nhất là `yihui-dev`, các bản còn lại chỉ 0–5 sao.

## Đã kiểm tra (dữ liệu trong repo)

| Mục | Kết quả |
|---|---|
| Số prompt | ✅ **703** (`prompts/*.md` và `data/videos.json`) từ **616 tác giả** |
| Phân loại | motion 369 · 3d 117 · explainer 116 · interactive 101 |
| Prompt không đầy đủ | ⚠️ **207 / 703 (29%)** chỉ có một phần prompt, hoặc chỉ là mô tả kết quả |
| Có bản remake trên Skillry | 418 / 703 |
| Độ dài prompt | Trung vị 221 ký tự, dài nhất 15.583 |
| Công nghệ hay dùng | canvas 267 · svg 183 · threejs 131 · shader 92 · gsap 86 |
| Trang skillry.dev | ⛔ Không mở được từ môi trường test (không phân giải được tên miền) |

## Đã test

Lấy một prompt explainer dạng điền chỗ trống: video 30 giây, 5 cảnh (vấn đề → bạn làm gì → 3 bước → bằng chứng → tên).
Tôi điền một app tiết kiệm hư cấu, rồi dựng bằng Remotion theo các quy tắc của claude-remotion-skill.

| Bước | Kết quả |
|---|---|
| Làm theo prompt | ✅ Video 15 giây, 5 cảnh, 1080p. Render mất **1 phút 6 giây** bằng CPU |
| Kiểm tra frame | ✅ Chữ tiếng Việt đúng dấu, không tràn khung |

## Kết luận nhanh

✅ Kho ý tưởng và prompt lớn, miễn phí, hữu ích để tham khảo cấu trúc prompt animation.
⚠️ Khoảng 30% prompt không đầy đủ. Nhiều prompt rất ngắn, chủ yếu dựa vào khả năng của model.
Muốn kết quả ổn định thì nên kết hợp với một skill có quy tắc rõ ràng (claude-remotion-skill, HyperFrames, gsap-skills).

## Cách dùng (theo README)

Mở một file trong `prompts/`, chép phần **Prompt**, dán cho Claude (Claude Code hoặc app), rồi yêu cầu xuất một file HTML.
Muốn có video thì quay trang lại, hoặc dùng Remotion / HyperFrames để render.
