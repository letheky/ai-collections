# Taste Skill: cho coding agent "gu" thiết kế web

> Nguồn: người dùng yêu cầu. Repo: https://github.com/Leonxlnx/taste-skill. Trang chủ: https://tasteskill.dev
> Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `Leonxlnx/taste-skill`: **98.897 sao**, 6.723 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Taste Skill là bộ Agent Skills giúp agent **thiết kế** website, thay vì lắp ráp ra một landing page "trung bình".
Tác giả là Leonxlnx, giấy phép **MIT**. Repo có 98.897 sao, 6.723 fork.

## Cách bản v2 hoạt động

Skill mặc định là `design-taste-frontend`, được xây từ việc nghiên cứu **247 website chọn lọc**. Mỗi lần build có 6 bước:

1. Đọc brief, liệt kê những gì chỉ riêng khách hàng này có.
2. Một script **rút ngẫu nhiên 3 trong 20 hướng thiết kế** đã nghiên cứu, agent chọn một.
3. Tìm "ý tưởng": một câu nối chất liệu riêng của khách hàng với hướng đã chọn.
4. Xây trang bằng **ảnh và footage thật** lấy từ kho mở (Wikimedia Commons, Openverse, the Met).
   Chỉ dùng tài nguyên public domain, CC0, CC BY, CC BY-SA, và ghi credit ngay trên trang.
5. Kiểm tra trang trong **trình duyệt thật ở 3 độ rộng màn hình**; trang bị đánh trượt nếu "slop".
6. Agent tự xem ảnh chụp màn hình và sửa 3 lỗi lớn nhất, tối đa 3 vòng.

**Chi phí:** khoảng **30–45 phút và vài trăm nghìn token** cho mỗi lần build.

Từ v2.1 có thêm luồng riêng cho dashboard và màn hình app: panel tiết chế, số liệu căn thẳng hàng, màu chỉ dùng cho dữ liệu, điều hướng tự gập trên điện thoại.

## Các skill khác

- **Classic skills (7):** chỉ chạy khi bạn gọi tên.
  - `high-end-visual-design` (mềm, nhiều khoảng trắng)
  - `minimalist-ui`
  - `industrial-brutalist-ui`
  - `gpt-taste` (biến thể cho GPT/Codex)
  - `stitch-design-taste` (cho Google Stitch)
  - các bản cũ v1 và v2-experimental, có 3 thanh chỉnh DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY
- **Skill sinh ảnh** (`imagegen-frontend-web/mobile`, `brandkit`, `image-to-code`) đã chuyển sang repo riêng: https://github.com/Leonxlnx/imagegen-skills

## Cài đặt

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
# hoặc trong Claude Code
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

- Cần **Node 22+** và **Chrome, Edge hoặc Chromium** đã cài sẵn.
- Không cần API key. Cần mạng để tìm ảnh.

## Nhận xét

- **Hợp với:** landing page, portfolio, trang sản phẩm muốn có cá tính riêng.
  Việc rút ngẫu nhiên hướng thiết kế giúp mỗi lần build ra kết quả khác nhau, tránh trang nào cũng giống nhau.
- **Chi phí:** khá tốn token. Không hợp với các sửa đổi nhỏ; khi đó dùng [Impeccable](impeccable.md) (`polish`, `layout`…) sẽ tiết kiệm hơn.
- **Ảnh:** ảnh từ kho mở có giấy phép CC BY / CC BY-SA, nên **phải giữ credit**. Khi có ảnh riêng thì nên thay vào.
- **Quảng cáo:** README có nhiều sponsor kèm link affiliate (Sidrune AI, Kimi…). Bỏ qua phần đó nếu không cần.
