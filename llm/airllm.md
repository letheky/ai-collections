# AirLLM

> Repo: https://github.com/lyogavin/airllm · Apache-2.0 · Tác giả: Gavin Li · Phiên bản 4.0.0
>
> ⭐ **39.413 sao**, 4.016 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Thư viện Python chạy suy luận LLM lớn trên GPU ít VRAM.

- **Cách làm:** tách model thành từng layer (lưu thành file safetensors riêng) rồi **chỉ nạp một layer vào bộ nhớ mỗi lần**.
  VRAM cần dùng tính theo kích thước một layer, không theo kích thước cả model.
- **Đánh đổi:** mỗi lần chạy phải đọc lại toàn bộ trọng số từ ổ đĩa, nên tốc độ phụ thuộc chủ yếu vào tốc độ SSD và **chậm hơn nhiều** so với nạp cả model.
- **Model hỗ trợ:** README liệt kê Llama, Qwen, DeepSeek, Mistral/Mixtral, Phi, Gemma, ChatGLM, Baichuan, InternLM, Kimi.
  Bảng VRAM trong README, ví dụ "70B khoảng 4 GB", là số do tác giả công bố.

## Đã test (CPU, không có GPU)

| Bước | Kết quả |
|---|---|
| `uv pip install -e air_llm` | ✅ Kéo theo torch 2.14.1 (bản build CUDA), import `airllm` được |
| Bộ test (`pytest tests`) | ⚠️ **44 đạt, 1 lỗi, 1 file không chạy được.** `test_compression.py` lỗi import vì `compress_layer_state_dict` có trong `utils.py` nhưng không được export ra `airllm`; đây là lỗi của repo. `test_automodel` lỗi vì cần tải config từ Hugging Face (bị chặn) |
| **Kiểm tra cơ chế nạp từng layer:** tạo một Llama nhỏ ngẫu nhiên (6 layer, hidden 128) lưu tại máy, chạy `AutoModel.from_pretrained(..., device="cpu")` | ✅ Tách thành từng file layer (18 file) trong **1,66 giây**. Logit đầu ra **khớp tuyệt đối với model đầy đủ (sai lệch lớn nhất = 0.0)** |
| Chạy model 70B / 405B thật trên GPU 4–8 GB | ⛔ Không test được (không có GPU; không tải được trọng số từ Hugging Face) |

## Kết luận nhanh

✅ Cơ chế đúng như mô tả: chạy từng layer cho kết quả giống hệt chạy cả model, không lượng tử hóa.
⚠️ Nhanh hay chậm phụ thuộc vào SSD và băng thông PCIe. Hợp để thử prompt hoặc chạy tác vụ offline không gấp, **không hợp cho chat thời gian thực**.
Cần dung lượng ổ đĩa lớn: phải chứa trọng số gốc cộng với bản đã tách layer.

## Cài đặt

```bash
pip install airllm
```

```python
from airllm import AutoModel
model = AutoModel.from_pretrained("<hf-repo-id hoặc đường dẫn local>")   # mặc định device="cuda:0"; có thể đặt device="cpu"
```

Model có cổng truy cập (gated) trên Hugging Face cần token. Có hỗ trợ macOS qua MLX.
