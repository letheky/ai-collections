# Cửa khẩu Bornholmer bằng papercraft (dựng thử)

Cảnh thử cho phim tài liệu về đêm Bức tường Berlin mở cửa (đoạn N21a–N21b, khoảng 23:30 ngày 9/11/1989). Dựng bằng skill [papercraft](../../animation/papercraft.md) trên máy không có GPU, ngày 2026-11-25.

![Toàn cảnh](overview.jpg)

## Trong cảnh có gì

| Thành phần | Cách dựng |
|---|---|
| Cầu Bösebrücke | Mặt cầu là `platform`; hai giàn vòm thép là card in đinh tán, khoét 18 lỗ để thành ô giàn |
| Đường ray dưới cầu | In xuống nền: dải đá dăm, 4 đường ray, tà vẹt |
| Đường Bornholmer | In xuống nền, uốn từ trạm kiểm soát lên cầu (đường dẫn mắt chính), vạch kẻ, vạch dừng |
| Trạm kiểm soát | 3 chòi gác `boxFold` có cửa sổ phát sáng; barie sọc đỏ trắng **đang nâng**; 3 cột đèn pha; biển báo; hàng rào chắn |
| Người | 46 người, mỗi người một card in màu áo, khăn, mũ riêng; vài người giơ tay. 3 lính gác; viên sĩ quan (nhân vật chính) là mô hình giấy 3D nhiều card |
| Xung quanh | 4 xe Trabant xếp hàng, đoạn tường bê tông dọc đường ray, cột điện đường sắt, dãy nhà phía xa có cửa sổ sáng, cây mùa đông, bụi cây, cột mốc, thùng rác, ghế |
| Ánh sáng | Mood `night`: trăng xanh nhạt, vùng sáng vàng ấm dưới đèn pha, đèn đường, cửa sổ chòi gác |
| Sự sống | Hơi thở bốc lên trên đám đông, vài chiếc lá khô rơi |

## Đo được

- Dựng cảnh 2,4–3,6 giây (197 mảnh, 418 lớp in); kiểm tra báo nhân vật chính không có card nào cắt vào nhau.
- Video 6 giây 1280×720, 24 fps: 144 khung trong khoảng 4,5 phút (~1,9 giây/khung, WebGL chạy bằng CPU qua SwiftShader).
- Khoảng 330 dòng `scene.js` viết riêng cho cảnh này. Chỉ dùng phần "ống nước" của skill (giấy, bản lề, ánh sáng, ống kính); không dùng mảnh mẫu nào của làng quê.

## Chạy lại

```bash
npx skills add xikhar/papercraft                    # hoặc clone github.com/xikhar/papercraft
A=<thư mục skills/papercraft/assets>
mkdir -p $A/berlin && cp scene.js index.html $A/berlin/
cp $A/templates/popup-3d/harness.js $A/berlin/
python -m http.server -d $A 8000                     # mở http://localhost:8000/berlin/
python <skill>/scripts/capture.py $A overview "bornholmer:video=6,24" --page berlin/index.html --size 720p
```

Máy không có GPU thì thêm `'--use-angle=swiftshader', '--enable-unsafe-swiftshader'` vào dòng `args = [...]` trong `capture.py`. Máy chặn CDN jsdelivr thì tải `three@0.187.0` qua npm và sửa importmap trong `index.html`.

## Còn thiếu

- Video bắt đầu khi phần lớn cảnh đã dựng xong (camera tiến vào, cây bật lên), chưa có đoạn cả trạm gập lên từ mặt phẳng rõ ràng.
- Chưa có tiếng giấy và chưa ghép lời dẫn.
- Cảnh là dựng lại theo tinh thần sự kiện, không phải bản sao kiến trúc chính xác (số chòi, vị trí đèn, hình giàn cầu đều giản lược).
