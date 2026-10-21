# Local Video Studio — Wan 2.2 và giọng Việt

> Code: [examples/local-video-studio](../examples/local-video-studio/) · Kiểm tra trên Windows: 21/10/2026.

## Là gì

Ví dụ sản xuất phim local nối Wan2.2-TI2V-5B với VieNeu v3 Turbo, FFmpeg và hàng đợi Python/PowerShell. Kèm phim demo hiệu ứng nhà kính và 10 kịch bản khí hậu tiếng Việt, mỗi tập 16–18 chương. Model, bộ cài và media sinh ra không nằm trong Git.

## Đã kiểm tra

Máy: i9-14900K, RAM 128 GB, RTX 5070 Ti 16 GB. Python 3.11; PyTorch 2.8.0/cu128; Wan source chính thức; VieNeu 3.8.3 và ONNX Runtime 1.31.0 trong venv riêng.

| Phần | Kết quả và giới hạn |
|---|---|
| Wan 2.2 local | ✅ Pipeline gốc đã tạo clip 832 × 480, 121 frame/24 fps; mẫu so sánh 50 bước mất khoảng 657 giây. Worker phim dùng 40 bước và giữ model trên GPU, có offload dự phòng. Không coi số đo đó là cam kết cho máy khác. |
| Giọng nữ tiếng Việt | ✅ VieNeu v3 Turbo preset Ngọc Linh chạy CPU, đã tạo thuyết minh cho bản phim ngắn. Chưa benchmark so sánh các giọng/model khác. |
| Bản dựng | ✅ Lượt ghép thử có video, phụ đề Việt và âm thanh; xuất 1080p từ cảnh gốc 480p, không phải sinh native Full HD. |
| Phim/series dài | ⚠️ Tại thời điểm ghi chú, phim Wan đầu vẫn render; 10 kịch bản đã soạn và hàng đợi ở workspace gốc đang chờ. Chưa có kết quả end-to-end cho cả 10 tập. |
| Bản code đóng gói | Có cấu hình đường dẫn, test chuẩn bị project và smoke render CPU. Chưa chạy lại GPU generation từ bundle; pipeline gốc và bản export cần được phân biệt. |

## Những phần bổ sung so với các ghi chú trước

- Worker Wan chính thức với SDPA cho Windows, BF16, FFN chunking, cache embedding prompt và offload khi cần.
- Giọng Việt CPU để dành GPU cho video.
- Timeline, subtitle theo độ dài audio thực tế; optical flow/Lanczos, ASS/SRT và loudness normalization trong hậu kỳ.
- Project có script/nguồn/plan, clip và metadata riêng từng cảnh; queue chạy một tập một lần, tiếp tục từ kết quả đã lưu.
- Kiểm tra thời lượng trước generation và sau encoding: hơn 10 phút cho mỗi tập series, không đệm im lặng để đủ phút.

Python và FFmpeg đã xuất hiện trong collection. Điểm mới ở đây là một pipeline cụ thể có input/output và code vận hành. OpenMontage, Herk, Seedance và HyperFrames đã được nghiên cứu để cải thiện quy trình nhưng **chưa tích hợp** vào runtime này.

## Dùng thử

Xem [README và cấu hình](../examples/local-video-studio/README.md). Có lệnh `doctor`, `prepare`, `run-demo`, `queue`, `status`. `prepare` không dùng GPU. Trọng số và các runtime cần được chuẩn bị trước; việc clone repo không tự làm model sẵn sàng.

Hình phim là minh họa AI, không phải dữ liệu quan trắc. File hợp lệ về codec/thời lượng chưa chứng minh chuyển động đẹp hoặc nội dung khoa học đúng; vẫn cần xem, nghe và kiểm chứng nguồn trước khi công bố.
