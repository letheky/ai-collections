# 7 prompt Claude xây kênh YouTube

> Nội dung: 7 prompt người dùng cung cấp (không có repo). Ngày đánh giá: 2026-10-19.

## Là gì

Bộ 7 prompt tiếng Việt, mỗi prompt ứng với một giai đoạn làm kênh YouTube:

1. Chọn ngách
2. Tìm khoảng trống nội dung
3. Lên 100 ý tưởng video
4. Viết kịch bản
5. Viết tiêu đề và ý tưởng thumbnail
6. Lập kế hoạch 90 ngày để bật kiếm tiền
7. Xây lộ trình doanh thu 6 tháng

Đây chỉ là văn bản prompt, không phải công cụ, nên không có gì để cài.
Phần đánh giá dưới đây dựa trên việc đọc từng prompt và đối chiếu với hành vi thực tế của LLM.

## Đánh giá từng prompt

| # | Điểm tốt | Vấn đề thực tế | Mức hữu ích |
|---|---|---|---|
| 1. Chọn ngách | Đưa đủ bối cảnh: kinh nghiệm, sở thích, kỹ năng, thời gian. Yêu cầu chấm theo nhiều tiêu chí, có tiêu chí không lộ mặt | Model **không có dữ liệu thị trường thật**, nên phần "tiềm năng 2026" và "mức cạnh tranh" chỉ là suy đoán | ✅ Tốt để brainstorm |
| 2. Khoảng trống nội dung | Đúng tư duy: tìm chỗ đối thủ bỏ trống thay vì cạnh tranh trực tiếp | ⚠️ **Rủi ro bịa số liệu cao nhất.** Không có công cụ web thì model không xem được kênh hay link đối thủ, nhưng vẫn có thể trả lời như đã phân tích | ⚠️ Chỉ đáng tin khi có dữ liệu thật đi kèm |
| 3. 100 ý tưởng | Có tiêu chí: tiêu đề, lý do, video dài hay ngắn | 100 ý trong một lần trả lời thường **lặp và nông dần về cuối**, dễ bị cắt giữa chừng | ⚠️ Nên chia nhỏ |
| 4. Kịch bản | Có cấu trúc giữ chân: hook 15 giây, các khoảng tò mò, lời kêu gọi đăng ký | Thiếu độ dài video, giọng kênh, đối tượng khán giả và nguồn số liệu, nên kịch bản dễ chung chung. Với nội dung tài chính, sức khỏe thì dễ có số liệu sai | ⚠️ Cần thêm bối cảnh và kiểm chứng |
| 5. Tiêu đề và thumbnail | Có giới hạn "không giật tít quá đà", yêu cầu giải thích lý do | Model không thấy hình thumbnail thật và không biết CTR thật | ✅ Tốt để có nhiều phương án A/B |
| 6. Kế hoạch 90 ngày | Chia theo tuần, có KPI và sai lầm cần tránh | ⚠️ Model có thể đưa **ngưỡng kiếm tiền cũ hoặc sai**. Theo các hướng dẫn 2026 (chưa đối chiếu Help Center): 1.000 sub + 4.000 giờ xem trong 12 tháng, **hoặc** 10 triệu lượt xem Shorts trong 90 ngày; kèm xác thực 2 bước, AdSense, không có cảnh cáo. Một số nguồn ghi ngưỡng sẽ tăng từ 1/2/2027. Cam kết "90 ngày" là không thực tế với đa số kênh mới | ⚠️ Phải tự kiểm tra ngưỡng trong YouTube Studio |
| 7. Lộ trình doanh thu | Liệt kê đủ các nguồn thu, yêu cầu thứ tự triển khai | Thiếu bối cảnh về thị trường Việt Nam (affiliate nào, cổng thanh toán, thuế) | ✅ Khung tốt, cần thêm bối cảnh |

## Vấn đề chung

- **Vai chuyên gia không thay được dữ liệu.** Kiểu prompt "đóng vai chuyên gia đã làm nhiều kênh thành công" không cho model thêm dữ liệu nào.
  Muốn kết quả có căn cứ thì nên dùng Claude có bật tìm kiếm web,
  hoặc dán dữ liệu thật vào prompt: số liệu YouTube Studio, danh sách video top của đối thủ, kết quả tìm kiếm.
- **Không có bước kiểm chứng.** Nên yêu cầu model ghi rõ chỗ nào là giả định và chỗ nào cần kiểm tra.
- **Không nối các bước với nhau.** Kết quả của prompt 1 nên được đưa vào prompt 2 và 3. Làm trong cùng một cuộc trò chuyện, hoặc lưu thành file trong Claude Code / Projects.

## Cách dùng hiệu quả hơn

1. **Thêm một đoạn bối cảnh cố định** vào đầu mọi prompt: thị trường (Việt Nam), ngôn ngữ, đối tượng khán giả, định dạng (dài hay Shorts), có lộ mặt hay không.
2. **Thêm câu ràng buộc** cuối mỗi prompt:
   "Nếu không có dữ liệu thực tế, hãy nói rõ đó là giả định. Liệt kê những điểm tôi cần tự kiểm chứng."
3. **Prompt 2:** dán dữ liệu thật, ví dụ 20 video nhiều view nhất của 3–5 kênh đối thủ (tiêu đề, lượt xem, ngày đăng), thay vì chỉ đưa link.
4. **Prompt 3:** chia làm 4 lượt, mỗi lượt 25 ý tưởng theo một nhóm chủ đề, rồi yêu cầu loại bỏ ý trùng.
5. **Prompt 4:** thêm độ dài mục tiêu (ví dụ 8–10 phút, khoảng 1.200–1.500 từ), giọng kênh, và yêu cầu ghi nguồn cho mọi con số.
6. **Prompt 6:** dán ngưỡng đủ điều kiện đang hiển thị trong YouTube Studio của bạn, thay vì để model tự nhớ.

## Kết hợp với các công cụ trong bộ sưu tập

| Prompt tạo ra | Dùng tiếp với |
|---|---|
| Kịch bản (prompt 4) | [OpenMontage](../video/openmontage.md) hoặc [HyperFrames](../animation/claude-motion-studio-15-repos.md) để dựng video giải thích; [huashu-art-motion](../animation/huashu-art-motion.md) có sẵn mẫu biểu đồ tài chính |
| Ý tưởng thumbnail (prompt 5) | [Taste Skill](../design/taste-skill.md) / [Impeccable](../design/impeccable.md) để kiểm tra độ tương phản và thứ bậc chữ |
| Video demo sản phẩm (cho affiliate, prompt 7) | [Recordly](../video/recordly.md) |

## Kết luận nhanh

⚠️ Đây là bộ khung brainstorm tốt và miễn phí. Nhưng không prompt nào cho model dữ liệu thật về YouTube.
Prompt 2 và 6 dễ cho kết quả sai nhất nếu không đi kèm dữ liệu thực tế.
"Bật kiếm tiền trong 90 ngày" là mục tiêu, không phải điều prompt bảo đảm được.
