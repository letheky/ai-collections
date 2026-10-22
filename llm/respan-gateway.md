# respan-gateway

> Repo: https://github.com/respanai/respan-gateway · Apache-2.0 / MIT
>
> ⭐ **126 sao**, 12 fork (GitHub API, 2026-10-22) · Đã test: 2026-10-22 (bản 0.2.0)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/4Ys9gHL13EWEpccbwj5cuH (request/response thật: failover, chuyển đổi API, độ trễ)

## Là gì

Gateway LLM viết bằng Rust, gói trong một binary. Một endpoint dùng chung cho nhiều nhà cung cấp:
OpenAI, Anthropic, Gemini, Groq, DeepSeek, OpenRouter, xAI, Mistral, Ollama…

- **Route theo tên model:** fallback, hedge (gọi song song khi chậm), chọn rẻ nhất hoặc nhanh nhất.
- **Chuyển đổi định dạng API:** client dùng SDK OpenAI gọi được Claude, và ngược lại.
- **Khác:** có plugin, có tool MCP, tự tải lại cấu hình.

## Đã test

Dùng hai nhà cung cấp giả lập kiểu OpenAI: primary luôn trả lỗi 500, backup trả lời bình thường.

| Bước | Kết quả |
|---|---|
| `cargo build --release` | ✅ 5 phút 27 giây, binary 25 MB |
| `respan-gateway check` | ✅ Cấu hình hợp lệ. Hai provider cùng vendor thì phải khai báo `formats` |
| Route `smart` = primary → backup | ✅ Primary nhận 1 request và lỗi; **backup trả lời thay** |
| Client gửi kiểu Anthropic `/v1/messages` tới upstream chỉ hiểu OpenAI | ✅ Gateway **chuyển đổi cả request lẫn response** (`content[].text`, `stop_reason: end_turn`) |
| `/ui/api/routes/explain?model=smart` | ✅ Hiện tỉ lệ lỗi và độ trễ của từng provider (primary `error_rate` = 1.0) |
| Độ trễ thêm vào (300 request tuần tự) | ✅ p50 tăng từ 0,41 lên 1,00 ms (**+0,6 ms**); p95 là 1,37 ms |
| RAM khi chạy | ✅ 16,6 MB |
| Web UI | ⚠️ Không có trong bản `cargo build` mặc định; phải build `apps/ui` bằng pnpm |

## Kết luận nhanh

✅ Nhẹ, nhanh, failover và chuyển đổi API chạy đúng.
⚠️ Repo mới 126 sao. Mặc định không có xác thực (`client_keys`), nên chỉ mở trên localhost.

## Cài đặt

```bash
cargo build --release
cp gateway.example.toml gateway.toml     # khai báo providers, routes
./target/release/respan-gateway check --config gateway.toml
./target/release/respan-gateway --config gateway.toml
```
