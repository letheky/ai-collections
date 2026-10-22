# DeepInfer

> Repo: https://github.com/deepseek-ai/DeepInfer · Apache-2.0
>
> ⭐ **18.227 sao**, 1.879 fork (GitHub API, 2026-10-22) · Repo tạo 2026-10-16 · Đã kiểm tra: 2026-10-22 · **Chưa chạy được**

## Là gì (theo README)

Khung suy luận DeepSeek dùng cho dịch vụ production của họ. Bản mã nguồn mở này chỉ làm **suy luận offline**.

- **Model hỗ trợ:** duy nhất **DeepSeek-V4.1-Flash**. Checkpoint mặc định là `deepseek-ai/DeepSeek-V4.1-Flash-1017` trên Hugging Face.
- **Phần cứng:** chỉ **GPU NVIDIA SM100** (thế hệ Blackwell) hoặc **NPU Huawei Ascend 950**.
- **Môi trường:** Python 3.12, GCC ≥ 13, CUDA 13 (NVIDIA) hoặc CANN 9.2 (Ascend).
- **Tính năng:**
  - Kernel FlashMLA, DeepGEMM, DeepEP, TileKernels, DeepSelect.
  - Song song Attention DP / CP, MoE EP + EPLB.
  - Draft token (DSpark), scheduler bất đồng bộ.
  - Batch-invariant và sampling tất định (chỉ NVIDIA).
  - Structured output (regex, JSON schema, EBNF).
- **Chưa có trong bản này:** hệ thống KV cache, tách prefill/decode, cân bằng tải giữa các replica.
  Tức là **chưa thể dựng một dịch vụ online hoàn chỉnh** chỉ bằng repo này.

## Đã kiểm tra

| Bước | Kết quả |
|---|---|
| Clone repo, đọc cấu trúc | ✅ 8 MB. Có `build.sh`, `csrc/`, `deepinfer/`, `examples/`, `tests/` |
| Ví dụ suy luận | File đúng là `examples/offline_inference.py`. **Không có** `examples/run_inference.py` |
| Build và chạy | ⛔ Không thể: không có GPU SM100 hay Ascend 950 |

## Kết luận nhanh

⛔ Chỉ dành cho ai có GPU Blackwell hoặc Ascend 950 và muốn chạy DeepSeek-V4.1-Flash offline.
Không dùng được trên máy cá nhân hay GPU đời cũ.
