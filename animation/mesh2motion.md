# Mesh2Motion: gắn xương và hoạt hình cho model 3D ngay trong trình duyệt

> Nguồn: bài giới thiệu do người dùng cung cấp (link rút gọn `osp.fyi/mesh2motion-app`).
> Repo: https://github.com/Mesh2Motion/mesh2motion-app. Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

Mesh2Motion là web app làm cùng việc với Mixamo: nhập model 3D, gắn bộ xương mẫu, chọn animation rồi xuất ra.
Mục tiêu của tác giả là linh hoạt hơn Mixamo, hỗ trợ được cả những loại model và bộ xương khác ngoài người.
Dự án do một người làm vào buổi tối và cuối tuần (tài khoản `scottpetrovic`).

- **Giấy phép:** code theo MIT. **Tài sản đồ họa (model, rig, animation) theo CC0**, nên dùng thương mại thoải mái.
- **Mức độ phổ biến:** khoảng 3.5k sao, 357 fork, 900 commit.
- **Công nghệ:** TypeScript + Vite, chạy hoàn toàn trên web. Tài liệu có nhắc tới three.js.
- **Dùng thử:** có bản online tại app.mesh2motion.org.

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả |
|---|---|
| Nhập GLB/GLTF | ✅ Đúng, và **chỉ** nhận GLB/GLTF. Không nhận FBX, nên model từ Mixamo hay Unity phải đổi định dạng trước (ví dụ bằng Blender). |
| Đặt xương, xem trước animation | ✅ Đúng. Quy trình: chọn loại xương → kéo khớp cho vừa model → thử → chọn animation. |
| Xuất GLB/GLTF | ✅ Đúng, cũng chỉ xuất được hai định dạng này. |

## Tự chạy trên máy

```bash
npm install && npm run dev        # nên dùng Node 24
# hoặc chạy bằng Docker
docker-compose up -d              # rồi mở http://localhost:3000
```

File Blender gốc của model và animation nằm ở repo riêng: https://github.com/Mesh2Motion/mesh2motion-assets

## Hạn chế

- Chỉ hỗ trợ GLB/GLTF ở cả đầu vào và đầu ra.
- Chưa xác minh được: có những mẫu xương nào (người, động vật bốn chân, chim…), số lượng animation trong thư viện,
  cách tính trọng số skin, có hỗ trợ ngón tay, khuôn mặt hay retarget sang rig có sẵn không. Trang chủ không truy cập được từ môi trường nghiên cứu.
- Thư viện animation còn nhỏ hơn Mixamo; tác giả đang kêu gọi họa sĩ animation đóng góp.

## Hợp với ai

Dev làm game web, three.js, prototype; người cần animation CC0 cho nhân vật tự làm mà không muốn phụ thuộc Adobe/Mixamo.
