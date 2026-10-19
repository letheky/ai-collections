# T3-Video

> Model: https://huggingface.co/APRIL-AIGC/T3-Video · Bài báo: arXiv 2512.13492 (12/2025) · Trang dự án: https://zhangzjn.github.io/projects/T3-Video/
>
> Ngày nghiên cứu: 2026-10-19 · **Chưa test**

## Là gì (theo bài báo và model card)

- **Phương pháp:** fine-tune Wan2.1-T2V-1.3B, thay attention toàn cục bằng attention cửa sổ đa tỉ lệ để sinh video 4K gốc (2176×3840, 81 khung hình).
- **Dữ liệu huấn luyện:** 42k video của bộ UltraVideo.
- **Tốc độ:** tác giả báo nhanh hơn trên 10 lần so với full attention.
- **Tài nguyên:** mỗi clip 4K cần khoảng **dưới 60 GB VRAM và khoảng 1 giờ trên một GPU H20**.

## Không test được

- Cần GPU data center khoảng 60–80 GB VRAM. Môi trường test không có GPU.
- huggingface.co bị chặn, nên không tải được model card hay trọng số.
- Không tìm thấy Space demo công khai.

## Kết luận nhanh

⛔ Không chạy được trên máy cá nhân hay card gaming. Chỉ đáng thử nếu thuê được GPU 80 GB trên cloud.
Mọi con số trên là do tác giả tự công bố, chưa được kiểm chứng.
