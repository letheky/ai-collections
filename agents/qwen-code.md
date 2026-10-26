# Qwen Code

> Repo: https://github.com/QwenLM/qwen-code · Apache-2.0 · npm `@qwen-code/qwen-code`
>
> ⭐ **28.715 sao**, 3.262 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 0.26.1)

## Là gì

Coding agent của đội Qwen (Alibaba), giao diện và tính năng gần giống Claude Code: SubAgents, Agent Teams, Auto-Memory, Auto-Skills, hooks, MCP, Plan mode, sandbox, computer use.
Có thêm vài tính năng riêng:
- **Đa giao thức:** OpenAI, Anthropic, Gemini, Qwen, cùng mọi endpoint tương thích (Ollama, vLLM).
- **Agent Arena:** nhiều model cùng giải một bài để so sánh.
- **Daemon:** `qwen serve` cho nhiều client dùng chung.
- **Kênh chat:** Telegram, DingTalk, WeChat, Feishu.

Chạy trên terminal, IDE (VS Code, JetBrains, Zed), desktop app và web.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install @qwen-code/qwen-code@0.26.1` | ✅ 6,8 giây |
| `qwen "<prompt>" --auth-type openai --openai-base-url <mock> --yolo` | ✅ Agent gọi `run_shell_command`, tạo `proof.txt` rồi trả lời. Mất 4,5 giây |
| Request đầu tiên gửi model | 10 tool, system prompt khoảng 36.000 ký tự cộng 20.000 ký tự schema tool |
| Sau khi trả lời | ⚠️ Gửi thêm 1 request "Auto-Memory" để trích xuất ghi nhớ, tức tốn thêm token mỗi lượt |
| Thống kê sử dụng | ⚠️ `usageStatisticsEnabled` **bật mặc định** (Settings → Privacy) |
| Chạy `--yolo` không có sandbox | ⚠️ CLI tự cảnh báo: mọi lệnh shell chạy với quyền của tiến trình |
| Chạy với model thật | ⛔ Không test (không có API key) |

## Kết luận nhanh

✅ Cài nhanh, chạy với endpoint tự chọn rất dễ, hợp nếu bạn muốn trải nghiệm kiểu Claude Code mà dùng model rẻ hoặc chạy trên máy.
⚠️ Prompt lớn (khoảng 14k token mỗi lượt) cộng request Auto-Memory, nên dùng model nhỏ chạy local sẽ chậm. Điểm SWE-bench Verified 76,4–77,8% là đo với model **Qwen 3.7 Max**, không phải điểm riêng của CLI.

## Cài đặt

```bash
npm install -g @qwen-code/qwen-code@latest     # Node.js 22+
# hoặc: brew install qwen-code
cd your-project && qwen                        # gõ /auth để chọn nhà cung cấp
qwen "giải thích repo này"                     # chạy một lần
```

Tắt thống kê sử dụng trong Settings → Privacy, mục `usageStatisticsEnabled`.
