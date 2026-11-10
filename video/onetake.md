# onetake

> Repo: https://github.com/feitangyuan/onetake · **PolyForm Noncommercial 1.0.0** (chỉ dùng phi thương mại; bản Pro $79 có giấy phép thương mại)
>
> ⭐ **3.991 sao**, 279 fork (GitHub API, 2026-11-10) · Chưa chạy: 2026-11-10 (chỉ đọc mã nguồn)

## Là gì

Skill cho Claude Code làm phim giới thiệu sản phẩm 10–30 giây kiểu "một cú máy liền mạch": mỗi nhịp mọc ra từ nhịp trước (thanh prompt mở thành cửa sổ app, cửa sổ co lại thành điện thoại), không chuyển cảnh kiểu slide.
- Mỗi phim là một file HTML, mọi giá trị là hàm của thời gian t, dùng thư viện chuyển động `lib/motion.js`.
- `scripts/render.py` dùng Playwright chụp nhiều lần mỗi khung rồi trộn lại để có motion blur thật; bản nháp 1080p30, bản cuối 4K60.
- `probe.py` và `verify_promo.py` đo xem mỗi chỗ nối giữa hai nhịp có vật gì "mang" sang không, để bắt lỗi "trông như slideshow" trước khi người xem.
- Có công cụ tổng hợp hiệu ứng âm thanh và lồng tiếng.

## Đã test

| Bước | Kết quả |
|---|---|
| Đọc `scripts/render.py` | ✅ Chỉ dùng Playwright chụp màn hình và ffmpeg ghép video, không gọi mạng |
| 13 phim mẫu trong `cases/` | ⚠️ Chỉ có file MP4 thành phẩm. README ghi rõ mã nguồn (comp.html, nhạc, âm thanh) không nằm trong bản công khai |
| Render `templates/comp.html` | ⛔ Chưa chạy: môi trường chặn chạy code tải về từ repo ngoài. Template này cũng cần footage quay sẵn (`footage/frames/`) |

## Kết luận nhanh

⚠️ Ý tưởng "mỗi nhịp mọc ra từ nhịp trước" và bộ đo kiểm liền mạch rất đáng học. Nhưng **không miễn phí cho việc thương mại** (làm cho khách hàng, công ty, kênh kiếm tiền): phải mua bản Pro $79. Bản miễn phí không kèm mã nguồn phim mẫu.

## Cài đặt

```bash
git clone https://github.com/feitangyuan/onetake ~/.claude/skills/onetake
pip install playwright numpy pillow && playwright install chromium
python3 scripts/render.py comp.html --out draft.mp4          # nháp 1080p30
```
