# ThinkRail (JetBrains)

> Repo: https://github.com/JetBrains/thinkrail · Apache-2.0
>
> ⭐ **1.964 sao**, 111 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 0.2.0)

## Là gì

Giao diện (IDE shell) bọc quanh coding agent [`pi`](https://github.com/earendil-works/pi), do JetBrains làm. Mỗi phiên làm việc của agent chạy trên một **worktree git riêng** (nhánh riêng, thư mục riêng), nên nhiều agent sửa code song song mà không đụng vào checkout chính của bạn; nhánh nào tốt thì merge, còn lại xóa.
Gồm: trình soạn Monaco, cây file có dấu thay đổi git, terminal, nhiều phiên chat `pi` mỗi workspace (mỗi phiên chọn model riêng), đồ thị `SPEC.md` làm "nguồn sự thật", kết nối MCP, và thanh trên cùng theo dõi trạng thái nhánh với PR trên GitHub.
Có hai dạng: app desktop và CLI `thinkrail` (chạy engine rồi mở UI trên trình duyệt). Dùng provider của bạn qua `pi`, hoặc đăng nhập JetBrains AI. Không có tài khoản riêng.

## Đã test

| Bước | Kết quả |
|---|---|
| `install.sh` không chỉ định bản | ❌ Lỗi 403: môi trường test chặn trang `releases/latest` |
| `install.sh --version 0.2.0` | ✅ 2,7 giây. Tải một file thực thi 140 MB, thêm vào PATH |
| `thinkrail --no-open --port ...` trên một repo git | ✅ Engine lên, UI trả HTTP 200. Log báo `pi` chạy in-process |
| Cấu hình model qua `~/.pi/agent/models.json` (endpoint riêng) | ✅ Hiện trong danh sách model của UI |
| Tạo workspace rồi gửi "Tạo file calc.py có hàm add(a, b)" cho agent (dùng LLM giả lập) | ✅ Agent gọi tool `bash`, tạo file. Mọi thứ nằm trong **worktree riêng** `~/.thinkrail/worktrees/repo/workspace-1`, checkout gốc không đổi. Panel Changes hiện `calc.py +2 −0` so với `main` |
| Số tool gửi cho model | 28 tool (read, bash, edit, write, web_search, spec_*, todo_*, Agent…), system prompt khoảng 16k ký tự |
| Chạy với model thật | ⛔ Không test (không có API key) |

## Kết luận nhanh

✅ Ý tưởng mỗi agent một worktree hoạt động đúng như quảng cáo: tôi thấy thay đổi nằm gọn trong nhánh riêng, không đụng checkout chính. Giao diện đầy đủ (editor, diff, terminal, specs). Là lớp UI cho `pi`, nên gọn hơn Qwen Code về số tool.
⚠️ Lần đầu mở app, công tắc **"Share additional usage data" bật sẵn** trong hộp thoại chào mừng, phải tự tắt. Dự án mới (bản 0.2.0, chưa có bản stable ổn định lâu dài).

## Cài đặt

```bash
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash
thinkrail ~/code/my-repo        # cần git trên PATH và một provider model
```

Desktop: tải bộ cài từ trang Releases (Linux cần glibc 2.38+ và vài gói GTK).
Tắt chia sẻ dữ liệu: `thinkrail --no-analytics`, hoặc Settings → Privacy.
