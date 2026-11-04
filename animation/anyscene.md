# AnyScene

> Repo: https://github.com/apekshik/anyscene · MIT
>
> ⭐ **285 sao**, 33 fork (GitHub API, 2026-11-04) · Đã test: 2026-11-04
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/FqweHvq9w5ibrDY3w8SFLR (camera rig quay 2 shot trên cảnh tạm)

## Là gì

Quy trình để **Claude Code dựng cảnh Blender chân thực** từ ảnh tham khảo hoặc một đoạn mô tả: căn phòng có đủ đồ vật, đèn, vết bẩn, khói, chuyển động camera và màu điện ảnh. Agent làm theo `SKILL.md`, không tự tay dựng model nào:
1. Mỗi đồ vật được sinh thành ảnh, rồi chuyển sang 3D bằng hai model trên **fal** (Tripo H3.1 và Meshy 7.1); agent so hai bản dưới cùng ánh sáng rồi chọn bản tốt hơn.
2. Bố cục, đèn, vết bẩn, camera đều là script Python chạy trong Blender.
3. Mỗi bước có một "cổng" (ảnh tổng hợp) để agent và người cùng kiểm tra.

Repo có 4 cảnh mẫu (quán ramen Tokyo, tiệm sửa đồ điện tử, quán dai pai dong Hồng Kông, phòng điều khiển 1970). Tiệm bánh Paris được dựng tự động trên endpoint của fal từ **một ảnh tham khảo**, dưới 2 giờ.

## Đã test

| Bước | Kết quả |
|---|---|
| Tạo prop qua fal | ⛔ Cần `FAL_KEY` (trả phí); fal.ai bị chặn ở máy test |
| Blender | ⚠️ blender.org bị chặn; dùng `bpy` 5.2.3 từ PyPI (Blender chạy dạng module Python) |
| Cảnh mẫu trong repo | ⚠️ Chỉ có script và danh sách prop, **không kèm model 3D** (các file .blend/GLB không nằm trong repo) |
| `camera/shoot.py --preview --engine cycles` trên quầy ramen tôi dựng bằng khối cơ bản | ❌ Render xong khung hình nhưng ghép MP4 lỗi: code gọi cứng encoder `h264_mf`, chỉ có trên Windows |
| Bản sao đổi encoder sang `libx264` | ✅ 2 shot × 48 khung (480×270), mỗi shot ~96 giây Cycles CPU |
| Shot `push_in` | ✅ Tiêu cự 35→50 mm, kéo nét từ cốc nước (1,93 m) sang bát (0,61 m) đúng thời điểm, có rung tay |
| Shot `orbit` | ✅ Quay vòng quanh bát, nét bám theo bát |

## Kết luận nhanh

⚠️ Quy trình nghiêm túc, có cổng kiểm tra từng bước, camera rig làm đúng như mô tả. Nhưng **không rẻ và không nhanh**: theo README, mỗi prop khoảng **1,65 USD** (cảnh 90 prop ≈ **150 USD**), cần gần **1 ngày** chạy agent, GPU 12–16 GB và 1–2 giờ render. Code được viết trên Windows với GPU NVIDIA: máy khác phải tự sửa encoder. Repo mới (tạo 30/10).

## Cài đặt

```bash
git clone https://github.com/apekshik/anyscene && cd anyscene
npm install
export FAL_KEY=...            # trả phí theo lượt dùng
# cần Blender 5.0+, ffmpeg, Claude Code, GPU 12–16 GB
# mở repo trong Claude Code và yêu cầu dựng cảnh từ ảnh hoặc mô tả
```

Không phải Windows: sửa `"h264_mf"` trong `camera/shoot.py` thành `"libx264"`.
