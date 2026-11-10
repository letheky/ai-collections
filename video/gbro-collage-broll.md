# gbro-collage-broll

> Repo: https://github.com/pyang5166/gbro-collage-broll · MIT
>
> ⭐ **1.873 sao**, 166 fork (GitHub API, 2026-11-10) · Chưa chạy: 2026-11-10 (chỉ đọc README)

## Là gì

Skill tạo đoạn B-roll 5 giây phong cách cắt dán giấy kiểu tạp chí (nền giấy một màu, ảnh halftone đen trắng, mảnh giấy màu ghép dần vào khung) từ một câu lời thoại.
- Quy trình 3 cổng duyệt: (1) chốt ẩn dụ hình ảnh bằng chữ, (2) tạo ảnh tĩnh để duyệt, (3) tạo video.
- **Không làm bằng code.** Ảnh tĩnh do công cụ `image_gen` của Codex tạo; video do model `gemini-omni-flash-preview` của Google tạo từ khung đầu và khung cuối.
- Mặc định xuất 9:16, 720×1280, 24 fps, không tiếng.

## Đã test

| Bước | Kết quả |
|---|---|
| Đọc README | ✅ Yêu cầu: môi trường Codex (cho `image_gen`), `GEMINI_API_KEY` (tính phí theo lượt), Python ≥ 3.10, ffmpeg |
| Tạo một đoạn B-roll | ⛔ Không test: không có key Gemini, không có Codex |

## Kết luận nhanh

⚠️ Bài giới thiệu xếp skill này chung với các công cụ làm phim bằng code, nhưng thực ra nó dùng model tạo video **trả phí**. Hợp khi cần B-roll cắt dán đẹp nhanh và chấp nhận tốn tiền API. Nếu muốn miễn phí, có thể dựng phong cách cắt dán bằng code (HTML/canvas hoặc Blender) (ví dụ Blender với vật liệu giấy, như cảnh thử Bức tường Berlin đang làm).

## Cài đặt

```bash
git clone https://github.com/pyang5166/gbro-collage-broll ~/.agents/skills/gbro-collage-broll
export GEMINI_API_KEY=...
# rồi nói với agent: "collage b-roll: <câu lời thoại>"
```
