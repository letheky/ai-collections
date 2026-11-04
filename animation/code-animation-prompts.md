# Code Animation Prompts

> Repo: https://github.com/XiaoyeCodes/code-animation-prompts · Chia sẻ miễn phí, cấm bán lại (GitHub ghi "Other"); phần lấy từ Lemo-Opuscar, mg-styles-15, code-video giữ giấy phép MIT riêng
>
> ⭐ **422 sao**, 105 fork (GitHub API, 2026-11-04) · Đã test: 2026-11-04
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/AhpmG8QwaAmts5nWEpWNac (làm theo prompt B3, ra video hạt ánh sáng 19,2 giây)

## Là gì

Bộ **341 prompt phong cách** cho hoạt hình làm bằng code (HTML/Canvas), kèm **193 ảnh tĩnh** tham khảo, đóng gói thành skill cho Claude Code và Codex. Tài liệu viết bằng tiếng Trung.
- **10 nhóm:** A–G mẫu code (26), M chuyển động (40), K hoạt hình (38), Z phong cách Trung Hoa (15), H bố cục sẵn (12), L Lemo-Opuscar (59), V mg-styles-15 (15), X code-video (31), R tham chiếu (7), O 98 phim Oscar (98).
- **Trình chọn phong cách offline:** file `风格挑选.html`, mở bằng Chrome là dùng được.
- **Script:** `styles.py` để tra cứu không phải nạp hết vào ngữ cảnh, `render_video.py` để xuất HTML ra MP4 (Playwright + FFmpeg).
- Nguồn gốc: bộ tài liệu miễn phí của tác giả Bilibili "俯仰观照", được XiaoyeCodes đóng gói lại.

## Đã test

| Bước | Kết quả |
|---|---|
| `scripts/validate_repo.py` | ✅ 555 file gốc không đổi (đối chiếu SHA-256), 341 phong cách, 193 ảnh tĩnh, 575 link nội bộ |
| `install_skill.py --target claude` | ✅ Chép vào `~/.claude/skills/code-animation-prompts`. Nặng **77 MB** vì kèm cả ảnh và video mẫu; riêng `SKILL.md` chỉ 4 KB |
| `styles.py search 水墨` / `show B3` | ✅ Tìm ra C1, Z1, Z13; in đủ prompt B3 (5.628 byte) |
| `render_video.py` với file mẫu | ✅ 120 khung 1280×720 trong 15 giây |
| Làm như agent: đọc prompt B3 "粒子聚形", tự viết HTML, phụ đề tiếng Việt | ✅ Render 576 khung 1080p trong 3 phút 35 giây. Khung ở t=1,8 là trái tim, t=3,3 đang bung về phía ngôi nhà — đúng như phần tự kiểm tra trong prompt |
| Lỗi gặp khi viết | ⚠️ Lần đầu phần đuôi hạt tính vị trí ở thời điểm âm (t−0,09) khi t=0 nên báo lỗi. Đây là lỗi code tôi viết, kẹp t ≥ 0 là xong |

## Kết luận nhanh

✅ Prompt rất chi tiết: ghi rõ số hạt, seed ngẫu nhiên, công thức chuyển động, màu, thời điểm phụ đề, kèm phần tự kiểm tra. Làm theo là ra đúng hình. Đáng dùng để có hoạt hình code đẹp, lặp lại được.
⚠️ Chỉ là prompt và quy trình: model vẫn phải tự viết code, chất lượng phụ thuộc model. Không phải prompt nào cũng chi tiết như B3: 148 phong cách chỉ có mô tả chữ. Nhóm L (Lemo-Opuscar) trùng với [lemo-opuscar](../video/lemo-opuscar.md) đã có trong collection. Muốn render bằng script đi kèm, HTML phải có `window.renderAt(t)` và hỗ trợ `?export=1`.

## Cài đặt

```bash
git clone https://github.com/XiaoyeCodes/code-animation-prompts.git
cd code-animation-prompts
python scripts/install_skill.py --target claude      # hoặc --target codex
# chỉ cần khi xuất MP4:
python -m pip install playwright && python -m playwright install chromium
```

Trong Claude Code: `/code-animation-prompts dùng Z5 cắt giấy làm intro Tết 12 giây, 16:9 ...`
