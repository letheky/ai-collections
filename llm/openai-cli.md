# OpenAI CLI

> Repo: https://github.com/openai/openai-cli · Apache-2.0
>
> ⭐ **1.060 sao**, 85 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23 (bản 1.40.4)

## Là gì

CLI chính thức để gọi OpenAI API từ terminal, viết bằng Go. Có lệnh cho responses, chat, images, audio, videos, files, batches, vector stores, fine-tuning, realtime, webhooks, admin. Một số công cụ chạy offline: `tokenizer`, `explore`.
README phân biệt rõ: `openai` dùng để gọi API hoặc viết script, còn Codex CLI mới là coding agent.

## Đã test

| Bước | Kết quả |
|---|---|
| `go install ./cmd/openai` (repo cần Go 1.26, máy có 1.24) | ✅ Go tự tải toolchain mới, build xong trong 2 phút 38 giây |
| `openai --version` | ✅ 1.40.4 |
| `responses create --input "Kiểm tra kết nối CLI" --model gpt-5.5` gửi tới mock server | ✅ Body gửi đi đúng `{"input":…,"model":"gpt-5.5"}`, output dễ đọc |
| `--transform output.0.content.0.text --raw-output` | ✅ Chỉ in phần text, hợp để dùng trong script |
| Nhận JSON từ stdin | ✅ Dùng được |
| Lỗi 401 | ✅ Exit code 1, có hướng dẫn cách sửa |
| `tokenizer count` không cần key | ✅ o200k_base: câu tiếng Việt 34 byte ra 9 token |
| Gọi API OpenAI thật | ⛔ Không test (không có API key) |

## Kết luận nhanh

✅ CLI chính thức, chạy gọn. `--transform` và exit code chuẩn nên dễ dùng trong shell script và CI. Hợp với ai cần gọi API mà không muốn viết code.

## Cài đặt

```bash
brew install openai/tools/openai
# hoặc
go install 'github.com/openai/openai-cli/cmd/openai@latest'
export OPENAI_API_KEY=sk-...
openai responses create --model gpt-5.5 --input "Xin chào"
```

## Lưu ý

- Đặt `OPENAI_BASE_URL` để trỏ sang endpoint khác. Tôi đã test cách này với mock server.
- Khi pipe JSON/YAML từ nguồn không tin cậy vào CLI, đặt `OPENAI_UNTRUSTED_STDIN=1` theo khuyến nghị của README.
