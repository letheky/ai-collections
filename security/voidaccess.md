# VoidAccess

> Repo: https://github.com/KatrielMoses/voidaccess · MIT · PyPI `voidaccess`
>
> ⭐ **925 sao**, 131 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 2.1.0)

## Là gì

Công cụ OSINT về dark web cho người làm threat intelligence. Từ một truy vấn, nó tìm song song trên hơn 12 công cụ tìm kiếm Tor, các trang paste, GitHub/GitLab, feed bảo mật và danh sách `.onion` chọn sẵn. Sau đó dùng LLM để lọc nhiễu và trích IOC (chỉ dấu xâm nhập), dựng đồ thị thực thể, rồi xuất ra STIX 2.1, MISP, Sigma, YARA, Snort, Suricata, CSV, JSON hoặc Markdown.
Có CLI, TUI và bản tự host bằng Docker Compose (PostgreSQL, Tor, API, web UI). Tác giả cũng bán bản hosted tại voidaccess.pro.

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install voidaccess==2.1.0` | ✅ 15 giây |
| `voidaccess investigate "LockBit ransomware" --no-llm --no-tor --depth shallow` | ✅ Chạy xong trong 30 giây, sinh báo cáo. Trong 27 nguồn: 10 chạy được nhưng không ra kết quả nào, 11 lỗi do mạng test chặn, 4 bỏ qua (Tor), 2 thiếu API key |
| Chất lượng thực thể khi không dùng LLM | ❌ Gắn mã độc "aurora" với **độ tin cậy 93**, lấy từ một blog Microsoft không liên quan tới LockBit |
| `export --format stix` và `--format sigma` | ⚠️ Xuất đúng định dạng (bundle STIX 2.1, rule Sigma). Nhưng rule sinh ra là `CommandLine contains: aurora`, mô tả "observed in dark web intelligence", từ chính kết quả sai ở trên |
| Tìm qua Tor, lọc bằng LLM | ⛔ Không test (không có Tor, không có key) |

## Kết luận nhanh

⚠️ Pipeline và các định dạng xuất hữu ích cho nhóm SOC. Nhưng ở chế độ không LLM, thực thể sai vẫn được gắn độ tin cậy cao và biến thành rule phát hiện. **Đừng đưa rule hoặc IOC tự sinh vào hệ thống thật khi chưa có người kiểm tra.**
Chỉ dùng cho nghiên cứu phòng thủ, tuân thủ pháp luật nơi bạn làm việc. Truy cập dark web có rủi ro: nên chạy trong máy ảo riêng.

## Cài đặt

```bash
pip install voidaccess                    # Python 3.10+
voidaccess configure                      # LLM, API key làm giàu dữ liệu, Tor
voidaccess investigate "LockBit ransomware"
voidaccess export <ID> --format stix
```

Bản đầy đủ chạy bằng Docker Compose, xem `docs/self-hosting.md`.
