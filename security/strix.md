# Strix

> Repo: https://github.com/usestrix/strix · Apache-2.0 · PyPI `strix-agent`
>
> ⭐ **71.923 sao**, 8.039 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 1.7.0)

## Là gì

Công cụ kiểm thử xâm nhập (pentest) tự động bằng nhiều agent AI, dùng cho **ứng dụng bạn sở hữu hoặc được ủy quyền**. Thay vì chỉ cảnh báo tĩnh, nó chạy code thật trong sandbox và cố xác thực lỗ hổng bằng PoC.
- **Kiến trúc "Graph of Agents":** nhiều agent trinh sát và kiểm thử phối hợp.
- **Sandbox Docker:** mọi công cụ (proxy Caido, trình duyệt, script khai thác) chạy trong một container Kali riêng, không chạy thẳng trên máy bạn.
- Tích hợp GitHub Actions / CI để quét trên mỗi pull request.
- Hỗ trợ nhiều nhà cung cấp LLM qua litellm (OpenRouter, OpenAI…).

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install strix-agent==1.7.0` | ✅ 1 phút 32 giây |
| `strix --help`, `strix --version` | ✅ 1.7.0. Có các chế độ `quick/standard/deep`, `--max-budget`, `--max-turns`, quét theo diff |
| Chạy với LLM giả lập và provider tùy chỉnh | ✅ Qua được bước xác thực cấu hình và LLM, rồi dừng đúng ở bước kéo image sandbox |
| Kéo image sandbox `ghcr.io/usestrix/strix-sandbox:1.3.0` | ❌ Bị chặn trong môi trường test |
| Tự build sandbox từ `containers/Dockerfile` | ❌ Build lỗi: `apt-get upgrade` của Kali thất bại trong môi trường test (mirror Kali) |
| Vòng chạy pentest thật | ⛔ Không test được vì thiếu sandbox. Cũng cần API key LLM và một mục tiêu được phép kiểm thử |

## Kết luận nhanh

✅ Cài gọn bằng pip, CLI rõ ràng, cô lập toàn bộ công cụ tấn công trong sandbox Docker là thiết kế đúng. Repo rất nổi (72k sao).
⚠️ Tôi **chưa kiểm chứng được chất lượng phát hiện hay PoC** vì không dựng được sandbox ở đây. Vài điểm cần lưu ý trước khi dùng: (1) **Telemetry bật mặc định** (`STRIX_TELEMETRY=false` để tắt). (2) Chỉ quét hệ thống bạn sở hữu hoặc có văn bản cho phép — đây là công cụ tấn công thật. (3) Cần API key LLM, chế độ `deep` chạy nhiều agent nên tốn tiền; dùng `--max-budget` để giới hạn.

## Cài đặt

```bash
pip install strix-agent        # hoặc: pipx install strix-agent; Python 3.12+, cần Docker
export STRIX_LLM="openrouter/z-ai/glm-5.3"
export LLM_API_KEY="your-api-key"
export STRIX_TELEMETRY=false
strix --target ./app-directory --max-budget 5
```

Lần chạy đầu tự kéo image sandbox từ `ghcr.io`. Kết quả lưu ở `strix_runs/<tên>`.
