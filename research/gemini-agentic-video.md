# Gemini Agentic Video Understanding

> Nguồn: mô tả video do người dùng cung cấp.
> Ngày nghiên cứu: 2026-10-19. Không truy cập trực tiếp được blog.google và ai.google.dev từ môi trường nghiên cứu,
> nên thông tin dưới đây tổng hợp từ kết quả tìm kiếm trích các trang đó và từ các bài phân tích bên thứ ba.

## Tóm tắt

Ngày 2026-09-01, Google công bố chế độ xử lý video "agentic" cho Gemini.

Ở chế độ mặc định (static), video được cắt thành khung hình đều đặn 1 FPS rồi đưa toàn bộ vào context.
Ở chế độ agentic, model **tự quyết định** xem đoạn nào, ở tốc độ nào và qua kênh nào (khung hình, âm thanh hay transcript).
Model chỉ lấy những đoạn cần thiết thông qua một công cụ nội bộ.

## Kiểm chứng các ý trong video

| Ý trong video | Kết quả | Ghi chú |
|---|---|---|
| Nhồi cả video vào context rất tốn kém | ✅ Đúng | Chế độ static tính khoảng 70 token/khung hình ở độ phân giải low/medium, 280 ở high. Video 1 giờ ở 1 FPS là khoảng 3.600 khung hình. |
| AI làm như "đạo diễn ảo": tìm đúng đoạn rồi mới phân tích | ✅ Đúng về bản chất | Google mô tả: tìm các mốc có khả năng liên quan, sau đó xem kỹ những đoạn đó. |
| Định vị mốc quan trọng và truy vấn lại đúng khoảnh khắc | ✅ Đúng | Google nêu khả năng truy xuất khoảnh khắc chính xác dưới 1 giây, "mò kim đáy bể" trong video dài, phát hiện bất thường, đếm vật thể/hành động. |
| Cắt highlight thể thao | ✅ Google có nêu | Ví dụ chính của Google là một trận đấu dài 2 giờ. Nhưng Google không công bố benchmark riêng cho việc cắt highlight, và có bài review cho rằng Gemini còn yếu với cảnh cắt nhanh. |
| Bắt lỗi trong bản ghi màn hình | ⚠️ Không có trong tài liệu chính thức | Chỉ có một case study bên thứ ba (ghi màn hình buổi lập trình). Lưu ý: Google khuyên dùng chế độ static cho clip ngắn dưới 5 phút và cho animation UI. |
| Tóm tắt bài giảng | ✅ Đúng | Google liệt kê bài giảng, webinar, earnings call và kho lưu trữ phát sóng là những trường hợp nên dùng agentic. |

## Con số Google công bố (tự đo, chưa có kiểm chứng độc lập)

- Giảm tới **88% token** và tới **66% chi phí**, độ chính xác cao hơn tới **7%**.
- Hiệu quả rõ nhất với video dài (bài giảng 90 phút, bản ghi nhiều giờ).
- Tính giá token như bình thường, không thu thêm phí.

## Model và cách bật

- **Model hỗ trợ:** các nguồn liệt kê không thống nhất, gồm Gemini 3.8 / 3.7 / 3.6 Flash, 3.5 Flash-Lite và Gemini 4 Argon. Nên kiểm tra danh sách hiện tại trong tài liệu trước khi dùng.
- **Kênh truy cập:** Gemini API (Google AI Studio) và Gemini Enterprise Agent Platform. Google nói sau này sẽ đưa vào ứng dụng Gemini và "Ask YouTube".
- **Cách bật:**
  - Interactions API: đặt `processing: "agentic"`.
  - `generate_content`: đặt `media_processing="AGENTIC"` trên phần video.
  - Tên tham số khác nhau giữa hai API này, nên kiểm tra đúng API mình đang gọi.
- **Mẹo:** kết hợp chế độ agentic với `media_resolution` low để tiết kiệm token tối đa khi xử lý video dài.

## Khi nào nên dùng

| Video | Chế độ nên dùng |
|---|---|
| Dài hơn khoảng 5 phút; cần tìm một khoảnh khắc cụ thể hoặc timestamp chính xác; có chuyển động nhanh mà 1 FPS bỏ sót | agentic |
| Clip ngắn dưới 5 phút; GIF; animation UI; cần xem toàn bộ nội dung | static |

Đánh đổi: chế độ agentic gọi công cụ nhiều vòng, nên độ trễ có thể cao hơn.

## Ghi chú về chính video này

Phần ghi chú của video nói nhạc nền "tự tổng hợp bằng ffmpeg trong video-lab" và footage lấy từ Pexels / Mixkit (giấy phép miễn phí).
Đây là cách làm video giống các repo dựng phim bằng code đã nghiên cứu ở các ghi chú khác (lemo-opuscar, hyperframes…).

## Nguồn

- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/
- https://ai.google.dev/gemini-api/docs/video-understanding
- https://ai.google.dev/gemini-api/docs/media-resolution
- https://aistudio.google.com/learn/agentic-video-understanding-with-gemini
- https://cloud.google.com/discover/agentic-video-understanding
- https://www.techrepublic.com/article/news-google-gemini-agentic-video-understanding/
- https://www.vp-land.com/stories/gemini-apis-agentic-video-mode-navigates-long-footage-instead-of-sampling-the-whole-clip
