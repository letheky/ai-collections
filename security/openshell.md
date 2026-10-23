# OpenShell (NVIDIA)

> Repo: https://github.com/NVIDIA/OpenShell · Apache-2.0
>
> ⭐ **17.842 sao**, 1.837 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23 (bản v0.1.5)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/5nu9fdeUN787NRYPz8rDGF (output thật: sandbox, chặn mạng, log, prover)

## Là gì

Runtime chạy agent AI trong sandbox, viết bằng Rust:
- **Gateway** (`openshell-gateway`) quản lý sandbox. Chạy trên Docker, Podman, Kubernetes hoặc VM.
- **Supervisor** trong mỗi sandbox áp giới hạn file (Landlock), syscall (seccomp) và mạng (proxy + OPA). Mỗi kết nối được ghi log theo chuẩn OCSF.
- **Policy** viết bằng YAML. Rule mạng đổi được khi sandbox đang chạy, có thể lọc theo binary, host, port và method HTTP.
- **openshell-prover** kiểm tra xem policy mới có mở thêm quyền so với một policy ranh giới hay không.
- Kèm 4 skill cho agent: `openshell-cli`, `generate-sandbox-policy`, `debug-inference`, `debug-openshell-cluster`.

## Đã test

| Bước | Kết quả |
|---|---|
| `install.sh` không chỉ định bản | ❌ Lỗi 403: môi trường test chặn trang `releases/latest` |
| `OPENSHELL_VERSION=v0.1.5 sh install.sh` | ✅ Cài gói `.deb` 79,6 MB gồm `openshell`, `openshell-gateway`, `openshell-prover` |
| Gateway tự chạy bằng systemd user | ⚠️ Máy test không có systemd user nên phải chạy `openshell-gateway` bằng tay |
| Kéo image supervisor từ `ghcr.io` | ❌ Bị chặn. Tôi build lại `openshell-supervisor` từ source v0.1.5 (cargo, khoảng 10 phút) |
| `openshell sandbox create --name demo -- <lệnh>` | ✅ Khoảng **1 giây**. Lệnh chạy dưới user uid 1000 trên Ubuntu 24.04 |
| Ghi `/etc`, đọc `/root` | ✅ Đều bị chặn (Permission denied). Ghi `/tmp` và `/sandbox` được |
| Mạng với policy mặc định | ✅ Chặn hết. Log ghi `DENIED /usr/bin/curl.real -> api.github.com:443` kèm lý do |
| `policy update` thêm rule read-only cho api.github.com | ✅ Có hiệu lực sau 10 giây, không cần restart. Log chuyển sang `ALLOWED [policy:github_api]`, còn `example.com` vẫn bị chặn |
| GET được, POST bị chặn (lọc tầng L7) | ⛔ Không kiểm được: container trong môi trường test không ra được internet |
| `openshell-prover check` | ✅ Policy giống ranh giới → `within_boundary` (2 ms). Mở thêm POST → `exceeds_boundary` kèm phản ví dụ `method=POST` (38 ms). Thêm host `pastebin.com` → `exceeds_boundary` (35 ms) |
| Prover khi đổi quyền file | ⚠️ Trả `unsupported` vì không xác định được workdir của image |
| `npx skills add NVIDIA/OpenShell --list` | ✅ Liệt kê đủ 4 skill |

## Kết luận nhanh

✅ Cô lập file, chặn mạng mặc định, ghi log từng kết nối và đổi policy khi đang chạy đều hoạt động đúng như mô tả. Prover cho phản ví dụ cụ thể, hợp để duyệt quyền trước khi cấp cho agent.
⚠️ Dự án còn ở bản 0.1.x, phụ thuộc image trên `ghcr.io` và `nvcr.io`. Ở mạng công ty bị chặn hai registry này sẽ phải tự build.

## Cài đặt

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh
openshell sandbox create --name demo
openshell policy update demo --rule-name github_api --binary /usr/bin/curl \
  --add-endpoint api.github.com:443:read-only:rest:enforce --wait
openshell logs demo --since 5m --source sandbox
npx skills add NVIDIA/OpenShell        # tùy chọn: 4 skill cho agent
```

Yêu cầu: Linux, macOS Apple Silicon hoặc Windows WSL 2 (thử nghiệm), cùng Docker, Podman hoặc ảo hóa.

## Lưu ý

- Installer cần quyền root/sudo và cài service gateway cho user.
- Telemetry ẩn danh **bật mặc định**. Tắt bằng `OPENSHELL_TELEMETRY_ENABLED=false` trên gateway.
- Image sandbox mặc định là `nvcr.io/nvidia/base/ubuntu:24.04`, không cài sẵn agent nào.
