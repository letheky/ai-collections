# gpu-unlock

> Repo: https://github.com/Zagitta/gpu-unlock · GPL-2.0 (module), firmware NVIDIA theo giấy phép riêng · GitHub không nhận diện được license vì repo không có file `LICENSE` ở thư mục gốc
>
> ⭐ **6.922 sao**, 718 fork (GitHub API, 2026-10-26) · Đã đọc và chạy test: 2026-10-26 (bản 1.0.0)

## Là gì

Kernel module Linux chạy lúc khởi động, trước driver NVIDIA. Nó mở khóa tốc độ phát lệnh FP16/BF16 trên card RTX 30 (GA102/103/104/106) cho ngang bản workstation.
Driver NVIDIA không bị sửa, nên không phải vá lại mỗi khi NVIDIA ra driver mới.

Theo số liệu người dùng báo trong README:
- **GEMM BF16:** tăng 25–80% tùy card và giới hạn điện.
- **Prefill LLM:** nhanh hơn 14–36%.
- **Decode LLM và INT8:** gần như không đổi, vì bị giới hạn bởi băng thông bộ nhớ.

Card đã có báo cáo thành công: 3090 Ti, 3090, 3080, 3070, 3060 12 GB. Riêng 3080 Ti 20 GB (OEM) chạy xong unlock nhưng BF16 vẫn ở nửa tốc độ.

## Đã test

| Bước | Kết quả |
|---|---|
| `make test` | ✅ 5/5 test đóng gói đạt (2,8 giây) |
| Test unlock với phần cứng giả lập | ⛔ Cần firmware sinh từ driver NVIDIA. Môi trường test chặn download.nvidia.com và archive.cachyos.org |
| Chạy thật | ⛔ Máy test không có GPU |

## Kết luận nhanh

⚠️ Hữu ích thật nếu bạn train hoặc fine-tune trên RTX 30, ít tác dụng khi chỉ chạy chat LLM vì phần sinh token bị giới hạn bởi bộ nhớ. Nhưng đây là module nạp firmware tự sinh vào GPU ngay lúc khởi động. Hãy đọc kỹ `docs/` và `firmware/NOTICE.md`, chỉ dùng trên máy cá nhân và chấp nhận rủi ro. Tác giả ghi rõ chưa được phép phân phối lại firmware NVIDIA.

## Cài đặt

```bash
git clone https://github.com/Zagitta/gpu-unlock && cd gpu-unlock
make install          # tự nhận Arch / Debian-Ubuntu / Fedora, cần sudo
# Bắt buộc: thêm gpu_unlock.targets=all vào kernel command line (GRUB/systemd-boot), rồi khởi động lại
journalctl -k -b | grep gpu_unlock
```

Muốn tắt: xóa `gpu_unlock.targets=` khỏi kernel command line.
