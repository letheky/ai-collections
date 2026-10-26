# Codex Security (OpenAI)

> Repo: https://github.com/openai/codex-security · Apache-2.0 · npm `@openai/codex-security`
>
> ⭐ **11.204 sao**, 886 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 0.6.0)

## Là gì

CLI (`cs`, tên đầy đủ `codex-security`), TypeScript SDK và GitHub Action để tìm, xác minh và vá lỗ hổng trong code. Chạy trên Codex 0.163.
Các lệnh chính:
- **Quét:** `scan` theo repo, theo path hoặc theo diff; chế độ `--mode deep` chạy nhiều worker.
- **Xác minh và sửa:** `validate`, `patch`, `verify-fix`.
- **Quản lý finding:** `classify-severity`, `dedupe`, `suggest-owners` (gợi ý người phụ trách theo CODEOWNERS và lịch sử Git).
- **Chính sách và xuất báo cáo:** `policy` (soạn SECURITY.md), `export` (SARIF, JSON, CSV).
- **Tự động hóa:** `install-hook` (kiểm tra trước commit), `bulk-scan`.

Nhà cung cấp model: OpenAI, Amazon Bedrock, OpenRouter, Fireworks AI, Cheaper Inference.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install @openai/codex-security@0.6.0` | ✅ 17 giây |
| `cs --help`, `cs info` | ✅ Model mặc định **gpt-5.6-sol**, mức suy luận **xhigh** |
| `cs scan . --dry-run` trên repo mẫu có SQL injection | ✅ Kiểm tra đầu vào xong, in cấu hình sẽ dùng |
| `cs scan .` khi chưa đăng nhập | ✅ Dừng ngay, báo rõ cách đăng nhập hoặc đặt `OPENAI_API_KEY` |
| Quét thật | ⛔ Không test (cần tài khoản OpenAI) |

## Kết luận nhanh

✅ Bộ công cụ đầy đủ cho quy trình bảo mật: quét, xác minh, vá, xuất SARIF cho CI. Cài nhanh.
⚠️ Mặc định dùng model mạnh nhất với mức suy luận xhigh, nên quét một repo lớn có thể tốn nhiều tiền. Hãy chạy thử `--dry-run`, dùng `--path` hoặc `--diff` để giới hạn phạm vi. Một số finding nhạy cảm cần được OpenAI duyệt quyền Trusted Access for Cyber.

## Cài đặt

```bash
npm install --global @openai/codex-security    # Node 22.13+ (22.x), 24 hoặc 26; Python 3.10+
cs login                                       # CI: đặt OPENAI_API_KEY
cs scan . --dry-run
cs scan . --diff origin/main                   # chỉ quét thay đổi
cs scan . --mode deep
```
