# Agent Reach

> Repo: https://github.com/Panniantong/Agent-Reach · MIT · Python 3.10+
>
> ⭐ **99.108 sao**, 8.730 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Bộ cài và chẩn đoán giúp agent đọc và tìm kiếm trên web cùng nhiều nền tảng: YouTube, RSS, GitHub, X, Reddit, Facebook, Instagram, LinkedIn, Bilibili, Xiaohongshu, V2EX, Xueqiu…
Mỗi nền tảng có một backend chính và các backend dự phòng. Nhiều nền tảng cần cookie hoặc phiên đăng nhập trình duyệt của bạn.

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install` từ repo | ✅ Agent Reach v1.5.0 |
| `agent-reach install --env=auto --dry-run` | ✅ **Không thay đổi gì trên máy.** Chỉ liệt kê những gì sẽ làm: cài mcporter và cấu hình Exa search |
| `agent-reach doctor` | ✅ Kiểm tra **16 kênh**. Trong môi trường test có **2 kênh dùng được**: RSS và "đọc mọi trang web" |
| Kênh "đọc mọi trang web" | ⚠️ Chạy qua **Jina Reader** (`r.jina.ai`), tức là trang bạn đọc đi qua máy chủ bên thứ ba |
| Các kênh khác | YouTube cần cài thêm yt-dlp. V2EX bị proxy của môi trường test chặn. 10 kênh còn lại cần đăng nhập hoặc cookie |
| Gợi ý của công cụ | ⚠️ Tự gợi ý mua proxy trả phí cho IP máy chủ |

## Kết luận nhanh

⚠️ Bộ cài an toàn (mặc định chỉ kiểm tra, có `--dry-run`), nhưng phần lớn giá trị nằm ở các kênh dùng cookie đăng nhập.
Các kênh này có thể khiến tài khoản bị khóa và dễ vi phạm điều khoản của nền tảng. README cũng khuyên **chỉ dùng tài khoản phụ**.

## Cài đặt

```bash
pip install agent-reach      # hoặc cài từ repo
agent-reach install --env=auto --dry-run
agent-reach doctor
agent-reach uninstall        # xóa ~/.agent-reach, kèm cookie và token
```
