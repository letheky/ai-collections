# iArt motion skills (iart-ai)

> Repo: https://github.com/iart-ai/motion-skills · MIT · Trang: https://iart.ai
>
> ⭐ **955 sao**, 79 fork (GitHub API, 2026-10-22). Repo `iart-ai/motion-design-skills`: 150 sao · Đã test: 2026-10-22

## Là gì

Bộ skill dạy coding agent làm motion graphics, do iArt (một sản phẩm AI motion thương mại) phát hành.
`iart-ai/motion-skills` là **trang mục lục**: bản thân repo không chứa skill nào,
mà trỏ tới **18 gói** nằm ở các repo riêng, tổng cộng 55 skill. Ví dụ:

| Gói | Số skill |
|---|--:|
| web-animation | 9 |
| motion-design | 9 |
| explainer-video | 5 |
| freelance-motion | 5 |
| tiktok-video | 4 |
| ad-video | 3 |
| data-animation | 3 |
| … và 11 gói khác: manim, webgl, map, lower-thirds, b-roll… | |

Repo mục lục có kèm bộ script `tools/verify/` (`contact-sheet.sh`, `probe-mp4.sh`, `seek-shot.sh`) để kiểm tra video đã render.

## Đã test

| Gói (`npx skills add iart-ai/<gói> --agent claude-code -y`) | Kết quả |
|---|---|
| explainer-video-skills | ✅ 5 skill: diagram-animation, explainer-video, isometric-animation, whiteboard-animation, wrapped-video |
| data-animation-skills | ✅ 3 skill: animated-infographic, chart-animation, presentation-video |
| youtube-video-skills | ✅ 2 skill: audiogram, youtube-intro-outro |
| motion-design-skills | ✅ 9 skill: after-effects, animation-principles, beat-sync-editing, color-motion, logo-animation, motion-art-direction, motion-background, remotion-video, shot-composition |

Số skill cài được khớp với bảng trong README. Mỗi gói cài trong 2–5 giây.

## Kết luận nhanh

✅ Chia gói theo nhu cầu rõ ràng, giấy phép MIT, cài nhanh. Chỉ nên cài gói mình cần.
Chưa render thử bằng từng skill. Lưu ý đây cũng là kênh giới thiệu sản phẩm thương mại iart.ai.
