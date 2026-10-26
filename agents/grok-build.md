# Grok Build (grok CLI)

> Repo: https://github.com/xai-org/grok-build · Apache-2.0 · do SpaceXAI phát hành
>
> ⭐ **27.545 sao**, 5.198 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 1.0.45, build từ source)

## Là gì

Coding agent viết bằng Rust: giao diện terminal (TUI) có hỗ trợ chuột, chạy headless cho CI/script, hoặc nhúng vào editor qua Agent Client Protocol (ACP). Lệnh là `grok` (binary `xai-grok-pager`).
Có lập chỉ mục mã nguồn, thực thi lệnh shell có kiểm soát quyền, subagent, MCP, skill, plugin, hook, plan mode, sandbox. Kết nối được endpoint OpenAI-compatible tùy chọn qua `~/.grok/config.toml`.

## Đã test

| Bước | Kết quả |
|---|---|
| `install.sh` chính thức | ⛔ Tải từ `x.ai/cli`, không kiểm được trong môi trường test |
| Build từ source bằng cargo | ⚠️ Cần `protoc` (apt), và lúc build tải sẵn `ripgrep`/`fd` từ GitHub (bị chặn ở đây). Có biến môi trường để trỏ sang bản có sẵn: `PROTOC`, `GROK_{SHELL,TOOLS}_BUNDLE_{RG,FD}_PATH`. Đặt xong thì build xong, ra binary Rust 237 MB |
| `grok --version` | ✅ 1.0.45 |
| Headless `grok -p "..." -m <model> --output-format json` với LLM giả lập | ✅ JSON ra có `text`, `usage`, `num_turns`, `modelUsage` — dễ parse trong script |
| Endpoint tùy chọn qua `[model.<name>]` trong config.toml | ✅ Nhận đúng base_url và api_key |
| Gọi tool shell `run_terminal_command` **không** `--yolo` | ✅ Bị chặn chờ phê duyệt (headless tự từ chối), model nhận thông báo bị từ chối. Đây là hành vi an toàn đúng |
| Thêm `--yolo` | ✅ Thực thi lệnh thật: tạo `hello.py`, chạy nó (in "xin chao", exit 0), file nằm đúng trong thư mục dự án |
| Chạy với model Grok thật | ⛔ Không test (không có API key xAI) |

## Kết luận nhanh

✅ Binary Rust gọn, headless ra JSON sạch cho CI, kết nối endpoint tùy chọn dễ, và mặc định **chặn thực thi tool cho tới khi được phê duyệt** — an toàn hơn chạy `--yolo` ngay. Hợp nếu bạn muốn một coding agent nhanh trên terminal hoặc nhúng vào editor qua ACP.
⚠️ Build từ source hơi phiền vì tải sẵn công cụ lúc build (nên dùng bộ cài chính thức). Telemetry nội bộ của SpaceXAI điều khiển qua `GROK_TELEMETRY_ENABLED`; kiểm tra `~/.grok/config.toml` trước khi dùng trong môi trường nhạy cảm. Chỉ dùng `--yolo` trong sandbox.

## Cài đặt

```bash
curl -fsSL https://x.ai/cli/install.sh | bash     # macOS / Linux
grok --version
cd /path/to/project && grok                        # mở TUI
grok -p "sửa lỗi trong module X" -m grok-4.6 --output-format json   # headless
```

Endpoint riêng: thêm `[model.<name>]` với `base_url`, `api_key`, `context_window` vào `~/.grok/config.toml`.
