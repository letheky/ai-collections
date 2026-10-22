# 15 repo motion / video cho Claude Code

> Số sao lấy qua GitHub API ngày 2026-10-19. Đã test ngày 2026-10-19.
> Cột "Skill (đã cài)" là số `SKILL.md` thực tế cài được bằng `npx skills add <repo> --agent claude-code -y` (skills CLI 1.7.2),
> hoặc đếm trực tiếp trong repo đã clone khi repo không cài qua CLI.
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/EPPqkjHvhpKRGWh7763ymW (video HyperFrames tự dựng (lãi kép, tiếng Việt))

## Bảng tổng hợp

| # | Repo | Nhóm | ⭐ | Skill (đã cài) | Công nghệ | Giấy phép |
|---|---|---|--:|--:|---|---|
| 01 | [AbubakrChan/product-launch-motion](https://github.com/AbubakrChan/product-launch-motion) | Video launch | 316 | 2 | HTML + Playwright + ffmpeg | MIT |
| 02 | [charlie947/motion-graphics-skills](https://github.com/charlie947/motion-graphics-skills) | Video launch | 334 | 15 | HyperFrames + ffmpeg | MIT |
| 03 | [howseen-ai/claude-motion-design](https://github.com/howseen-ai/claude-motion-design) | Video launch | 577 | 1 (15 script) | HTML + Playwright + ffmpeg (Python) | MIT |
| 04 | [nateherkai/herk-edit-kit](https://github.com/nateherkai/herk-edit-kit) | Dựng video có sẵn | 1.812 | 30 (79 script) | HyperFrames + ffmpeg, transcribe bằng ElevenLabs | File LICENSE mở đầu bằng "MIT License" |
| 05 | [Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics) | Dựng video có sẵn | 738 | 6 | HTML | MIT |
| 06 | [cth9191/animate](https://github.com/cth9191/animate) | Hoạt hình giải thích | 816 | 1 (61 script) | Canvas + Playwright + ffmpeg | MIT |
| 07 | [whaleyxbt/claude-motion](https://github.com/whaleyxbt/claude-motion) | Hoạt hình giải thích | 477 | 4 | Remotion + three.js | MIT |
| 08 | [haidrrrry/claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill) | Hoạt hình giải thích | 524 | 1 | Remotion | MIT |
| 09 | [motiondivision/motion](https://github.com/motiondivision/motion) | Web/app | 34.327 | — (thư viện) | `npm i motion` → v14.3.0 | MIT |
| 10 | [199-biotechnologies/motion-dev-animations-skill](https://github.com/199-biotechnologies/motion-dev-animations-skill) | Web/app | 193 | 1 | Motion.dev | MIT |
| 11 | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Nền tảng | 66.806 | 21 | HTML + GSAP → MP4 | Apache-2.0 |
| 12 | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Nền tảng | 65.037 | — (framework) | React → MP4 | Remotion License (công ty > 3 người phải trả phí) |
| 13 | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Nền tảng | 5.331 | 12 | Remotion | Không có file LICENSE |
| 14 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Nền tảng | 16.609 | 8 | GSAP (`npm i gsap` → v3.15.0) | MIT |
| 15 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | Nền tảng | 2.308 | 1 | Nguyên tắc chuyển động | MIT |

## Đã test

**HyperFrames (CLI 0.8.173)**

| Bước | Kết quả |
|---|---|
| `hyperframes init demo --example blank` | ✅ Tạo project, kèm sẵn `CLAUDE.md` và `AGENTS.md` |
| Composition tự viết (tiêu đề "Lãi kép sau 10 năm", 6 cột tăng dần, dòng chú thích tiếng Việt) | ✅ `hyperframes render` → MP4 **1920×1080, 150 khung hình / 5 giây** trong **10,5 giây** bằng CPU. Dấu tiếng Việt hiển thị đúng |
| Cần chỉnh khi chạy | ⚠️ Phải đặt `HYPERFRAMES_BROWSER_PATH` trỏ tới chrome-headless-shell. Template mặc định tải GSAP từ CDN; máy offline thì phải tải GSAP về project |
| Tính năng khác (thấy qua `--help`) | TTS Kokoro chạy local, transcribe bằng Whisper, tách nền, render trên cloud / Lambda / Cloud Run |
| Telemetry | ⚠️ Bật mặc định. Tắt bằng `hyperframes telemetry disable` |

**Remotion:** render demo "world-in-numbers" của OpenMontage → MP4 1920×1080, 690 khung hình, mất 2 phút 6 giây bằng CPU. Chi tiết xem [OpenMontage](../video/openmontage.md).

**claude-remotion-skill (08) + Remotion (12):** tôi dựng một video 15 giây theo đủ 10 quy tắc của skill (easing, stagger, exit nhanh hơn, 5 lớp, grain, vignette, theme…). Render mất 1 phút 6 giây bằng CPU. Demo: https://claude.ai/artifact/QAjKzMaye1tjEZVMq7tidm

**Các repo skill nhỏ (01–08, 10):** đã cài hoặc clone và đếm skill, script, giấy phép như trong bảng. **Chưa render thử** từng repo.

## Kết luận nhanh

- **Mới bắt đầu:** HyperFrames + gsap-skills + motion-design-skill. Cả ba miễn phí, đã render được ngay trên máy không có GPU.
- **Đã quen React:** Remotion + remotion-dev/skills. Nhớ kiểm tra license nếu là công ty trên 3 người.
- **Skill cộng đồng:** số sao nhỏ (vài trăm) và repo rất mới. Đọc `SKILL.md` trước khi dùng, vì skill chạy với toàn quyền của agent.
