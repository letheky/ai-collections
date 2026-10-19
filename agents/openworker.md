# OpenWorker

> Repo: https://github.com/andrewyng/openworker · MIT · Đang beta · Trang: https://openworker.com
>
> ⭐ **18.563 sao**, 2.625 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

App "AI coworker" chạy trên máy của nhóm Andrew Ng, có bản desktop cho macOS Apple Silicon và Windows.
Engine xây trên thư viện aisuite. Server agent viết bằng FastAPI, giao diện bằng React/Tauri.
Có phân quyền theo mức rủi ro, ghi log audit, và tùy chọn chạy lệnh trong sandbox (NVIDIA OpenShell, sandbox macOS, hoặc tài khoản ẩn trên Windows).

## Đã test (chạy từ source trên Linux)

| Bước | Kết quả |
|---|---|
| `bash packaging/setup_dev_env.sh` | ✅ Tạo `.venv` trong 58 giây |
| Khởi động server agent `--port 8765` | ✅ FastAPI chạy ở `127.0.0.1:8765` |
| Bảo mật API | ✅ Gọi không kèm token thì bị **401**. Token đổi mỗi lần khởi động, lưu ở `~/.config/coworker/sidecar-8765.token`, gửi qua header `X-OpenWorker-Token` |
| `GET /v1/agents` | **5 agent**: cowork, cloud-posture, dep-audit, reviewer, security |
| `GET /v1/providers` | **23 nhà cung cấp model**: openai, anthropic, gemini, bedrock, vertex, deepseek, kimi, qwen, xai, mistral, together, fireworks, openrouter, ollama, llamacpp, vllm… |
| `GET /v1/connectors` | **40 connector**: slack, gmail, github, jira, notion, linear, stripe, salesforce, figma, hubspot… |
| `GET /v1/settings/sandbox/readiness` | Docker ✅, OpenShell chưa cài |
| Chạy một tác vụ | ⛔ Không test (không có API key cho model) |
| GUI desktop | ⛔ Không test |

## Kết luận nhanh

✅ Server dựng nhanh, bảo vệ API bằng token, lựa chọn model và connector rất rộng.
Đáng thử nếu muốn một "đồng nghiệp AI" mã nguồn mở. Vẫn đang beta và chưa có bản cài sẵn cho Linux.

## Cài đặt

Tải bản cài từ openworker.com, hoặc chạy từ source:

```bash
bash packaging/setup_dev_env.sh
.venv/bin/python -m coworker.server.run --cwd ~/project --port 8765
cd surfaces/gui && npm install && npm run dev
```
