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

## Bản tin 17/11/2026 (6 bản)

Số sao, fork, giấy phép, ngày push cuối lấy qua GitHub API ngày 2026-11-17. Cột "Đối chiếu" là kết quả tôi đọc mã nguồn; cột này chưa phải chạy thử.

### Đã chạy thử

| Repo | ⭐ | Kết quả |
|---|---:|---|
| [ffmpeg-skill](ffmpeg-skill.md) | 7.151 | ✅ 42 công cụ; tự đo lại kết quả, bắt đúng lỗi âm lượng và 24 kHz của pilot Berlin |
| [anything2explainer](anything2explainer.md) | 3.369 | ✅ Render được lời Việt; ⚠️ giấy phép phi thương mại |
| [html-video](html-video.md) | 4.849 | ❌ Điền nội dung qua CLI không có tác dụng, video ra vẫn là nội dung mẫu |
| [Comfy MCP](../agents/comfy-mcp.md) | 348 | ✅ Đủ 41 công cụ, `preview_media` chạy; phần cần ComfyUI chưa test |

### Kiểm tra nhanh (chưa cài thử)

| Repo | ⭐ | Fork | Giấy phép | Push cuối | Đối chiếu với bản tin |
|---|---:|---:|---|---|---|
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | 85.390 | 7.910 | Apache-2.0 | 2026-11-17 | Đã test trong [15 repo motion](../animation/claude-motion-studio-15-repos.md) |
| [ATH-MaaS/Pixelle-Video](https://github.com/ATH-MaaS/Pixelle-Video) | 30.164 | 4.375 | Apache-2.0 | 2026-06-14 | Đúng là máy tạo video ngắn tự động; 5 tháng chưa push |
| [jub0t/Concat](https://github.com/jub0t/Concat) | 18.202 | 2.234 | **AGPL-3.0** | 2026-11-16 | Đúng: có MCP (`concat --mcp`) và JSON-RPC API; đang beta |
| [MeiGen-AI/InfiniteTalk](https://github.com/MeiGen-AI/InfiniteTalk) | 8.415 | 1.448 | Apache-2.0 | 2026-05-22 | Ra từ 8/2025, không phải "thế hệ mới"; cần GPU |
| [PurpleDoubleD/locally-uncensored](https://github.com/PurpleDoubleD/locally-uncensored) | 4.327 | 701 | **AGPL-3.0** | 2026-11-17 | — |
| [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) | 3.159 | 476 | **AGPL-3.0** | 2026-11-12 | Có MCP và Remotion; **không tìm thấy** tính năng "face-safe zone" trong mã |
| [dmtrKovalenko/fframes](https://github.com/dmtrKovalenko/fframes) | 3.126 | 97 | MIT | 2026-11-15 | Rust, mỗi khung là một SVG; bản tin ghi "Rust/WASM" và "Apache-2.0/MIT" là gộp chung với html-video |
| [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) | 2.241 | 213 | "NOASSERTION" | 2026-11-16 | Danh mục liệt kê; **không có** phần đo hiệu năng như bản tin nói |
| [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 1.762 | 176 | MIT | 2026-11-13 | Repo "cổng" dẫn sang 19 repo con; trong repo này không có file SKILL.md nào |
| [Fantasy-AMAP/fantasy-talking](https://github.com/Fantasy-AMAP/fantasy-talking) | 1.629 | 127 | Apache-2.0 | 2026-01-26 | Ra từ 4/2025; 10 tháng chưa push |
| [JayWebtech/autoshorts](https://github.com/JayWebtech/autoshorts) | 1.556 | 283 | **Không có giấy phép** | 2026-11-16 | Đúng là có xếp hạng "viral moment"; không có giấy phép thì mặc định không được sửa hay phân phối lại |
| [ersinkoc/AI-Video-Factory](https://github.com/ersinkoc/AI-Video-Factory) | 485 | 67 | MIT | 2026-11-16 | Đúng: agent Claude + Remotion + Studio web để duyệt; mới tạo 29/10 |
| [appergb/OpenTake](https://github.com/appergb/OpenTake) | 126 | 30 | GPL-3.0 | **2026-09-07** | Fork của Palmier Pro; hơn 2 tháng chưa push |
| [appergb/ClipSkills](https://github.com/appergb/ClipSkills) | 69 | 2 | "NOASSERTION" | **2026-06-19** | Chỉ có 1 lần push, ngày tạo repo |
| [sieve-community/sievesync](https://github.com/sieve-community/sievesync) | 54 | 7 | MIT | **2024-09-25** | Bỏ từ 2024; là mã mẫu cho dịch vụ trả phí của Sieve |
| [TechBeme/open-higgsfield](https://github.com/TechBeme/open-higgsfield) | 47 | 14 | MIT | 2026-11-17 | Gọi model qua API trả phí (Freepik, Gemini, Vertex AI...) |
| [AIPMAndy/Andy-Video-Skill](https://github.com/AIPMAndy/Andy-Video-Skill) | 19 | 1 | MIT | 2026-11-12 | Có `director.py`; 19 sao, gần như chưa ai dùng |
| [ismael-joffroy-chandoutis/comfyui-cinema-pipeline](https://github.com/ismael-joffroy-chandoutis/comfyui-cinema-pipeline) | 8 | 1 | "NOASSERTION" | 2026-09-09 | Nguồn duy nhất của tin "DaVinci Resolve 21.1 có MCP gốc" |
| [akash-aman/Algorithmics](https://github.com/akash-aman/Algorithmics) | 2 | 0 | MIT | 2026-08-08 | Tài liệu ghi "proposed, not yet implemented"; chỉ là ghi chép nghiên cứu, không phải tài liệu của Fish Audio |
| [YashvanthSankar/choco.video](https://github.com/YashvanthSankar/choco.video) | 1 | 0 | MIT | 2026-10-23 | **Chỉ chạy trên macOS**. "2¢ mỗi giờ video" là phí trả cho nhà cung cấp LLM nếu không dùng Apple Intelligence |
| [anzy-renlab-ai/vocut](https://github.com/anzy-renlab-ai/vocut) | 0 | 1 | MIT | **2026-06-01** | 0 sao, gần 6 tháng chưa push; tính năng đúng như mô tả (yt-dlp, rerank, Remotion) |

### Chỗ bản tin 17/11 chưa đúng

- **Link HN sai chỗ:** item 50368804 được gắn cho cả OpenChatCut lẫn "Kino AI"; item 47170174 được gắn cho cả HyperFrames lẫn "Cardboard". Một link không thể là hai bài. Máy test không mở được HN để kiểm.
- **Link Product Hunt:** FocuSee và Vozo AI đều trỏ về trang danh mục chung, không phải trang sản phẩm.
- **Link GitHub không đúng repo:** "html-video (OpenDesign)" trỏ vào trang tổ chức `nexu-io`, repo thật là `nexu-io/html-video`.
- **"Kiến trúc đồng bộ thời gian thực" của Fish Audio:** link dẫn tới một repo 2 sao, ghi chú nghiên cứu chưa làm. Thông tin Fish Audio trả mốc thời gian từng từ là do người viết ghi chú tự tìm, chưa phải tài liệu chính thức.
- **"Trending" nhưng rất nhỏ hoặc bỏ lâu:** choco.video (1 sao), vocut (0 sao), Andy-Video-Skill (19), ClipSkills (69), sievesync (bỏ từ 2024).
- **Giấy phép:**
  - Bản tin không nhắc anything2explainer là phi thương mại.
  - OpenChatCut, Concat, Locally Uncensored dùng AGPL.
  - AutoShorts không có giấy phép.
- **"html-video có sẵn 21 template kèm nhạc nền AI":** nhạc và lời đọc phải có key MiniMax trả phí. Điền nội dung qua CLI chưa chạy (xem [ghi chú](html-video.md)).
- **Chưa kiểm chứng được:**
  - Các bài Reddit (máy test bị chặn) và các số liệu trong đó: $0.07/clip trên Runware, ngưỡng 80% stayed-to-watch, 1.000 sub sau 3 tháng.
  - Tên model "MiniMax H3 open-weight", "Seedance 2.5", "LTX 2.5".

## Gợi ý stack 0đ (không cần GPU)

Claude viết kịch bản → người duyệt → Edge TTS giọng Việt → hình motion graphics bằng code (HyperFrames/Remotion) hoặc footage stock → phụ đề → ghép bằng MoneyPrinterTurbo hoặc FFmpeg → duyệt trước khi đăng.
Muốn tự sinh B-roll, clone giọng hay MC ảo thì mới cần GPU (8–24 GB VRAM).
