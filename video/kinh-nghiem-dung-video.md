# Kinh nghiệm dựng video bằng AI

> Rút ra từ việc tự làm trong collection này (10–17/11/2026):
> - Shorts cà phê 43,6 giây;
> - phim tài liệu giấy dán về đêm Bức tường Berlin mở cửa: pilot 3D, lời dẫn Edge và VieNeu, QA kịch bản v7;
> - chạy thử khoảng 15 công cụ dựng video.
>
> Mỗi mục ghi **bằng chứng** là số đo hoặc lỗi đã gặp thật. Phần cuối tách riêng các mẹo từ bản tin mà tôi chưa kiểm chứng.

## 1. Năm nguyên tắc

1. **Không tin chữ "xong", luôn đo lại file đầu ra.**
   - html-video báo `"status":"rendered"` nhưng video vẫn là nội dung mẫu ([ghi chú](html-video.md)).
   - Script của tôi ghi âm 48 kHz thành 24 kHz, lời đọc chậm gấp đôi mà không có lỗi nào báo ra ([VieNeu](../voice/vieneu-tts.md)).
   - Cách kiểm: sau mỗi bước chạy `ffprobe` (thời lượng, sample rate, kích thước) và xem contact sheet.
2. **Kiểm tra sự kiện trước khi thu âm.** Sửa một câu sau khi đã dựng hình thì phải làm lại cả thu âm, timeline và cảnh. Kịch bản v7 phim Berlin có 4 chỗ lệch nguồn, đều nằm ở câu trông "an toàn":
   - "hãng thông tấn Mỹ": nguồn ghi dpa (Tây Đức) lúc 19:04;
   - "chín rưỡi": nguồn ghi từ khoảng 21:20;
   - "hàng nghìn": riêng ở Bornholmer là gần 1.000;
   - "mùa thu": Hungary gỡ rào từ tháng 5, mở biên giới từ tháng 8.
3. **Dồn công sức vào vài cảnh, phần còn lại dùng hình tĩnh có chuyển động.**
   - Pilot 3D render 45–62 giây mỗi khung trên CPU 4 nhân: 235 khung mất gần 4 giờ.
   - Toàn bộ phần 3D của phim khoảng 5 phút ước 45–55 giờ CPU.
   - Trong khi đó HyperFrames render 5 giây motion graphics chỉ mất 10,5 giây.
   - Vì vậy chỉ dựng 3D cho cảnh then chốt (cửa khẩu mở lúc 23:30). Bản đồ, tài liệu, ảnh tư liệu dùng ảnh tĩnh lia/zoom hoặc motion graphics bằng code.
4. **Tạo theo từng câu, không tạo cả bài một lần.**
   - VieNeu đọc cả bài một lần bị sai dấu ("giọt thật châm").
   - Tạo từng câu thì sửa được đúng câu hỏng, mỗi đoạn khoảng 30 giây.
   - Lần tạo đầu của giọng Quang Sơn dài 28 giây và mất nửa câu; tạo lại một lần thì đủ câu.
5. **Mỗi bước phải chạy lại được và bỏ qua phần đã xong.**
   - Tiến trình render nền bị dừng giữa chừng hai lần.
   - Script render bỏ qua khung đã có, nên chỉ cần chạy lại là tiếp tục, không mất việc.

## 2. Quy trình từng khâu

### Kịch bản
- Viết cho tai nghe: câu ngắn, mỗi câu một ý, số đọc thành chữ ("mười một giờ rưỡi"). TTS đọc "23:30" hay "1989" mỗi giọng một kiểu.
- Có bảng đối chiếu: câu nào → nguồn nào, nguồn nói gì. anything2explainer bắt buộc điều này: con số không có URL nguồn thì không được lên hình ([ghi chú](anything2explainer.md)). Nên áp dụng cho mọi video tài liệu.
- Đánh mã từng đoạn ([N00a], [N21b]...) để thu âm, phân cảnh và sửa lỗi đều theo cùng một mã.

### Giọng đọc
- **Edge TTS:** nhanh, miễn phí, có mốc thời gian từng từ.
  - Lỗi đã gặp: sau proxy phải truyền `proxy=` (websocket không tự đi qua proxy).
  - Lỗi đã gặp: thỉnh thoảng trả về rỗng (`NoAudioReceived`), cần vòng thử lại.
  - Âm thanh ra 24 kHz. Công cụ kiểm tra Shorts đã cảnh báo đúng điều này.
