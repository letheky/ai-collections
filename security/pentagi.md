# PentAGI

> Repo: https://github.com/vxcontrol/pentagi · MIT
>
> ⭐ **31.149 sao**, 4.888 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Nền tảng multi-agent hỗ trợ kiểm thử bảo mật được ủy quyền, do VXControl phát triển.

- **Kiến trúc:** backend Go, frontend React; dữ liệu trong PostgreSQL + pgvector; Graphiti/Neo4j là tùy chọn và đang beta.
- **Môi trường chạy:** các công cụ chạy trong sandbox Docker.
- **Giao diện:** Web UI, REST, GraphQL.
- **Model:** hỗ trợ nhiều nhà cung cấp LLM (OpenAI, Anthropic, Gemini, Bedrock, Ollama…).

## Đã test

| Bước | Kết quả |
|---|---|
| `docker compose pull` | ⚠️ Image `pgexporter` (trên quay.io) bị chặn trong môi trường test. Kéo riêng được `vxcontrol/pentagi` (889 MB) và `vxcontrol/pgvector` (614 MB) |
| `docker compose up -d pgvector pentagi` | ✅ Lên trong khoảng 10 giây. DB schema migrate xong, Web UI trả HTTP 200 ở `https://127.0.0.1:8443` |
| Đăng nhập tài khoản mặc định trong README | ⚠️ Vào được ngay. App bắt đổi mật khẩu nhưng **có nút "Skip for now"** để bỏ qua |
| Log khi không có API key | ⚠️ Báo lỗi tạo embedder (thiếu `OPENAI_API_KEY`) nhưng server vẫn chạy |
| Chạy một flow agent | ⛔ Không test (cần API key của LLM và image sandbox) |

## Kết luận nhanh

✅ Dựng lên rất nhanh bằng Docker. ⚠️ Hãy đổi mật khẩu mặc định ngay, đừng bấm bỏ qua, và chỉ mở cổng trên `127.0.0.1`.
Chất lượng các flow agent chưa được kiểm chứng ở đây. Chỉ dùng trên hệ thống bạn sở hữu hoặc được ủy quyền bằng văn bản.

## Cài đặt

```bash
git clone https://github.com/vxcontrol/pentagi && cd pentagi
cp .env.example .env        # điền API key của LLM, đổi các secret mặc định
docker compose up -d
```

Theo README: tối thiểu 2 vCPU, 4 GB RAM, 20 GB ổ đĩa. Nên cập nhật lên bản ≥ 2.2.0 (đã vá CVE-2026-14784).
