# 5 reel Facebook về kênh "hoạt hình code / stickman" (11/2026)

> Nguồn: 5 file MP4 người dùng tải từ Facebook (720×1280, 10–53 giây); link gốc gửi 7 cái nhưng chỉ có 5 video.
> Phân tích 2026-11-24:
> - lời nói chép bằng faster-whisper `small`;
> - hình xem bằng contact sheet;
> - số cảnh cắt đếm bằng ffmpeg (`scene > 0.3`), âm lượng đo bằng `ebur128`;
> - repo được nhắc kiểm tra qua GitHub API.
>
> Máy test không mở được Facebook, YouTube, Social Blade, nên số view và thu nhập trong reel **chưa kiểm chứng**.

## Tóm tắt từng reel

| # | Dài | Nội dung | Thông điệp chính | Kiểm chứng |
|---|---|---|---|---|
| 1 | 10 s | Ảnh chụp tweet của @Adam_DelDuca (không lời): "kênh faceless đơn giản kiếm $15.000+/tháng" | Stack: VidIQ (chủ đề), Claude (kịch bản), Tubegen (video), 1of10 (thumbnail). Ví dụ kênh "Ink Explainer" | Ba công cụ kia là dịch vụ trả phí, không có mã nguồn mở trên GitHub. Con số $15k chưa có nguồn |
| 2 | 26 s | Quảng cáo "Numa, desktop agent": nhân vật Spark vẽ bằng code theo **10 phong cách** (clay 3D, flat cartoon, blueprint, riso, 16-bit, ink silhouette, rubber hose, ASCII, cardboard cutout, 90s low poly) | Một nhân vật có thể đổi đủ kiểu hình bằng code | Không tìm thấy repo "Numa" trên GitHub. Ý tưởng "một nhân vật, nhiều phong cách" thì đúng là làm được bằng code (xem [15 repo motion](../animation/claude-motion-studio-15-repos.md)) |
| 3 | 33 s | Tiếng Việt: "35 triệu view với hoạt hình code". Một Short kể chuyện "cái chum cổ từng cảnh báo cả một đế chế" (máy dò động đất cổ), 27 triệu view sau 8 ngày, nay 35 triệu | "Không diễn viên, không máy quay, tự làm bằng Claude miễn phí", hướng dẫn 8 phút trên kênh | Clip mẫu là nhân vật đầu tròn trong **cảnh 3D có ánh sáng điện ảnh**: đặc trưng của video tạo bằng model (chế độ A của skill dưới đây), không phải "hoạt hình code" miễn phí. Số view chưa kiểm được |
| 4 | 53 s | Tiếng Anh, hai nhân vật 3D trò chuyện: "Làm video stickman có thật kiếm tiền? Làm miễn phí được không?" | Repo `kaomei/stickman-video-director` "free on GitHub"; bằng chứng là kênh @ifversetales | Repo có thật, MIT, **7.778 sao** (reel ghi 5,9k nên reel đã cũ vài tuần). Ảnh Social Blade trong reel ghi kênh này có 62k sub, 9,7 triệu view, 36 video, lập 2022. Thu nhập "$1,7k–$28k/tháng" chỉ là **ước tính** của Social Blade, khoảng chênh 16 lần. Không có gì cho thấy kênh này dùng repo đó |
| 5 | 30 s | Tiếng Anh: kênh Crayon Capital "306k sub chỉ với 34 video", toàn video stickman | "Tôi làm một Claude skill tạo trọn video, comment 'skill' để tôi gửi link" | Skill không công khai; đây là mẹo kéo comment để tăng tương tác. "Mở Claude, tải skill lên, bấm Generate là ra video hoàn chỉnh" là quá đơn giản: dựng video cần chạy code, có giọng đọc, có ảnh |

## Đã thử: Stickman Video Director

Repo duy nhất được nêu tên. Tôi đã cài và chạy thử ([ghi chú riêng](stickman-video-director.md)):
- 603/603 test đạt.
- Project mẫu B1 render 16,4 giây trong 16 giây trên CPU, sau khi sửa cho qua bước kiểm tra của chính repo.
- Kiểu 3D "như phim" trong reel 3 và 4 là **chế độ Model Engine**, phải dùng Google Flow hoặc dịch vụ tạo video trả phí.
- Chế độ Code Engine không tốn credit video, nhưng vẫn cần công cụ tạo ảnh và TTS.

## Nhận xét chung

**1. Cùng một kịch bản quảng cáo.** Cả 5 reel đi theo một mô-típ: số view hoặc thu nhập lớn → "không mặt, không máy quay" → "miễn phí với Claude/GitHub" → kêu gọi xem kênh hoặc comment. Bằng chứng luôn là ảnh chụp màn hình, không có link kiểm chứng.

**2. "Miễn phí" chỉ đúng một phần.**
- Skill và code thì miễn phí.
- Hình 3D đẹp cần model tạo video (tốn credit).
- Ảnh nhân vật và giọng đọc cần công cụ AI (có phí hoặc giới hạn).
- Agent cần gói Claude hoặc Codex.

**3. Số liệu cần dè chừng.**
- Thu nhập từ Social Blade chỉ là ước tính với khoảng rất rộng.
- Kênh dẫn làm ví dụ không chứng minh được là đã dùng công cụ được quảng cáo.
- Một video "27 triệu view sau 8 ngày" là trường hợp cá biệt, không phải mức trung bình.

**4. Kỹ thuật dựng đáng học từ chính các reel:**

| Điểm | Đo được |
|---|---|
| Âm lượng | Cả 5 reel ở −13,9 đến −14,9 LUFS, đúng chuẩn mạng xã hội |
| Câu mở | Mỗi reel mở bằng một con số hoặc câu hỏi trong 3 giây đầu ("35 triệu view", "$15,000+ a month", "can I do it for free?") |
| Chữ to cố định | Reel 3 và 4 giữ một dòng tiêu đề lớn ở trên suốt video, phụ đề từng cụm 1–3 từ ở dưới, tô màu chữ khóa |
| Cấu trúc 3 phần có đánh dấu | Reel 4 có thanh tiến trình "What people say → How to do it free → Real or cap?" cho người xem biết còn bao lâu |
| Ít cắt cảnh | 0–6 lần cắt cảnh mạnh mỗi reel; nhịp đến từ phụ đề và chuyển động trong cảnh, không phải cắt liên tục |

**5. Áp dụng cho phim Berlin:**
- Mở bằng câu hỏi ngay giây đầu ("Vì sao lính gác nâng rào?").
- Giữ một dòng tiêu đề cố định khi làm bản Shorts.
- Phụ đề tô từ khóa (ffmpeg-skill `caption --karaoke` đã làm được).
- Chuẩn hóa về −14 LUFS.
- Phong cách giấy dán và mạch kể sự kiện thật vốn đã khác hẳn kiểu stickman đang bị làm tràn lan, nên đó là lợi thế, không nên chạy theo.
