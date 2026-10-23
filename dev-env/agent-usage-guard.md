# agent-usage-guard

> Repo: https://github.com/rbartoli/agent-usage-guard · MIT
>
> ⭐ **45 sao**, 2 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23 (bản 1.1.1, Claude Code 2.1.309)

## Là gì

Mod (plugin có hook) cho Claude Code, chặn trước những thứ làm tốn hạn mức sử dụng:
- **Quá nhiều agent cùng lúc:** mặc định tối đa 4 agent chạy đồng thời và 12 lượt khởi động trong 10 phút, tính chung mọi session trên máy. Không cho agent con sinh thêm tầng.
- **Ngữ cảnh quá lớn:** từ 300k token thì nhắc Claude giữ lượt ngắn, từ 500k token thì hỏi bạn trước khi gửi prompt.
- **Vòng lặp lỗi:** lần thứ 4 gọi lại đúng một lệnh vừa lỗi sẽ bị chặn.
- **Gần chạm giới hạn:** từ 80% hạn mức thì hỏi trước khi mở agent mới, từ 95% thì từ chối và bảo các session kết thúc gọn.

Khi có người ở máy, mod hỏi qua hộp thoại của Claude Code. Khi chạy không người (`claude -p`), mod từ chối và giải thích lý do cho Claude. Không gửi request mạng nào.

## Đã test

| Bước | Kết quả |
|---|---|
| `claude plugin validate . --strict` | ✅ Validation passed |
| `claude plugin test` | ✅ **101/101 test đạt** trong 5 file, 11,4 giây |
| Các trường hợp test bao phủ | Chặn vòng lặp lỗi, ngân sách tool khi ngữ cảnh lớn, đếm agent, ghi nhật ký, biến môi trường cấu hình |
| Chạy trong session thật có đăng nhập | ⛔ Không test (cần tài khoản Claude Code đăng nhập) |

## Kết luận nhanh

✅ Code gọn, test kỹ, ngưỡng nào cũng chỉnh được bằng biến môi trường. Hữu ích nếu bạn hay chạy nhiều subagent hoặc bị hết hạn mức giữa chừng.
⚠️ Repo nhỏ (45 sao, 1 tác giả). Mod chỉ thấy agent trên máy hiện tại, không đếm được teammate chạy ở terminal khác.

## Cài đặt

Chạy trong Claude Code v2.1.287 trở lên:

```
/plugin marketplace add rbartoli/agent-usage-guard
/plugin install agent-usage-guard@agent-usage-guard
/reload-plugins
/agent-guard            # xem trạng thái
/agent-guard report 30  # mod đã làm gì trong 30 ngày
```

Tắt tạm thời bằng `AGENT_GUARD=0`.
