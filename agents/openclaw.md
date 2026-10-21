# OpenClaw

> Repo: https://github.com/openclaw/openclaw · MIT · Trang: https://openclaw.ai
>
> ⭐ **392.713 sao**, 82.546 fork (GitHub API, 2026-10-21) · Đã test: 2026-10-21 (bản 2026.10.5)

## Là gì

Trợ lý AI tự host. Một **Gateway** (WebSocket) nối các kênh chat với agent; có Control UI, cron/automation, quản lý quyền chạy lệnh, audit, backup.
Dùng được model cloud hoặc model chạy local.
Có thể gắn Claude Code vào một phiên gateway qua MCP (`openclaw attach`).

## Đã test

| Bước | Kết quả |
|---|---|
| Phiên bản Node | ⚠️ Cần **Node ≥ 24.16**. Với Node 22, `npm install` dừng ngay |
| `npm i openclaw@latest` (với Node 24.22) | ✅ 344 gói trong 25 giây, ra bản **2026.10.5** |
| `openclaw --help` | ✅ Khoảng 60 lệnh: `agent`, `agents`, `channels`, `cron`, `browser`, `approvals`, `exec-policy`, `audit`, `backup`, `attach`, `doctor`… |
| `openclaw doctor` | ✅ Báo đúng việc còn thiếu (`gateway.mode` chưa đặt) và gợi ý lệnh sửa |
| `config set gateway.mode local` rồi `gateway run` | ✅ Sẵn sàng sau khoảng **17,6 giây**. Chỉ lắng nghe trên **127.0.0.1:18789**; Control UI trả HTTP 200 |
| Xác thực | ✅ Nếu chưa có token, gateway tự tạo token tạm cho lần chạy đó |
| Chạy một lượt agent, kết nối kênh chat | ⛔ Không test (không có API key cho model) |
| Plugin `openclaw/knowledge` | Có thật, nhưng mới có **2 sao** (tạo 2026-09-22). Chưa test |

## Kết luận nhanh

✅ Cài nhanh. Gateway mặc định an toàn: chỉ nghe trên localhost và có token. `doctor` hữu ích khi cấu hình.
Cần Node 24 trở lên. Repo nặng 976 MB nếu clone source.

## Cài đặt

```bash
npm install -g openclaw@latest --allow-scripts=openclaw     # cần Node 24+
openclaw onboard --install-daemon
openclaw doctor
```
