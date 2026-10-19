# 15 repo GitHub cho "Claude Motion Studio"

> Nguồn: infographic do người dùng cung cấp. Ảnh chỉ ghi tên repo, không ghi tác giả.
> Tên đầy đủ (owner/repo) được đối chiếu với README tiếng Thổ Nhĩ Kỳ
> https://github.com/guraygur0/claude-motion-graphics, nơi liệt kê đúng 15 công cụ này theo đúng 5 nhóm.
> Số sao lấy qua GitHub search API ngày 2026-10-19. Phần lớn repo mới xuất hiện trong tháng 9–10/2026 nên số sao thay đổi rất nhanh.

## Bảng tổng hợp

| # | Repo | Làm gì | ⭐ | Giấy phép | Công nghệ |
|---|---|---|---|---|---|
| **1. Video ra mắt sản phẩm** |||||
| 01 | [AbubakrChan/product-launch-motion](https://github.com/AbubakrChan/product-launch-motion) | Video launch kiểu cao cấp: con trỏ chuột "diễn", hiệu ứng âm thanh khớp nhịp, motion blur 60 fps | 316 | MIT | HTML + Playwright + ffmpeg (v2); bản v1 dùng GSAP + HyperFrames |
| 02 | [charlie947/motion-graphics-skills](https://github.com/charlie947/motion-graphics-skills) | Khoảng 13–15 skill motion graphics cho video launch, "mọi khung hình là code" | 334 | MIT | HyperFrames + ffmpeg/Python |
| 03 | [howseen-ai/claude-motion-design](https://github.com/howseen-ai/claude-motion-design) | Video motion design khớp nhạc, không cần After Effects hay giấy phép Remotion | 577 | MIT | HTML + Playwright + ffmpeg (Python) |
| **2. Dựng từ video có sẵn** |||||
| 04 | [nateherkai/herk-edit-kit](https://github.com/nateherkai/herk-edit-kit) (tên cũ: `hyperframes-student-kit`) | Biên tập reel/Shorts: cắt theo transcript, 15 skill, 406 thẻ motion graphics | 1.812 | Giấy phép riêng (xem file LICENSE) | HyperFrames + ffmpeg, transcribe bằng ElevenLabs (API trả phí) |
| 05 | [Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics) | Mỗi skill làm một việc: overlay chữ theo lời nói, tách nền… Dùng được cho Claude Code và Codex | 738 | README ghi MIT | HTML |
| **3. Hoạt hình ngắn và video giải thích** |||||
| 06 | [cth9191/animate](https://github.com/cth9191/animate) | Hoạt hình canvas một file, 7 phong cách, có bước duyệt storyboard với người dùng | 816 | MIT | Canvas + Playwright + ffmpeg (tùy chọn faster-whisper / ElevenLabs) |
| 07 | [whaleyxbt/claude-motion](https://github.com/whaleyxbt/claude-motion) | Bộ công cụ motion: quy tắc thẩm mỹ, agent tự review từng khung hình, engine âm thanh bằng Python | 477 | MIT | Remotion + three.js + Playwright + ffmpeg |
| 08 | [haidrrrry/claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill) | Tạo và sửa video motion graphics bằng Remotion, khắc phục chuyển động "cứng" thường thấy khi AI làm | 524 | MIT | Remotion (React/TS) + ffmpeg |
| **4. Chuyển động cho web và app** |||||
| 09 | [motiondivision/motion](https://github.com/motiondivision/motion) | Thư viện animation cho React/JS (trước đây là Framer Motion). Đây là thư viện, không phải skill | 34.327 | MIT | Motion.dev |
| 10 | [199-biotechnologies/motion-dev-animations-skill](https://github.com/199-biotechnologies/motion-dev-animations-skill) | Skill giúp Claude viết animation bằng Motion.dev: spring, cuộn trang, cử chỉ | 193 | MIT | Motion.dev |
| **5. Công cụ và skill nền tảng** |||||
| 11 | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Viết video bằng HTML rồi render ra MP4, làm cho agent dùng; có 21 skill | 66.806 | Apache-2.0 | HTML + GSAP + Puppeteer + ffmpeg |
| 12 | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Làm video bằng React | 65.037 | **Remotion License**: miễn phí cho cá nhân và công ty ≤3 người, công ty lớn hơn phải trả phí | React |
| 13 | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Skill chính thức của Remotion cho agent | 5.331 | Không thấy file LICENSE | Remotion |
| 14 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Skill chính thức của GSAP: timeline, ScrollTrigger, plugin | 16.609 | MIT | GSAP |
| 15 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | Nguyên tắc chuyển động (timing, easing, choreography), không phụ thuộc công cụ nào | 2.308 | MIT | Dùng với CSS, GSAP, Lottie… |

## Cài đặt nhanh

```bash
# Nền tảng
claude plugin marketplace add heygen-com/hyperframes && claude plugin install hyperframes@hyperframes
npx skills add remotion-dev/skills
npx skills add https://github.com/greensock/gsap-skills
npx skills add LottieFiles/motion-design-skill

# Skill cộng đồng
npx skills add AbubakrChan/product-launch-motion
npx skills add charlie947/motion-graphics-skills     # cần cài hyperframes trước
npx skills add Barty-Bart/motion-graphics
/plugin marketplace add cth9191/animate              # trong Claude Code
/plugin install animate@animate
```

Các repo còn lại cài thủ công:
- `howseen-ai/claude-motion-design`: chép thư mục `skill/motion-design` vào `~/.claude/skills/`.
- `whaleyxbt/claude-motion`: clone repo rồi `npm install`.
- `haidrrrry/claude-remotion-skill`: chép thư mục `remotion-motion-graphics` vào `~/.claude/skills/`.
- `199-biotechnologies/motion-dev-animations-skill`: clone vào `~/.claude/skills/motion-dev-animations`.
- `nateherkai/herk-edit-kit`: clone repo, chạy `npm ci && npm run setup`.

## Nhận xét

- **Có ba "động cơ" render chính:**
  1. **HyperFrames** (HTML + GSAP): Apache-2.0, nhiều skill nhất.
  2. **Remotion** (React): mạnh, nhưng công ty trên 3 người phải mua license.
  3. **HTML/Canvas tự viết + Playwright + ffmpeg**: không phụ thuộc framework nào.

  Phần lớn skill cộng đồng được xây trên một trong ba động cơ này.
- **Không phải mục nào cũng là skill:** `motion` (số 09) và `remotion` (số 12) là thư viện/framework. Phải cài skill tương ứng (số 10, 13) thì agent mới dùng tốt.
- **Gợi ý chọn:**
  - Mới bắt đầu: `hyperframes` + `gsap-skills` + `motion-design-skill`. Cả ba đều miễn phí, giấy phép rộng rãi.
  - Đã quen React: `remotion` + `remotion-dev/skills`, nhưng nhớ kiểm tra license.
  - Video launch SaaS: `product-launch-motion` hoặc `motion-graphics-skills`.
  - Hoạt hình giải thích: `animate`.
  - Cắt dựng reel từ footage có sẵn: `herk-edit-kit` (cần API ElevenLabs).
- **Rủi ro:** các skill cộng đồng phần lớn chỉ vài tuần tuổi, do một người duy trì và chưa có release ổn định. Nên đọc `SKILL.md` trước khi cài, vì skill có thể chạy lệnh shell.
- **Trùng tên:** có nhiều repo cùng tên nhưng khác tác giả, ví dụ `ouerf-man/product-launch-motion-skill`, `Mort1d/motion-graphics-skills`, `imMamdouhaboammar/motion-graphics-skills`. Repo `MoussaabBadla/claude-motion-studio` trùng tên với tiêu đề infographic nhưng **không** nằm trong danh sách 15.
