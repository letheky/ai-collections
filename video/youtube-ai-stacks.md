# Tech stack làm video YouTube bằng AI (tổng hợp 11/2026)

> Tổng hợp từ các bản tin bạn gửi (nguồn Reddit, GitHub, Hacker News). Số sao, giấy phép, ngày cập nhật cuối lấy qua GitHub API ngày 2026-11-10.
> Các công cụ trong bảng dưới **chưa cài thử**, trừ dòng có link sang ghi chú riêng.
> Link Reddit không mở được từ máy test, nên các số liệu khảo sát trong bản tin (ví dụ "96% kênh full-AI kẹt dưới 10k sub") chưa kiểm chứng.

## Đã test trong collection

| Khâu | Công cụ | Ghi chú |
|---|---|---|
| Trọn gói chủ đề → video | [MoneyPrinterTurbo](moneyprinterturbo.md) | 141,6k ⭐, MIT; Edge TTS giọng Việt chạy được |
| Hình kiểu motion graphics bằng code | [HyperFrames, gsap-skills](../animation/claude-motion-studio-15-repos.md), [Code Animation Prompts](../animation/code-animation-prompts.md) | Render bằng CPU, không cần key |
| Remotion qua Claude | [claude-remotion-skill trong ghi chú Skillry](skillry-opus-videos.md) | Remotion miễn phí cho cá nhân, công ty ≤ 3 người |
| Agent dựng video | [OpenMontage](openmontage.md) | Demo không cần key |
| Phụ đề, nhận dạng giọng nói | [WhisperX trong hướng dẫn biên bản họp](../examples/vi-meeting-minutes/README.md) | Cài được; model tải từ Hugging Face |

## Chưa test: kiểm tra nhanh

| Repo | ⭐ | Giấy phép | Cập nhật cuối | Nhận xét |
|---|---:|---|---|---|
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 209.942 | Sustainable Use License (GitHub ghi "Other") | 2026-11-09 | Tự host miễn phí cho việc nội bộ; không phải open-source theo chuẩn OSI |
| [jianchang512/pyvideotrans](https://github.com/jianchang512/pyvideotrans) | 19.689 | GPL-3.0 | 2026-11-10 | Dịch và lồng tiếng video |
| [Huanshere/VideoLingo](https://github.com/Huanshere/VideoLingo) | 19.127 | Apache-2.0 | 2026-09-30 | Dịch, phụ đề, lồng tiếng |
| [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS) | 15.548 | MIT (code) | 2026-11-03 | Clone giọng; cần đọc riêng giấy phép của model đã huấn luyện |
| [Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | 12.750 | Giấy phép Tencent (GitHub ghi "Other") | 2026-10-08 | Cần GPU mạnh |
| [hexgrad/kokoro](https://github.com/hexgrad/kokoro) | 10.017 | Apache-2.0 | 2025-08-06 | TTS nhẹ; theo tôi biết chưa có giọng Việt |
| [RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) | 8.139 | MIT | **2025-02-10** | Gần 2 năm không cập nhật |
| [bytedance/LatentSync](https://github.com/bytedance/LatentSync) | 6.262 | Apache-2.0 | 2025-06-20 | Khớp môi; cần GPU |
| [darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent) | 5.102 | MIT | 2026-10-27 | Trùng chức năng với MoneyPrinterTurbo |
| [antgroup/echomimic](https://github.com/antgroup/echomimic) | 4.334 | Apache-2.0 | 2026-04-07 | Chân dung nói theo audio; cần GPU |
| [Lightricks/ComfyUI-LTXVideo](https://github.com/Lightricks/ComfyUI-LTXVideo) | 4.259 | Giấy phép riêng (GitHub ghi "Other") | 2026-10-20 | Sinh video trên ComfyUI; cần GPU |
| [hkchengrex/MMAudio](https://github.com/hkchengrex/MMAudio) | 2.309 | MIT (code) | 2026-02-23 | Tự sinh tiếng động khớp hình; ra từ 12/2024, không phải "mới" |
| [Tencent-Hunyuan/HunyuanVideo-Foley](https://github.com/Tencent-Hunyuan/HunyuanVideo-Foley) | 1.097 | Giấy phép Tencent ("Other") | 2025-09-28 | Sinh tiếng động; cần GPU |
| [ID-LoRA/ID-LoRA](https://github.com/ID-LoRA/ID-LoRA) | 365 | "Other" | 2026-06-24 | Sinh hình và tiếng cùng lúc trên nền LTX-2 |
| [itsjwill/vanta](https://github.com/itsjwill/vanta) | 161 | "Other" | 2026-07-26 | Repo nhỏ, giấy phép không rõ |
| [vorniches/cutstorm](https://github.com/vorniches/cutstorm) | 22 | MIT | 2026-05-08 | Rất ít người dùng |
| [lovemachine100/ComfyUI-CameraReference3D](https://github.com/lovemachine100/ComfyUI-CameraReference3D) | 3 | MIT | 2026-07-02 | Bản tin gọi là "trending" nhưng chỉ 3 sao |
| [ismael-joffroy-chandoutis/spritz](https://github.com/ismael-joffroy-chandoutis/spritz) | 0 | MIT | 2026-11-07 | Mới tạo, chưa ai dùng |

## Chỗ bản tin chưa đúng

- Tên model đã cũ: Claude 3.5 Sonnet, GPT-4o, Midjourney v6 `--cref`, Runway Gen-3, Wan 2.1, Llama 3, Qwen 2.5.
- Nhiều repo được gọi là "trending" hay "mới ra mắt" nhưng rất nhỏ hoặc đã lâu không cập nhật (xem cột ⭐ và cập nhật cuối ở trên).
- "Mã nguồn mở": n8n, HunyuanVideo, LTX dùng giấy phép riêng của hãng, phải đọc điều khoản trước khi kiếm tiền.
- Pexels (nguồn footage miễn phí mà nhiều pipeline dùng) ngày 10/11/2026 báo tạm dừng cấp key API mới.

## Gợi ý stack 0đ (không cần GPU)

Claude viết kịch bản → người duyệt → Edge TTS giọng Việt → hình motion graphics bằng code (HyperFrames/Remotion) hoặc footage stock → phụ đề → ghép bằng MoneyPrinterTurbo hoặc FFmpeg → duyệt trước khi đăng.
Muốn tự sinh B-roll, clone giọng hay MC ảo thì mới cần GPU (8–24 GB VRAM).
