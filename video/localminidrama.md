# LocalMiniDrama (本地短剧助手)

> Repo: https://github.com/xuanyustudio/LocalMiniDrama · MIT · Phiên bản 1.2.9
>
> ⭐ **2.169 sao**, 515 fork (GitHub API, 2026-10-22) · Repo tạo 2026-02-10 · Đã test: 2026-10-22
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/MFF19DzKxWSiRovS9D6Qfq (ảnh giao diện, luồng tạo kịch bản chạy thật)

## Là gì

App làm phim ngắn (short drama / phim hoạt hình ngắn) bằng AI, chạy trên máy. Dữ liệu lưu trong SQLite và file cục bộ.

- **Quy trình:** tóm tắt → kịch bản nhiều tập → nhân vật, bối cảnh, đạo cụ → phân cảnh (cỡ cảnh, chuyển động máy, thoại) → ảnh và video từng cảnh → ghép thành tập phim.
- **Hai chế độ xem:** danh sách và canvas (kéo thả node). Có trợ lý chat trong app.
- **Công nghệ:** backend Node.js + Express + SQLite (better-sqlite3, sharp), frontend Vue 3 + Element Plus + vue-flow; bản desktop đóng gói bằng Electron.
- **Nhà cung cấp AI (tự mang API key):** DashScope (Tongyi), Volcengine (Doubao / Seedance 2.0), Kling, Gemini (Imagen / Veo), Vidu, NanoBanana, Ollama và mọi API tương thích OpenAI.
- README ghi bản cài sẵn (`.exe`) chỉ có cho **Windows**; trên máy khác phải chạy từ source.
- Giao diện và tài liệu chủ yếu bằng tiếng Trung, có `docs/en.md` tiếng Anh.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install` theo cấu hình của repo | ❌ **Treo hơn 10 phút**: `.npmrc` và `package-lock.json` ép dùng `registry.npmmirror.com` (bị chặn trong môi trường test), và `.npmrc` đặt **`strict-ssl=false`** |
| `npm install --registry https://registry.npmjs.org` (bỏ lockfile mirror) | ✅ Backend 350 gói / 41 giây, frontend 100 gói / 33 giây |
| `npm run migrate` + `npm start` | ✅ Server sẵn sàng ở cổng 5679, API trả HTTP 200 |
| Frontend `vite` | ✅ Lên ở cổng 3013 trong 0,7 giây |
| Bước tạo kịch bản, dùng model giả lập kiểu OpenAI | ✅ `ai-configs/test` báo kết nối thành công; `generation/story` → task `completed`, **2 tập** được tách và lưu |
| Định dạng gọi model | Backend gọi `/chat/completions` ở chế độ **streaming (SSE)**; model trả JSON thường thì task báo "AI trả về rỗng" |
| Giao diện danh sách / chi tiết / canvas | ✅ Không lỗi JavaScript. ⚠️ Canvas hiển thị node chồng lên nhau ở lần mở đầu |
| Tạo ảnh, video, ghép phim | ⛔ Không test (cần API key của DashScope, Volcengine, Kling…) |
| Dự án ví dụ `example_drama/*.zip` | ⛔ Chỉ là con trỏ **Git LFS** (file thật 82 MB), bản clone thường không có |

## Lưu ý bảo mật

- **Mở ra mạng LAN:** `configs/config.yaml` mặc định `host: 0.0.0.0`, tức máy khác cùng mạng truy cập được.
  Khi tôi chạy thử, API **không yêu cầu đăng nhập**. Nên đổi thành `127.0.0.1`.
- **Lộ API key:** API `/ai-configs` trả lại nguyên văn `api_key` trong response.
- **Tắt kiểm tra chứng chỉ:** `insecure_tls: true` khi gọi nhà cung cấp, và `.npmrc` đặt `strict-ssl=false` khi cài gói.

## Kết luận nhanh

⚠️ Quy trình làm phim đầy đủ, chạy được trên Linux từ source và luồng tạo kịch bản hoạt động đúng.
Nhưng mặc định cài từ mirror Trung Quốc với SSL tắt và server mở ra LAN.
Nên chỉnh cấu hình trước khi dùng, và cần API key trả phí để tạo ảnh và video.

## Cài đặt (từ source, ngoài Trung Quốc)

```bash
git clone https://github.com/xuanyustudio/LocalMiniDrama.git && cd LocalMiniDrama
cd backend-node && npm install --registry https://registry.npmjs.org
# sửa configs/config.yaml: server.host = 127.0.0.1
npm run migrate && npm start             # http://127.0.0.1:5679
cd ../frontweb && npm install --registry https://registry.npmjs.org && npm run dev   # http://127.0.0.1:3013
```
