# Taste Skill

> Repo: https://github.com/Leonxlnx/taste-skill · MIT · Trang: https://tasteskill.dev
>
> ⭐ **98.897 sao**, 6.723 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Bộ Agent Skills giúp agent có hướng nghệ thuật khi làm website, thay vì lắp ráp ra một landing page na ná nhau.
Skill chính là `design-taste-frontend` (v2), đi kèm các script Node:

| Script | Làm gì |
|---|---|
| `draw.mjs` | Bốc ngẫu nhiên một hướng thiết kế |
| `inspect.mjs` | Chấm điểm trang trong trình duyệt thật |
| `assets.mjs` | Tìm ảnh có giấy phép mở |

## Đã test

| Bước | Kết quả |
|---|---|
| `npx skills add Leonxlnx/taste-skill` | ✅ Cài **12 skill** trong khoảng 1 giây |
| `node draw.mjs --sector finance` | ✅ Ra "direction sheet" từ seed ngẫu nhiên: hướng thiết kế, kiểu hero, font (Archivo), bảng màu (Forest and lime), thứ tự 7 section, kiểu chuyển động, bộ ảnh. Có quy tắc ưu tiên khi các phần mâu thuẫn |
| `node inspect.mjs slop.html` | ✅ Chụp trang ở **3 độ rộng** (1440 / 768 / 390), ghi `report.json`. Kết quả: **8 FAIL, 4 WARN** (độ tương phản, ít ảnh, không có tiêu điểm, lệch tâm, trang tĩnh, không có nút ở màn đầu, sai font, khoảng trống lớn ở hero…) |
| Chạy với quyền root | ⚠️ Chrome từ chối chạy nếu thiếu `--no-sandbox`; phải trỏ `CHROME_PATH` tới một script bọc |
| `node assets.mjs "rice field"` | ⛔ Không test được: mạng bị chặn tới Wikimedia, Openverse, Met, AIC |
| Build trọn một trang bằng agent | ⛔ Không test. README ước tính 30–45 phút và vài trăm nghìn token |

## Kết luận nhanh

✅ `draw` và `inspect` hoạt động tốt, không cần API key. Bộ kiểm tra khắt khe hơn Impeccable vì đòi có ảnh thật, chuyển động và tiêu điểm.
Hợp với landing page mới. Nếu chỉ cần review nhanh UI có sẵn thì dùng [Impeccable](impeccable.md).

## Cài đặt

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
# hoặc trong Claude Code:
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

Cần Node 22+ và Chrome/Chromium. Ảnh tìm được có giấy phép CC BY / BY-SA nên phải giữ phần credit.
