# Omarchy: bản Linux "agentic" của DHH

> Nguồn: ảnh chụp do người dùng cung cấp ("basecamp / omarchy").
> Repo: https://github.com/omacom/omarchy (trước đây là `basecamp/omarchy`; link cũ tự chuyển hướng). Trang chủ: https://omarchy.org. Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `omacom/omarchy`: **45.123 sao**, 5.563 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Omarchy là một bản phân phối Linux **có sẵn cấu hình theo quan điểm của tác giả**, do DHH (người tạo Ruby on Rails, Basecamp) làm.
Tác giả mô tả nó là "beautiful, fun & agentic". Giấy phép **MIT**.
Cài từ file ISO riêng, mặc định **mã hóa toàn bộ ổ đĩa**. Có thể cài chiếm cả ổ hoặc vào phần trống để dual boot.

## "Agentic" nghĩa là gì ở đây

Theo chương AI trong manual:

- **Có sẵn lệnh khởi chạy cho nhiều coding agent:** `claude`, `codex`, `opencode`, `agy` (Antigravity), `copilot`, `crush`, `grok`, `kimi`, `pi`, `cursor-agent`, `hermes`, `ori` (OpenRouter)…
  Không có agent mặc định. Lần chạy đầu sẽ tự cài CLI qua **mise** và tự kiểm tra cập nhật.
- **Đặt agent mặc định:** `omarchy default agent <tên>`, sau đó mở agent bằng `Super + Shift + Ctrl + A`.
- **Chọn Claude** thì Omarchy còn tự cài tiện ích trình duyệt Claude cho Chromium, Chrome, Brave, Edge.
- **`omarchy agent prompt "…"`** chạy agent ở **chế độ không hỏi lại**. Manual nhắc là agent sẽ thật sự làm mọi thứ, nên cẩn thận.
- **Lưu ý khi cập nhật:** đừng dùng lệnh tự update của agent (ví dụ `claude update`), vì sẽ tạo ra một bản cài thứ hai mà mise không quản lý.
  Hãy dùng `omarchy update` hoặc `mup`.

## Khác

- Có manual đầy đủ: phím tắt, theme, Neovim, dotfiles, máy ảo Windows, gaming, bảo mật, snapshot hệ thống, cài tự động (unattended).
- **Yêu cầu khi cài:**
  - Phải **tắt Secure Boot / TPM**.
  - Phải dùng bàn phím có dây hoặc 2.4 GHz để nhập mật khẩu mã hóa lúc khởi động, vì bàn phím Bluetooth chưa hoạt động ở bước đó.

## Nhận xét

- **Hợp với:** dev muốn một máy Linux đẹp, cấu hình sẵn theo phím tắt, để chạy Claude Code / Codex hằng ngày.
- **Cái giá:** rất "opinionated" (theo quan điểm của tác giả), và phải cài lại cả hệ điều hành.
  Muốn thử thì dùng máy ảo hoặc dual boot trước. Chế độ agent không hỏi lại có rủi ro nếu chạy ở thư mục quan trọng.
