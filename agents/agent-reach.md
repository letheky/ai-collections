# Agent Reach: cho AI agent "khả năng lên mạng" bằng một lệnh

> Nguồn: ảnh chụp do người dùng cung cấp ("Panniantong / Agent-Reach").
> Repo: https://github.com/Panniantong/Agent-Reach (README chính bằng tiếng Trung, có bản tiếng Anh).
> Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

Agent Reach là bộ cài (Python 3.10+, giấy phép **MIT**) giúp agent đọc và tìm kiếm trên nhiều nền tảng.
Nó **tự chọn, cài và kiểm tra sức khỏe** cách kết nối đang ổn định nhất cho từng nền tảng.

Mỗi nền tảng có một danh sách backend theo thứ tự: chính, rồi dự phòng.
Khi một cách bị chặn thì tự chuyển sang cách khác. Ví dụ: tháng 6/2026 Bilibili chặn yt-dlp, dự án chuyển sang bili-cli.

## Nền tảng hỗ trợ

| Dùng được ngay | Cần cấu hình thêm |
|---|---|
| Web bất kỳ, YouTube (phụ đề + tìm kiếm), RSS, V2EX, đọc repo GitHub công khai, đọc một tweet | Tìm kiếm toàn web (MCP miễn phí), GitHub (repo private, mở issue/PR), Twitter/X (tìm kiếm, timeline), Bilibili, Reddit, Facebook, Instagram, Xiaohongshu, LinkedIn, Boss Zhipin, Xueqiu (chứng khoán), podcast Xiaoyuzhou (chuyển giọng nói thành chữ bằng Whisper) |

Phần lớn nền tảng "cần cấu hình" dùng **cookie hoặc phiên đăng nhập trình duyệt của bạn**,
qua OpenCLI (dùng lại phiên Chrome) hoặc cookie xuất bằng Cookie-Editor.

## Cài đặt

Cách được khuyên: bảo agent "cài Agent Reach theo https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md".
Sau đó dùng các lệnh:

```bash
agent-reach install --env=auto            # mặc định chỉ kiểm tra, không sửa hệ thống
agent-reach install --env=auto --dry-run  # chỉ xem trước sẽ làm gì
agent-reach install --env=auto --system   # chỉ khi bạn đồng ý cho cài gói hệ thống
agent-reach doctor                        # kiểm tra cấu hình
agent-reach uninstall                     # xóa sạch ~/.agent-reach (kèm cookie/token)
```

## ⚠️ Rủi ro

- **Có thể bị khóa tài khoản.** README tự cảnh báo: gọi API bằng cookie (Twitter, Xiaohongshu…) có thể bị nền tảng phát hiện và khóa.
  **Chỉ dùng tài khoản phụ**, không dùng tài khoản chính.
- **Cookie tương đương toàn quyền đăng nhập.** Cookie được lưu ở `~/.agent-reach/config.yaml` với quyền file 600,
  nhưng agent nào chạy trên máy cũng có thể đọc được nếu có quyền shell.
- **Vi phạm điều khoản dịch vụ:** việc scrape Facebook, Instagram, LinkedIn, Reddit bằng phiên đăng nhập thường vi phạm ToS của các nền tảng đó.
  Hãy cân nhắc mục đích sử dụng và luật dữ liệu cá nhân.
- **Cách cài:** cài bằng cách bảo agent "đọc file install.md rồi làm theo" nghĩa là tin nội dung một URL bên ngoài.
  Hãy đọc file đó trước, hoặc chạy `--dry-run`.
- **Quảng cáo:** README có nhiều sponsor là dịch vụ scraping, proxy, cloud.

## Hợp với ai

Người cần agent nghiên cứu nhanh trên mạng xã hội, đặc biệt là hệ sinh thái Trung Quốc (Bilibili, Xiaohongshu, Xueqiu, V2EX),
và chấp nhận rủi ro tài khoản.
Nếu chỉ cần web công khai và YouTube, phần "dùng được ngay" đã đủ mà không cần cookie.
