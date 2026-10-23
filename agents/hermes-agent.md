# Hermes Agent (Nous Research)

> Repo: https://github.com/NousResearch/hermes-agent · MIT
>
> ⭐ **256.271 sao**, 55.979 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23 (commit 3ba2b07, bản 2026.9.24)

## Là gì

Agent cá nhân viết bằng Python, chạy trên terminal (CLI/TUI) hoặc qua gateway nhắn tin (Telegram, WhatsApp, Slack…). Có thêm cron, kanban, bộ nhớ, MCP và ACP.
Dùng được nhiều nhà cung cấp model: Nous Portal, OpenRouter, OpenAI, endpoint tự host… Đổi model bằng `hermes model`.
Repo có 58 skill sẵn và 152 skill tùy chọn. `hermes setup` có thể nhập cấu hình từ `~/.openclaw`, `~/.claude`, `~/.codex`, `~/.cursor`.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv sync` với Python 3.13 | ❌ Lockfile chỉ chấp nhận Python ≥ 3.14 |
| `uv sync --python 3.14` | ✅ 328 gói, 11 giây |
| `./hermes --help` | ✅ Khoảng 40 lệnh con: chat, model, gateway, cron, kanban, egress, secrets… |
| `hermes -z "<prompt>" --yolo` với mock LLM (provider `custom`) | ✅ Agent gọi tool `terminal`, chạy lệnh và ghi `proof.txt`, rồi tổng hợp kết quả. Mất 18 giây |
| Mỗi request gửi LLM | 20 tool, system prompt khoảng 12.000 ký tự cộng 37.600 ký tự schema tool. Ngoài ra có 1 request riêng để đặt tiêu đề session |
| Chạy với model thật | ⛔ Không test (không có API key) |

## Kết luận nhanh

✅ Cài nhanh bằng uv, vòng lặp agent và tool chạy đúng. Nhiều tính năng.
⚠️ Mỗi lượt tốn khoảng 12k token chỉ riêng system prompt và schema tool, nên dùng model rẻ sẽ tốn hơn bạn nghĩ. Cờ `--yolo` bỏ qua bước hỏi xác nhận lệnh, chỉ nên dùng trong sandbox.

## Cài đặt

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes model     # chọn nhà cung cấp và model
hermes setup     # wizard đầy đủ
```

Cài từ source: `uv sync --python 3.14 && .venv/bin/python hermes --help`.

## Lưu ý

- File `cli-config.yaml.example` có thật nhưng dài hơn 1.800 dòng. Muốn trỏ tới endpoint riêng, chỉ cần khai `model.provider: custom` và `model.base_url`.
