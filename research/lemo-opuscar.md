# lemo-opuscar: phim ngắn làm hoàn toàn bằng code, không dùng model tạo video

> Nguồn: bài giới thiệu do người dùng cung cấp. Repo chính thức: https://github.com/lemomo-ai/lemo-opuscar
> Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

lemo-opuscar là một skill/plugin cho Claude Code, do Lemomo / LemoLab (`lemomo-ai`) làm.
Mỗi phong cách phim gồm hai phần: một file `STYLE.md` (prompt phong cách, dùng lại được) và một phim mẫu dựng hoàn toàn bằng code.
Bạn chọn phong cách, đưa câu chuyện của mình vào, và coding agent "làm đạo diễn".

- Giấy phép: code và tài liệu theo MIT. Phim mẫu và ảnh theo CC BY 4.0 (phải ghi công LemoLab). Phim bạn tự làm là của bạn.
- Tại thời điểm nghiên cứu: khoảng 3.0k sao, 338 fork, 45 commit, **51 phong cách** (gần đây có thêm nhóm 8 phong cách "Evidence Films", ngày 2026-10-16).
- Có nhiều bản fork mang mô tả cũ (39 hoặc 43 phong cách), ví dụ `jacwu`, `youwangd`, `Smith-106`. Nên cài từ repo gốc `lemomo-ai`.

## Kiểm chứng các nhận định trong bài

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| Phim 6 phút 31 giây, không giây nào dùng model tạo video | ✅ Đúng | README ghi "No video generation, no stock footage". |
| 1.426 sao, 166 fork | ⚠️ Đã cũ | Hiện tại khoảng 3.0k sao, 338 fork. Bài viết được đăng lúc repo mới lên. |
| 43 phong cách, mỗi phong cách có phim mẫu | ⚠️ Đã cũ | Hiện có 51 phong cách. Các fork cũ ghi 39 hoặc 43. |
| Trình duyệt vẽ từng khung hình | ✅ Đúng | Mỗi phim là một `index.html` có hàm `window.render(t)`. Chrome headless chụp từng frame. Dùng Canvas 2D cho 2D, three.js r170 / WebGL2 cho 3D, shader WebGL2 cho hậu kỳ. ffmpeg thêm grain và ghép tiếng (loudnorm -14 LUFS). Mặc định 1080p, 24 fps. |
| Nhạc gốc lấy từ thư viện sample miễn phí | ✅ Đúng | Agent tự soạn nhạc. Sample lấy từ VSCO 2 CE, VCSL, FreePats, Karoryfer, Salamander Grand Piano. Có thêm tổng hợp âm bằng numpy và Karplus–Strong. |
| Giọng đọc bằng TTS | ✅ Đúng | Mặc định dùng Kokoro (chạy offline trên máy, tiếng Anh). Tiếng Trung dùng edge-tts (cần mạng, gọi giọng của Microsoft). Whisper kiểm tra lại từng câu. Không thấy nói đến tiếng Việt. |
| OPUSCAR 98 kể 98 năm phim đoạt Best Picture | ✅ Đúng | Giai đoạn 1927–2025, dài 6:31. Một nhân vật "Clawd" đi qua 98 phim, mỗi phim được vẽ lại theo một phong cách riêng (77 phong cách 2D, 4 phong cách 2.5D, 17 phong cách 3D). |
| Mọi cú cắt, mọi nốt nhạc do Claude Opus 5.5 viết bằng code | ✅ Đúng theo lời tác giả | Không thể kiểm chứng độc lập. |
| Phong cách được tinh chỉnh cho Opus 5.5 | ✅ Đúng | README cảnh báo các model khác có thể không tái tạo được tốt. |
| Mã nguồn mở, cài bằng lệnh plugin | ✅ Đúng | Xem phần Cài đặt bên dưới. |

## Cài đặt

```bash
claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab
# cập nhật
claude plugin marketplace update lemolab && claude plugin update lemo-opuscar@lemolab
```

Với agent khác: chép thư mục `plugin/skills/lemo-opuscar/` vào thư mục skills của agent đó.

## Yêu cầu và chi phí

- Node 20+, ffmpeg, Python 3.11+ (hoặc uv).
- Dung lượng: phần lõi khoảng 350 MB. Phần giọng đọc khoảng 0.55 GB, cộng thêm khoảng 145 MB cho Whisper. Phần nhạc khoảng 140 MB. Mỗi thư viện sample nặng thêm 70–400 MB.
- Được phát triển trên macOS (Apple silicon). Linux "chắc sẽ chạy được", Windows thì dùng qua WSL. Các phong cách 3D hoặc dùng nhiều shader nên có GPU.
- Mỗi phim mất khoảng **30–60 phút** và tốn "khá nhiều token". Không có con số chi phí cụ thể.

## Lưu ý

- OPUSCAR 98 nhắc tới tên phim và giải Oscar. README không bàn về bản quyền hay nhãn hiệu. Tác giả chỉ nói người dùng tự chịu trách nhiệm về tư liệu mình dùng, và chỉ dùng tài nguyên CC0, CC BY hoặc OFL (liệt kê trong file CREDITS). Nếu làm phim thương mại về tác phẩm có bản quyền thì cần cẩn thận.
- Phim được vẽ bằng code nên không có cảnh quay thật. Phong cách thiên về minh họa, motion graphics và 3D đơn giản.
- Chưa xem được trang gallery (bị chặn từ môi trường nghiên cứu).

## Nguồn

- https://github.com/lemomo-ai/lemo-opuscar
- https://raw.githubusercontent.com/lemomo-ai/lemo-opuscar/main/README.md
- https://raw.githubusercontent.com/lemomo-ai/lemo-opuscar/main/TECHNIQUE.md
- https://lemomo-ai.github.io/lemo-opuscar/
