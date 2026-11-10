# Âm thanh thật cho video làm bằng code: earshot, Openverse, "Real SFX"

> Nguồn: một bài giới thiệu "3 công cụ miễn phí cho video Claude Code có âm thanh thật". Số liệu GitHub API 2026-11-10.

| Công cụ | Repo | ⭐ | Giấy phép | Trạng thái |
|---|---|---|---|---|
| earshot (Leon Lin) | https://github.com/Leonxlnx/earshot | 4.387 (282 fork) | MIT | Chưa chạy |
| Openverse | https://github.com/WordPress/openverse | 575 (323 fork) | MIT (mã nguồn); từng file âm thanh theo giấy phép riêng | API bị chặn trong môi trường test |
| Real SFX by Clipwing | Không tìm thấy | — | — | ⛔ Không xác minh được |

## earshot

"Đôi tai" cho coding agent, chạy CPU, có CLI, Python API và MCP server.
- **Nghe và chấm:** `describe` (mô tả âm thanh bằng chữ), `match` (âm thanh khớp mô tả đến đâu), `find` (tìm đoạn khớp trong file dài), `critique` (chấm cả phim so với phim launch chuyên nghiệp). Phần này dùng model CLAP (mặc định `laion/larger_clap_general`) và cần PyTorch.
- **Tạo âm thanh bằng code:** từ bản 0.3 có kho 252 hiệu ứng lưu dưới dạng công thức (whoosh, click, pop, nốt nhạc…). Lệnh `earshot sfx render` tạo hiệu ứng trong vài giây, không cần model hay mạng. `earshot kit` dàn hiệu ứng cho cả phim theo mốc cắt cảnh.
- `earshot fit` chuyển một bản ghi âm thật thành công thức code để biến tấu.

| Bước | Kết quả |
|---|---|
| Đọc `pyproject.toml`, README | ✅ Phụ thuộc gồm torch, transformers, librosa, scikit-learn…; README hướng dẫn cài torch bản CPU |
| Cài và chạy `earshot sfx render` | ⛔ Chưa chạy: môi trường chặn chạy code tải về từ repo ngoài |

## Openverse

Công cụ tìm kiếm của WordPress cho ảnh và âm thanh có giấy phép mở (CC, public domain). API công khai `api.openverse.org`, gọi ẩn danh được nhưng bị giới hạn số lượt.
- ⚠️ Bài giới thiệu ghi "5.223.435 tệp âm thanh"; tôi không gọi được API (host chưa được mở trong môi trường test) nên không kiểm tra được con số.
- ⚠️ "Miễn phí" không có nghĩa là dùng thoải mái: mỗi file có giấy phép riêng (CC BY bắt ghi nguồn, CC BY-NC cấm thương mại). Phải đọc trường `license` của từng kết quả.

## Real SFX by Clipwing

Tìm trên GitHub với "clipwing" và "real sfx" không ra repo nào khớp; chỉ có một repo rỗng tên `clipwing` không liên quan. Chưa xác minh được công cụ này có tồn tại công khai hay không.

## Kết luận nhanh

✅ earshot là công cụ đáng thử nhất: kho hiệu ứng tạo bằng code không cần mạng, MIT, hợp với video làm bằng HTML/canvas/Blender.
⚠️ Openverse dùng được nhưng phải lọc theo giấy phép. "Real SFX by Clipwing" chưa tìm thấy.

## Cài đặt

```bash
git clone https://github.com/Leonxlnx/earshot && cd earshot
python -m venv .venv && .venv/bin/python -m pip install torch --index-url https://download.pytorch.org/whl/cpu
.venv/bin/python -m pip install -e .
earshot sfx list --kind whoosh
earshot sfx render whoosh_fast/crisp -o w.wav --dur 0.8 --apex 0.32

curl "https://api.openverse.org/v1/audio/?q=paper%20rustle&license=cc0"
```
