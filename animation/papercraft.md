# papercraft (pop-up giấy 3D)

> Repo: https://github.com/xikhar/papercraft · **MIT**
>
> ⭐ **486 sao**, 49 fork (GitHub API, 2026-11-24; repo tạo ngày 21/11) · Đã chạy: 2026-11-24 (commit `5eea4eb`)

## Là gì

Agent skill (Claude Code, Codex, Cursor, Gemini CLI...) để làm web, game, cảnh tương tác và video theo phong cách **sách pop-up bằng giấy bìa**:
- Các mảnh giấy in hoa văn có mép cắt mảnh, gập lên từ mặt nền qua bản lề.
- Bóng đổ mềm nhuộm theo màu cảnh, ống kính tilt-shift nhìn xuống như chụp mô hình.
- Chuyển động bản lề êm và tiếng giấy tạo bằng code.

Cấu trúc repo:
- `SKILL.md` + 17 file hướng dẫn, khoảng 5.900 dòng: chất liệu, kiểu cấu trúc giấy, bảng màu, chuyển động, âm thanh, khung hình cho Reel/Shorts...
- 5 thư viện JS, khoảng 3.000 dòng: three.js 3D, Canvas 2D, chuyển động, âm thanh, thời tiết và sinh vật.
- `capture.py` chụp ảnh và xuất MP4 theo khổ chuẩn (`--size reel`, `4k`...), đồng thời báo thời gian build và lỗi trang.
- Có bộ đo chất lượng hình (`measure.py`) và bảng so sánh mù A/B.

## Đã test

Template `popup-3d`: một làng quê mùa thu với 425 mảnh và nhân vật đi lại được.

| Bước | Kết quả |
|---|---|
| Cài | ✅ Chỉ là thư mục skill, không có bước build. Cần Python + Playwright để chụp |
| Mở template lần đầu | ❌ Trang không lên: three.js tải từ CDN jsdelivr, máy test chặn CDN này. Tải `three@0.187.0` qua npm và sửa importmap sang bản local thì chạy |
| Máy không GPU | ❌ WebGL không khởi tạo được. Thêm cờ Chrome `--use-angle=swiftshader --enable-unsafe-swiftshader` (WebGL chạy bằng CPU) thì chạy |
| Ảnh tĩnh 1600×900 (toàn cảnh + đang dựng lên) | ✅ Build 6,1 giây (425 mảnh, 1.005 lớp in). Hình rất đẹp: mép cắt, nhà gập, cây giấy, nước in, tilt-shift. Kiểm tra nhân vật báo không có mảnh nào cắt vào nhau |
| Video 4 giây 720p 24 fps, cảnh gập dựng lên từ mặt phẳng | ✅ 96 khung trong 507 giây, **khoảng 5 giây/khung** trên CPU (máy có GPU sẽ nhanh hơn nhiều) |
| Tiếng giấy trong video | ⚠️ `capture.py` không tự ghép âm thanh. Thư viện có `renderOffline()` tạo tiếng giấy theo sự kiện, nhưng agent phải tự ghi sự kiện, xuất WAV rồi ghép vào video |

| Dựng cảnh riêng: cửa khẩu Bornholmer đêm 9/11/1989 ([ví dụ](../examples/bornholmer-papercraft/)) | ✅ Khoảng 330 dòng `scene.js` tự viết: cầu giàn thép khoét lỗ, chòi gác phát sáng, barie, 46 người, lính gác, sĩ quan 3D. Dựng 2,4–3,6 giây; video 6 giây 720p trong ~4,5 phút (~1,9 giây/khung) |

## Kết luận nhanh

✅ Skill có chất lượng hình cao nhất trong các skill "phong cách" đã thử. Tài liệu rất kỹ, có số liệu cụ thể cho từng chi tiết (độ dày mép cắt, màu bóng, tiêu cự). Cùng một cảnh xuất được 16:9, 9:16, vuông, 4K.

So với cách tôi đang dựng phim Berlin bằng Blender (45–62 giây/khung 1080p trên CPU), cách này nhanh hơn khoảng 10 lần mỗi khung (ở 720p). Hình cũng đã có sẵn mép cắt, bóng màu, tilt-shift mà tôi phải tự chỉnh từng thứ trong Blender.

⚠️ Bài giới thiệu nói hơi quá:
- **"Gây sốt":** repo mới 3 ngày, khoảng 490 sao.
- **"Một dòng lệnh là dùng ngay":** đúng với bước cài skill. Nhưng mỗi thế giới mới (nhà, cây, nhân vật) là agent tự viết code; phần có sẵn chỉ là "ống nước" (giấy, bản lề, ánh sáng, ống kính) và một làng quê mẫu.
- **Tiếng giấy:** không tự có trong video xuất ra.

## Cài đặt

```bash
npx skills add xikhar/papercraft          # hoặc chép skills/papercraft/ vào thư mục skill
pip install playwright && playwright install chromium   # cho capture.py
python -m http.server -d skills/papercraft/assets 8000  # mở /templates/popup-3d/
python skills/papercraft/scripts/capture.py skills/papercraft/assets overview \
  --page templates/popup-3d/index.html --size reel
```

## Lưu ý

- Cần mạng tới `cdn.jsdelivr.net` để tải three.js, hoặc tự để three.js trong project.
- Không có GPU: thêm cờ SwiftShader vào `capture.py` (dòng `args = [...]`). Chạy được nhưng chậm.
- Gallery 5 thế giới trong repo lấy từ một game đã phát hành và kèm prompt gốc. README nói rõ đây là chuẩn chất lượng để tham khảo, không phải nội dung để chép.
