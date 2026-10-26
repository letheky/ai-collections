# colibri

> Repo: https://github.com/JustVugg/colibri · Apache-2.0
>
> ⭐ **43.905 sao**, 4.986 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26

## Là gì

Engine chạy model Mixture-of-Experts viết bằng C. Phần dense của model nằm trong RAM, còn các expert được đọc từ ổ NVMe khi router chọn. Nhờ vậy model hàng trăm tỷ tham số chạy được trên máy thường, đổi lại tốc độ chậm.
Có 13 engine: GLM-5.2/5.3, DeepSeek V4/V4.1 Flash, Kimi K3, MiMo-V2.6, Qwen3.6/3.8, Inkling, OLMoE… Backend gồm CPU, CUDA, Vulkan (cả GPU tích hợp) và Metal. Có `coli chat`, `coli web`, `coli serve` và `coli mcp`.

Tốc độ theo bảng của tác giả, ví dụ:

| Model | Kích thước | Tốc độ |
|---|---|---|
| Qwen3.6-35B-A3B | 23 GB | 6 tok/s CPU, 30 tok/s CUDA |
| DeepSeek V4 Flash | 167 GB | 0,9–1,6 tok/s |
| GLM-5.2 | 429 GB | 0,05–0,1 tok/s trên laptop 25 GB RAM |
| Kimi K3 | 1,56 TB | khoảng 9,4 giây cho mỗi token |

## Đã test

| Bước | Kết quả |
|---|---|
| `make -j4 mimo` | ✅ Build bằng gcc trong 5,9 giây, binary 217 KB, chỉ link libm và OpenMP |
| `make mimo-tiny-check` (tạo model MiMo tí hon 4,6 MB: 6 layer, 16 expert, top-4, có cả phần ảnh) | ✅ Mọi kiểm tra so với bản tham chiếu đều đạt: greedy, teacher forcing, chạy lại cho kết quả giống hệt, logits trùng từng bit khi đổi kích thước block, và phát hiện được khi cố ý làm hỏng trọng số expert |
| Tải và chạy model thật (`./start-here.sh`) | ⛔ Model nằm trên Hugging Face, bị chặn trong môi trường test |

## Kết luận nhanh

✅ Code C gọn, build rất nhanh, có bộ kiểm tra độ đúng nghiêm túc. Hợp để thử model MoE khổng lồ trên máy không có GPU lớn.
⚠️ Model lớn thì rất chậm (dưới 2 tok/s) và tốn ổ đĩa (167 GB đến 1,56 TB), chỉ hợp để thử nghiệm hoặc chạy batch, không hợp chat thời gian thực. Với máy phổ thông nên bắt đầu bằng Qwen3.6-35B-A3B.

## Cài đặt

```bash
git clone https://github.com/JustVugg/colibri && cd colibri
./start-here.sh            # Windows: START-HERE.bat — đo máy, chọn model, tải, build và chạy
./start-here.sh --list     # xem model nào hợp với máy
c/coli status | c/coli stop | c/coli logs -n 50
```
