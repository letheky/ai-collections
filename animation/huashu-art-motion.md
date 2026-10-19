# huashu-art-motion: agent skill vẽ phong cách nghệ thuật thành hoạt hình

> Nguồn: bài giới thiệu do người dùng cung cấp. Repo: https://github.com/alchaincyf/huashu-art-motion
> Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `alchaincyf/huashu-art-motion`: **4.378 sao**, 475 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Đây là một **agent skill**, không phải thư viện JS hay web app. Tác giả là 花叔 Huashu (tài khoản `alchaincyf`).
Khẩu hiệu dịch ra là: "để coding agent viết các phong cách nghệ thuật thành tranh chuyển động".

- **Giấy phép:** code theo MIT, có ngoại lệ:
  - Nét chữ Hán dùng giấy phép Arphic, font dùng SIL OFL.
  - Nhân vật hoạt hình của tác giả chỉ dùng để demo.
  - Demo nhân vật Clawd (linh vật của Anthropic) là fan-made, không thuộc MIT.
- **Mức độ phổ biến:** 4.378 sao, 475 fork, 22 commit.
- **Ngôn ngữ:** README chính bằng tiếng Trung, có thêm `README.en.md` tiếng Anh.
- **Cài đặt:** `npx skills add alchaincyf/huashu-art-motion`

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| "Biến hình ảnh tĩnh thành hoạt hình" | ❌ Sai | Skill không nhận một bức ảnh rồi làm nó chuyển động. Cảnh được **vẽ bằng code** (Canvas). Có script phân tích một animation mẫu để học theo. |
| "Code thuần" | ⚠️ Một phần | Nền và cảnh vẽ bằng code. Nhưng nhân vật được tạo bằng model sinh ảnh, sau đó ghép vào bằng code. |
| 35 kỷ nguyên / "ba mươi năm phong cách" | ⚠️ Dịch sai | Có 35 (nay là 36) phong cách, trải từ tranh hang động (~40.000 TCN) đến 2026. Không phải "30 năm". |
| "Chín nguyên tắc ngữ pháp" | ⚠️ Dịch sai | Thực ra là **9 kiểu ngữ pháp video giải thích**: Kurzgesagt, Vox, whiteboard, storytime, kinetic type, 3Blue1Brown, keynote UI, biểu đồ tài chính, và người dẫn giải thích tài chính. 8 kiểu có demo chạy được; kiểu thứ 9 cần bạn tự có tài sản nhân vật. |
| Bắt chước kỹ thuật vẽ, từ ấn tượng đến pixel retro | ✅ Đúng | Có Monet, Van Gogh, Klimt, Bauhaus, 8-bit… |
| "Chạy trong trình duyệt, chỉ cần viết JavaScript" | ⚠️ Không hẳn | Cảnh viết bằng JS/Canvas, nhưng render bằng **CLI Python**: uv điều khiển Chromium headless (Playwright), rồi ffmpeg xuất MP4. Skill được thiết kế để agent điều khiển. |
| Không cần render farm | ✅ Đúng | Render ngay trên máy. |

## Đầu ra và cách render

- Định dạng: MP4 ngang, dọc hoặc nền trong suốt; ảnh PNG; một phim dạng "cuộn tranh dài".
- Lệnh render mẫu:
  ```bash
  uv run --with playwright python scripts/engine/render.py --solo 09_postimp --stills 0.3 --out preview
  ```

## Lưu ý

- Cách làm giống [anidoodle](anidoodle.md) và [lemo-opuscar](../video/lemo-opuscar.md): vẽ bằng code, chụp từng khung hình bằng trình duyệt headless, ghép bằng ffmpeg.
- Nhân vật cần có model sinh ảnh bên ngoài.
- Chỉ dùng phần MIT nếu làm thương mại. Không dùng nhân vật của tác giả hay Clawd.
