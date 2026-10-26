# Janus (Vibra-Ingenn)

> Repo: https://github.com/Vibra-Ingenn/Janus · MIT
>
> ⭐ **136 sao**, 5 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 0.2.0)

## Là gì

Server chạy model `.gguf` trên máy, viết bằng Go, gọi llama.cpp qua purego (không cần cgo). API tương thích OpenAI.
- **Backend:** Vulkan (AMD, Intel, NVIDIA), CPU, hoặc chuyển tiếp lên OpenRouter.
- **Đổi model nóng:** qua `POST /models/load`, không cần khởi động lại.
- **Model có suy luận:** tự tách phần `<think>…</think>` sang trường `reasoning_content`.

Windows là nền tảng chính. Linux có script build riêng, macOS chưa được tác giả test.

## Đã test

| Bước | Kết quả |
|---|---|
| `./build.sh` (Linux) | ✅ 30 giây: tải llama.cpp b11146 từ GitHub Releases rồi build. Kết quả là `janus` 7,2 MB **cộng khoảng 65 MB thư viện `.so`** của llama.cpp, không phải một file duy nhất |
| Model | ⛔ Không tải được model thật (Hugging Face bị chặn). Tôi tự tạo 2 model llama tí hon, trọng số ngẫu nhiên, 466 KB, bằng thư viện `gguf` |
| Chạy với `INFERENCE_BACKEND=cpu` | ✅ Sẵn sàng sau khoảng 1 giây, nghe ở `127.0.0.1:8990` |
| `/v1/models`, `/models/list`, `/v1/chat/completions` (thường và stream SSE) | ✅ Định dạng chuẩn OpenAI, có `usage`. Nội dung trả về vô nghĩa vì model ngẫu nhiên |
| `POST /models/load {"model_path": …}` | ✅ Đổi model trong 19 ms, `/v1/models` cập nhật ngay. Lưu ý trường tên là `model_path`, không phải `path` |
| Tách `<think>` (gọi thẳng hàm trong code) | ✅ Tách đúng, kể cả khi thẻ bị cắt giữa các chunk stream (`"<thi"` + `"nk>…"`) |
| `go test ./...` | ✅ 2 package có test, đều đạt |
| Trên Linux | ⚠️ Log báo không mở được trình duyệt vì gọi lệnh `cmd` của Windows. Không ảnh hưởng server |
| Tốc độ với model thật, Vulkan | ⛔ Không test (không có GPU và không có model) |

## Kết luận nhanh

✅ Gọn, API đúng chuẩn, đổi model nóng thật. Hợp nếu bạn muốn server GGUF nhẹ không cần Python hay Ollama, nhất là trên Windows có GPU AMD hoặc Intel.
⚠️ Repo rất nhỏ (136 sao, 1 tác giả, mới 1 tháng). Không có xác thực API, nên đừng mở cổng ra ngoài `127.0.0.1`. Llama.cpp ghim bản b11146 vì code phụ thuộc layout struct; đổi bản có thể làm hỏng.

## Cài đặt

```bash
git clone https://github.com/Vibra-Ingenn/Janus && cd Janus
./build.sh                       # Linux: tải llama.cpp b11146 + build; Windows: .\build.ps1
cp .env.example dist/.env        # sửa JANUS_MODEL_PATH; không có Vulkan thì INFERENCE_BACKEND=cpu
cd dist && ./janus
curl http://127.0.0.1:8990/v1/models
```

Yêu cầu: Go 1.25+ (với `GOTOOLCHAIN=auto`, Go cũ sẽ tự tải bản mới).
