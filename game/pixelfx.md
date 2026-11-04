# pixelfx

> Repo: https://github.com/patch-gg/pixelfx · MIT (font Patch Pixel trong `gallery/fonts` không thuộc MIT)
>
> ⭐ **4.203 sao**, 567 fork (GitHub API, 2026-11-04) · Đã test: 2026-11-04 (bản 0.3.0)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/EM7uifwYmXvKWgSY4GK8a2 (6 hiệu ứng có sẵn + 1 hiệu ứng tôi tự viết)

## Là gì

Thư viện **244 hiệu ứng pixel art** cho game, mỗi hiệu ứng là một file JavaScript nhỏ, không dùng ảnh: lửa, nổ, băng, sét, sci-fi, chém, va chạm, đạn, phép thuật, thời tiết, UI, chuyển cảnh, sinh vật… (21 nhóm).
- Dùng thẳng trong game web (canvas, Phaser, PixiJS, Kaplay, three.js), không phụ thuộc thư viện nào. Hoặc xuất sprite sheet cho Godot, Unity, Aseprite.
- Có nhân vật mẫu 3D vẽ thành pixel để diễn đòn đánh và hiệu ứng trạng thái.
- Kèm **skill Claude Code** dạy agent tìm, dùng, xuất và tự tạo hiệu ứng mới, cùng các công cụ `new`, `render`, `check`.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` | ✅ 1,9 giây, chỉ 1 dev dependency (esbuild) |
| Đếm hiệu ứng | ✅ Bảng danh mục cộng đúng 244 |
| `node tools/check.mjs` (mọi hiệu ứng) | ✅ **244/244 đạt**, 0 lỗi, 4 cảnh báo chậm (~4,2 ms/khung). Mất 3 phút 40 giây |
| `render.mjs --gif` cho 6 hiệu ứng (campfire, big-explosion, frost-nova, lightning-strike, magic-circle-cast, sword-slash) | ✅ 42 giây. Chất lượng tốt (xem demo) |
| Tự tạo hiệu ứng mới `ui/lixi-burst` (phong bao lì xì bung đồng xu) theo quy trình của skill | ✅ Lần đầu `check` bắt 2 lỗi thật: vẽ tràn khung, và 2.240 pixel không màu (`p.rect` không nhận màu dạng hàm). Sửa xong thì đạt |
| Nhúng vào engine game thật | ⛔ Chưa test |

## Kết luận nhanh

✅ Hiệu ứng đẹp, code gọn, mọi thứ có seed nên lặp lại y hệt. Công cụ `check` bắt được lỗi mà mắt khó thấy (vẽ tràn, màu thiếu, loop có vết nối, ngẫu nhiên không seed) — rất hợp để agent tự sửa. Hợp cho game indie pixel art.
⚠️ Repo mới (tạo 30/10). Chỉ cho phong cách pixel art; muốn hiệu ứng khác phải tự viết.

## Cài đặt

```bash
npm i github:patch-gg/pixelfx          # dùng trong game web
node tools/new.mjs fire/my-effect      # tạo hiệu ứng mới (trong repo đã clone)
node tools/render.mjs fire/my-effect --gif
node tools/check.mjs fire/my-effect
```

Skill trong Claude Code:

```
/plugin marketplace add patch-gg/pixelfx
/plugin install pixelfx@pixelfx
```
