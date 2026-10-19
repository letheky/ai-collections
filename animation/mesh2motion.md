# Mesh2Motion

> Repo: https://github.com/Mesh2Motion/mesh2motion-app · Code MIT, asset CC0 · Bản online: app.mesh2motion.org
>
> ⭐ **3.528 sao**, 357 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Web app (TypeScript, Vite, three.js) làm cùng việc với Mixamo: nhập model 3D, gắn xương, chọn animation rồi xuất ra.
Nhập và xuất đều chỉ dùng GLB/GLTF.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` + `npm run build` | ✅ 253 gói trong 8 giây, build mất 1,6 giây, thư mục `dist` nặng 78 MB |
| `vite preview` mở trong Chromium headless | ✅ Trang "Explore - Mesh2Motion" tải xong, **không có lỗi console**. Model người mẫu chạy animation "Angry" |
| Các tab trong giao diện | Explore, **Use Your Model**, **Use Your Rigged Model** (dùng được cả rig có sẵn) |
| Các loài có sẵn | Human, Fox, Bird, Dragon, Kaiju, Spider, Snake, Fish, Horse |
| Đếm clip trong các file GLB | ✅ **251 clip** trong 11 file. Người: base 87, addon 75, mocap 16. Ngựa 14, cáo 14, kaiju 10, nhện 10… Giao diện thư viện người hiển thị 178 animation |
| Giấy phép asset | ✅ Giao diện ghi rõ CC0 (Quaternius) |

## Kết luận nhanh

✅ Build và chạy được ngay, thư viện animation CC0 khá lớn cho người và động vật.
Phải đổi FBX sang GLB trước khi dùng (ví dụ bằng Blender).

## Cài đặt

```bash
git clone https://github.com/Mesh2Motion/mesh2motion-app && cd mesh2motion-app
npm install && npm run dev        # hoặc: docker-compose up -d  rồi mở http://localhost:3000
```

File Blender gốc của asset: https://github.com/Mesh2Motion/mesh2motion-assets