- **VieNeu:** chạy offline, nhanh hơn thời gian thực trên CPU (8 giây audio trong khoảng 7 giây), có 25 giọng ba miền ([bảng nghe thử](https://claude.ai/artifact/HtQZncAkUhXn1ARZEoBc5t)).
  - Ghi file bằng `tts.sample_rate` (48 kHz), đừng tự đặt số.
  - Lời dẫn 5:50 đọc từng câu với `temperature=0.3`, cắt khoảng lặng hai đầu, nghỉ 0,22 giây giữa các câu và 0,6 giây giữa các đoạn: nghe tự nhiên, sửa được từng đoạn.
- **Kiểm bằng Whisper chỉ phát hiện được câu bị mất chữ, không chứng minh đọc đúng.**
  - Whisper tự sửa theo ngữ cảnh nên bỏ lọt lỗi sai dấu.
  - Whisper hay nghe "rưỡi" thành "dưới" và nghe giọng miền Trung kém.
  - Bước cuối vẫn phải nghe bằng tai.

### Âm thanh
- Chuẩn YouTube/Shorts là khoảng **−14 LUFS**, đỉnh ≤ −1 dBTP.
  - Lời dẫn VieNeu gốc chỉ −19,8 LUFS.
  - Dùng ffmpeg `loudnorm` hai lượt (ffmpeg-skill làm sẵn) ra −14,9 LUFS. Mức này chưa tới −14, nhiều khả năng do bản gốc có đỉnh −0,8 dBTP nên không tăng thêm được mà không vượt −1 dBTP. Muốn lên đủ thì cần nén hoặc giới hạn đỉnh trước.
- Đo lại độc lập bằng `ffmpeg -af ebur128=peak=true`, đừng chỉ đọc số công cụ báo.

### Hình ảnh
- **Phong cách giấy dán 3D (Blender):**
  - Thớ giấy và loang màu nhẹ cho cảm giác thật hơn bề mặt phẳng.
  - Viền cắt giấy (Freestyle) chỉ nên áp cho người, cây, xe, nhà. Áp cho cả tường gạch và dây thép gai thì rối hình.
  - Thêm một lớp vân giấy đổi theo từng khung sau khi render để có cảm giác stop-motion.
- **Motion graphics bằng code:** HyperFrames và Remotion render được trên CPU.
  - Máy chặn tải trình duyệt thì trỏ sang Chromium có sẵn (`REMOTION_BROWSER_EXECUTABLE`, `HYPERFRAMES_BROWSER_PATH`).
  - Template tải thư viện từ CDN thì cần mạng khi render.
- **Footage stock:** Pexels tạm ngưng cấp key mới (10/11/2026). Ghép stock tự động dễ ra video lặp, nhạt, nên duyệt và chọn lại từng cảnh.
- Kiểm hình bằng **contact sheet** (6–12 khung trên một ảnh) thay vì xem cả video. Cách này nhanh và bắt được lỗi bố cục.

### Phụ đề
- Tạo phụ đề tự động bằng Whisper `small` trở lên. Model `base` nghe "Berlin" thành "Bờ Linh".
- Đã có kịch bản thì dùng chính kịch bản làm chữ, chỉ lấy mốc thời gian từ TTS hoặc Whisper. Chữ sẽ đúng 100%.
- Xuất thêm file `.ass` để sửa tay rồi render lại.
- Kiểm tra font có đủ dấu tiếng Việt. Be Vietnam Pro (MoneyPrinterTurbo) và DejaVu Sans (ffmpeg-skill) đều hiển thị đúng trong các lần thử.

### Xuất bản
- Chạy kiểm tra trước khi đăng (`ffmpeg-skill check.py --platform shorts`). Lần thử đã bắt đúng 3 lỗi thật của pilot: âm lượng, sample rate, thiếu track phụ đề.
- Shorts: 1080×1920. Chuyển từ 16:9 bằng nền mờ (`fit --fit blur`) để không mất chữ ở hai bên.
- Ghi lại nguồn của mọi tư liệu, ảnh và B-roll (file `MANIFEST` hoặc mô tả video) trước khi đăng.

## 3. Chọn công cụ (đã test)

| Việc | Dùng | Ghi chú |
|---|---|---|
| Cắt, đổi khung, âm lượng, phụ đề, kiểm tra | [ffmpeg-skill](ffmpeg-skill.md) | Không cần cài thêm thư viện, tự đo lại kết quả |
| Motion graphics, số liệu, bản đồ | [HyperFrames, gsap-skills](../animation/claude-motion-studio-15-repos.md) | CPU, miễn phí |
| Video giải thích nền tối | [anything2explainer](anything2explainer.md) | Phi thương mại |
| Shorts nhanh từ kịch bản | [MoneyPrinterTurbo](moneyprinterturbo.md) | 43,6 giây trong 2 phút 14 giây |
| Giọng Việt | [Edge TTS](../voice/edge-tts.md), [VieNeu](../voice/vieneu-tts.md) | Edge nhanh; VieNeu offline, nhiều giọng |
| Xem trước video cho agent | [Comfy MCP](../agents/comfy-mcp.md) `preview_media`, ffmpeg-skill `look` | Contact sheet |

Tránh: html-video (điền nội dung qua CLI không có tác dụng), các repo dưới 100 sao hoặc bỏ lâu mà bản tin gọi là "trending" ([danh sách](youtube-ai-stacks.md)).

## 4. Mẹo từ bản tin, chưa kiểm chứng

Các mẹo dưới đây đến từ bài Reddit mà máy test không mở được. Nghe hợp lý, nhưng tôi chưa có số liệu của riêng mình:
- Phim tài liệu 25 phút chỉ cần 150–200 ảnh tĩnh, tạo video AI cho 10–20% khoảnh khắc mạnh nhất. Khớp với nguyên tắc 3 ở trên.
- Vào thẳng xung đột từ giây đầu, bỏ intro logo; đo bằng tỷ lệ giữ chân 30 giây đầu, đừng nhìn số view.
- Mỗi đợt 3–4 video chỉ thay đổi một biến (kiểu hook, nhịp cắt, kiểu phụ đề) để biết cái gì có tác dụng.
- Shorts cần khoảng 80% "stayed to watch" mới được đẩy; đăng tối đa 2–3 Shorts mỗi ngày.
- Gọi model video qua API trả theo lượt (fal, Runware) thay vì gói tháng, để không mất credit khi phải tạo lại nhiều lần.
- Kịch bản dài nên có "hợp đồng" JSON khóa trước nhân vật, mốc thời gian, sự kiện bắt buộc, để các chương không mâu thuẫn nhau.
