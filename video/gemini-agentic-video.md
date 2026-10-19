# Gemini Agentic Video Understanding

> Tài liệu: https://ai.google.dev/gemini-api/docs/video-understanding · https://aistudio.google.com/learn/agentic-video-understanding-with-gemini
>
> Ngày nghiên cứu: 2026-10-19 · **Chưa test** (cần Gemini API key)

## Là gì (theo tài liệu Google)

Một chế độ xử lý video trong Gemini API, ra mắt ngày 2026-09-01.

- **Chế độ thường (static):** lấy mẫu đều 1 khung hình/giây rồi đưa hết vào context.
- **Chế độ agentic:** model tự chọn đoạn cần xem, tốc độ xem và kênh (khung hình, âm thanh hay transcript), rồi chỉ lấy những đoạn đó.
- **Cách bật:**
  - Interactions API: `processing: "agentic"`.
  - `generate_content`: `media_processing="AGENTIC"` trên phần video.
- **Nên dùng khi:** video dài hơn khoảng 5 phút (bài giảng, webinar, trận đấu), hoặc cần timestamp chính xác.
  Với clip ngắn, GIF hay animation UI thì Google khuyên dùng chế độ static.
- **Con số Google công bố:** giảm tới 88% token, 66% chi phí, độ chính xác cao hơn tới 7%. Không thu thêm phí.
- **Mẹo tiết kiệm:** dùng kèm `media_resolution` low (70 token/khung hình) để giảm thêm token.

## Không test được

Môi trường test không có Gemini API key và không truy cập được ai.google.dev.
Danh sách model hỗ trợ khác nhau giữa các trang tài liệu (3.5 Flash-Lite, 3.6/3.7/3.8 Flash, Gemini 4 Argon), nên kiểm tra lại trước khi dùng.

## Kết luận nhanh

Đáng thử cho tóm tắt bài giảng và tìm khoảnh khắc trong video dài.
Hiện chỉ có số liệu do Google tự công bố.
