# whatsapp-mcp (finereli)

> Repo: https://github.com/finereli/whatsapp-mcp · MIT
>
> ⭐ **314 sao**, 26 fork (GitHub API, 2026-10-21) · Repo tạo 2026-10-18 · Đã test: 2026-10-21

## Là gì

MCP server **chỉ đọc** cho phép agent tìm và đọc tin nhắn WhatsApp cá nhân của chính bạn.

- **Nơi chạy:** Cloudflare Workers. Tin nhắn lưu trong SQLite bên trong một Durable Object thuộc tài khoản Cloudflare của bạn.
- **Cách kết nối:** server đóng vai một **thiết bị liên kết** (linked device), dùng giao thức WhatsApp Web qua thư viện **Baileys** (`@whiskeysockets/baileys` 7.0.0-rc14).
- **Cách đồng bộ:** không giữ kết nối thường trực. Server chỉ kết nối khi agent hỏi, và một lần mỗi ngày, để lấy phần tin mới.

**8 tool:** `list_chats`, `get_messages`, `search_messages`, `unnamed_chats`, `set_contact_names`, `link_status`, `sync_now`, `relink`.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` | ✅ 197 gói trong 15 giây |
| `npm run typecheck` | ✅ Không lỗi |
| `npm test` | ✅ **25 test đạt**. Test chạy code lưu trữ thật trên SQLite có sẵn của Node, gồm cả migration. Phần tìm kiếm FTS5 không được test, vì SQLite của Node không có FTS5 |
| Deploy, ghép điện thoại, đọc tin thật | ⛔ Không test (cần tài khoản Cloudflare và điện thoại có WhatsApp) |

## Kết luận nhanh

⚠️ Code gọn và có test, nhưng repo mới vài ngày và README ghi chỉ mới chạy trên **một tài khoản thật**.

## Lưu ý (theo README)

- **Không chính thức.** Dùng giao thức WhatsApp Web qua Baileys, **trái với điều khoản của WhatsApp**. Rủi ro bị khóa tài khoản thấp nhưng không bằng 0. README khuyên chỉ dùng để đọc.
- **Gói trả phí.** Lần nhập lịch sử lớn đầu tiên cần nâng giới hạn CPU, nên phải dùng **Workers Paid** (vài USD/tháng).
- **Tên liên hệ.** Server **không tự kết nối Google Contacts**. Chat chưa có tên sẽ hiện số điện thoại; agent phải tự tra danh bạ bằng công cụ danh bạ riêng rồi gọi `set_contact_names`.
- **Media.** Ảnh và voice không được tải về, chỉ hiện nhãn như `[image]`.
- **Một người dùng.** Mỗi lần deploy chỉ dành cho một tài khoản WhatsApp.

## Cài đặt

```bash
git clone https://github.com/finereli/whatsapp-mcp && cd whatsapp-mcp
npm install
# tạo D1/KV theo README, đặt PIN 12+ ký tự, rồi:
npx wrangler deploy        # mở /setup để quét mã QR bằng điện thoại
```
