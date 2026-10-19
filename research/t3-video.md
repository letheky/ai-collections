# T3-Video: tạo video 4K "gốc" từ Wan2.1-1.3B

> Nguồn: bài giới thiệu do người dùng cung cấp. Ngày nghiên cứu: 2026-10-19.
> Không truy cập được trực tiếp huggingface.co và arxiv.org từ môi trường nghiên cứu.
> Thông tin dưới đây lấy từ kết quả tìm kiếm trích bài báo, model card và các bài tóm tắt.

## Tóm tắt

- **Bài báo:** "Transform Trained Transformer: Accelerating Naive 4K Video Generation Over 10×", arXiv 2512.13492 (tháng **12/2025**).
- **Model:** APRIL-AIGC/T3-Video trên Hugging Face, xây trên Wan-AI/Wan2.1-T2V-1.3B.
- **Phương pháp:** thay attention toàn cục bằng attention cửa sổ đa tỉ lệ dùng chung kích thước cửa sổ.
  Chi phí tính toán giảm từ bậc hai xuống gần tuyến tính, và không phải đổi kiến trúc Transformer.
  Tác giả gọi đây là thay đổi "một dòng code".
- **Huấn luyện:** chỉ fine-tune trên 42k video của bộ UltraVideo. Có thêm distill số bước sampling và CFG để tăng tốc khoảng 12,5×.
- **Đầu ra:** 2176×3840, 81 khung hình, text-to-video.

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| "Vừa ra mắt trên Hugging Face Spaces" | ⚠️ Không chính xác | Bài báo và model có từ tháng 12/2025. **Không tìm thấy Space demo nào.** |
| "Demo tương tác miễn phí ngay bây giờ" | ❌ Không xác minh được | Chỉ thấy model card có hướng dẫn tải về rồi tự chạy suy luận. |
| Video 4K gốc 3840×2176, sinh một lần từ model 1.3B | ✅ Đúng | Sinh trực tiếp ở 4K, không qua bước upscale. |
| Không có dấu vết của upscaler | ✅ Đúng về nguyên lý | Tác giả báo trên 4K-VBench: VQA +4.29, VTC +0.08 so với các cách khác. Đây là số tự công bố. |
| "Xóa bỏ rào cản tính toán" | ❌ Sai | Mỗi clip 4K dài 81 khung hình cần **dưới 60 GB VRAM và khoảng 1 giờ trên một GPU H20** (GPU data center). Nhanh hơn rất nhiều so với 33–45 giờ của full attention, nhưng **card gaming phổ thông không chạy nổi**. |
| "Chỉ chạy trên siêu máy tính doanh nghiệp" (câu dịch bị ngược nghĩa) | ⚠️ | Ý đúng là: từ chỗ cần hàng chục giờ GPU, nay còn khoảng 1 giờ trên một GPU data center. |

## Nhận xét

- Đóng góp chính là về **hiệu năng**: tăng tốc hơn 10× (backbone tăng tốc 21,4× về độ trễ thực tế) cho việc sinh video 4K gốc.
  Chất lượng nền vẫn là của Wan 1.3B: chi tiết sắc nét hơn, nhưng chuyển động và độ hiểu prompt không tốt hơn model gốc.
- Muốn tự chạy cần GPU khoảng 80 GB (A100/H100/H20) hoặc thuê cloud.
- Các con số đều do tác giả công bố. Chưa có đánh giá độc lập.

## Nguồn

- https://arxiv.org/abs/2512.13492
- https://arxiv.org/html/2512.13492
- https://huggingface.co/APRIL-AIGC/T3-Video
- https://zhangzjn.github.io/projects/T3-Video/
- https://www.themoonlight.io/en/review/transform-trained-transformer-accelerating-naive-4k-video-generation-over-10times
