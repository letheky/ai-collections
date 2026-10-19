# Omarchy

> Repo: https://github.com/omacom/omarchy (trước đây là `basecamp/omarchy`, link cũ tự chuyển hướng) · MIT · Trang: https://omarchy.org
>
> ⭐ **45.123 sao**, 5.563 fork (GitHub API, 2026-10-19) · Đã kiểm tra: 2026-10-19

## Là gì

Bản Linux có sẵn cấu hình theo quan điểm của tác giả DHH (Rails, Basecamp), cài từ file ISO và mặc định mã hóa toàn bộ ổ đĩa.
Có sẵn lệnh khởi chạy cho nhiều coding agent và một menu riêng để chọn agent mặc định.

## Đã kiểm tra (phân tích tĩnh repo)

| Mục | Kết quả |
|---|---|
| Manual | ✅ 51 trang |
| Lệnh agent (`manual/17-ai.md`) | ✅ **14 lệnh khởi chạy**: claude, codex, opencode, agy, copilot, crush, grok, kimi, pi, omp, ori, hermes, muse, cursor-agent. Cài lần đầu qua mise |
| Script hệ thống | ✅ 535 script trong `bin/`, trong đó 23 script liên quan đến agent |
| Cài đặt hệ điều hành | ⛔ Không test được: đây là cả một hệ điều hành, cần cài từ ISO |

## Kết luận nhanh

⚠️ Hợp với dev muốn một máy Linux cấu hình sẵn để dùng coding agent hằng ngày. Cái giá là phải cài lại hệ điều hành và tắt Secure Boot.
Nên thử trên máy ảo hoặc dual boot trước.

## Lưu ý (theo manual)

- `omarchy agent prompt "…"` chạy agent ở chế độ **không hỏi lại**, nên cẩn thận với thư mục quan trọng.
- Đừng dùng lệnh tự update của agent (ví dụ `claude update`). Hãy dùng `omarchy update` hoặc `mup`.
