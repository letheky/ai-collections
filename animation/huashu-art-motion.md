# huashu-art-motion

> Repo: https://github.com/alchaincyf/huashu-art-motion · MIT (có ngoại lệ, xem bên dưới)
>
> ⭐ **4.378 sao**, 475 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/1Xq7MWxqVgm4hX9owAUKCo (ảnh/video kết quả chạy thật kèm số đo)

## Là gì

Agent skill của 花叔 Huashu, viết bằng tiếng Trung và có README tiếng Anh.
Skill vẽ các cảnh nghệ thuật bằng Canvas và render qua một CLI Python (Playwright + ffmpeg).

- **Phong cách:** 35–36 phong cách, từ tranh hang động đến pixel art.
- **Kiểu video giải thích có sẵn:** Kurzgesagt, Vox, whiteboard, storytime, kinetic type, 3Blue1Brown, keynote UI, biểu đồ tài chính.
- **Nhân vật:** được tạo bằng model sinh ảnh rồi ghép vào cảnh. Phần này không phải code thuần.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv run --with playwright==1.56.0 python scripts/engine/render.py --solo 09_postimp --stills 0.3` | ✅ Ra PNG một cảnh phong cách hậu ấn tượng sau **17 giây** (tính cả thời gian tải gói playwright) |
| `render.py --spec scripts/engine/examples/t3_finance_chart.json` | ✅ MP4 **1920×1080, 210 khung hình / 7 giây**, render mất **9,3 giây** chỉ bằng CPU |
| Phiên bản Playwright | ⚠️ Phải ghim playwright cho khớp với Chromium có sẵn trên máy. Nếu không thì Playwright sẽ đòi tải trình duyệt mới |

## Kết luận nhanh

✅ Render nhanh. Mẫu "biểu đồ tài chính" dùng được ngay cho video giải thích tài chính.
Phần nhân vật cần model sinh ảnh bên ngoài.

## Cài đặt

```bash
npx skills add alchaincyf/huashu-art-motion
# render thủ công
uv run --with playwright python scripts/engine/render.py --spec scripts/engine/examples/t3_finance_chart.json --out out.mp4
```

Cần uv, ffmpeg và Chromium cho Playwright.

## Giấy phép

- Code và tài liệu theo MIT.
- Nét chữ Hán theo giấy phép Arphic, font theo SIL OFL.
- Nhân vật của tác giả và demo nhân vật Clawd **không** thuộc MIT, không dùng thương mại.
