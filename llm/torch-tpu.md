# TorchTPU (torch_tpu)

> Repo: https://github.com/google-pytorch/torch_tpu · Apache-2.0 (file LICENSE kèm thông báo theo từng file; GitHub API ghi `NOASSERTION`) · PyPI `torch-tpu`
>
> ⭐ **588 sao**, 33 fork (GitHub API, 2026-10-22) · Đã test: 2026-10-22 (bản 0.2.0, phát hành 2026-10-19)

## Là gì

Backend PyTorch chạy trên Google TPU, hỗ trợ Python 3.11+.
Có plugin cho SGLang là [sgl-project/sglang-torchtpu](https://github.com/sgl-project/sglang-torchtpu) (55 sao).

## Đã test

| Bước | Kết quả |
|---|---|
| `uv pip install torch_tpu` | ✅ Cài trong 15 giây. Kéo theo torch 2.14.1 (1,2 GB), libtpu 0.0.51 (586 MB) và torch_tpu (330 MB) |
| `import torch_tpu` | ✅ Tìm thấy plugin PJRT của libtpu. Có cảnh báo nên nạp sẵn tcmalloc để tăng hiệu năng |
| `torch.ones(2, 2, device="tpu")` | ⛔ Lỗi: thiết bị `tpu` không được đăng ký khi máy không có TPU |

## Kết luận nhanh

⛔ Cài được nhưng chỉ dùng được trên máy có TPU (Google Cloud TPU VM). Cần khoảng 2 GB dung lượng cho các gói.

## Cài đặt (theo README)

```bash
pip install torch_tpu==0.2.0 --extra-index-url https://download.pytorch.org/whl/cpu
```
