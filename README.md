# AI Collections

Ghi chú về các công cụ và repo AI. Mọi nội dung đều từ dữ liệu tự kiểm chứng:
- số sao lấy qua GitHub API;
- thông tin lấy từ chính repo và tài liệu chính thức;
- kết quả **tự cài đặt và chạy thử**.

Mỗi ghi chú gồm: **Là gì**, **Đã test** (từng bước kèm số đo), **Kết luận nhanh**, **Cài đặt**, **Lưu ý**.

## Môi trường test (2026-10-19)

- **Máy:** container Linux x86_64, 4 vCPU, 15 GB RAM, **không có GPU**.
- **Phần mềm:** Node 22.22, Python 3.13, uv 0.11, ffmpeg 6.1, Docker 29.8, Chromium 1194 (Playwright). Từ 23/10/2026 dùng thêm Go 1.24 (tự tải toolchain mới hơn khi repo yêu cầu), Rust 1.95–1.97 và Claude Code 2.1.309.
- **Mạng ra ngoài bị giới hạn:** chặn Hugging Face, index PyTorch, quay.io, ghcr.io, nvcr.io, các kho ảnh mở và một số API.
  Bước nào cần các nguồn này được ghi là ⛔ không test được.
- **Từ 10/11/2026:** môi trường cloud riêng `ai-collections` mở thêm Hugging Face (tải model), Edge TTS, Meshy, Poly Haven. Các ghi chú từ ngày này trở đi có thể đã tải model thật.

## Cấu trúc

| Thư mục | Chủ đề |
|---|---|
| [`design/`](design/) | Thiết kế UI, Figma ↔ code |
| [`web/`](web/) | Frontend, browser agent |
| [`animation/`](animation/) | Hoạt hình và motion graphics bằng code, hoạt hình 3D |
| [`video/`](video/) | Sản xuất video bằng agent, model tạo video, AI hiểu video |
| [`voice/`](voice/) | TTS, clone giọng, lồng tiếng |
| [`security/`](security/) | Kiểm thử bảo mật, phân tích phần mềm |
| [`game/`](game/) | Làm game bằng agent, art game |
| [`agents/`](agents/) | Agent đa năng, bộ agent, công cụ cho agent |
| [`learning/`](learning/) | Tài liệu học Claude Code |
| [`dev-env/`](dev-env/) | Môi trường làm việc cho dev |
| [`llm/`](llm/) | Chạy và suy luận LLM |
| [`prompts/`](prompts/) | Bộ prompt dùng với Claude |

Bản ghi có **▶ demo** là có trang kết quả chạy thật (ảnh, video hoặc demo tương tác) để xem trực tiếp. Các trang demo đang để riêng tư, chỉ chủ tài khoản mở được.

Ký hiệu: ✅ chạy tốt · ⚠️ chạy được nhưng có điểm cần lưu ý · ❌ lỗi · ⛔ không test được trong môi trường này.

## Danh mục

### Design
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Impeccable](design/impeccable.md) · [▶ demo](https://claude.ai/artifact/FE4i9ujwmdHvhqHghRFcfZ) | 82.7k | Detector bắt 9 lỗi trên trang mẫu trong < 1 giây | ✅ Hợp để review UI; luật mang quan điểm riêng; telemetry bật mặc định |
| [Taste Skill](design/taste-skill.md) · [▶ demo](https://claude.ai/artifact/8JGjviJjzz7ohMMpa5b6Ag) | 98.9k | `draw` ra hướng thiết kế; `inspect` chụp 3 độ rộng, chấm 8 FAIL / 4 WARN | ✅ Hợp với landing page mới; khắt khe hơn Impeccable |
| [Figwright](design/figwright.md) | 1.1k | MCP server 0.6.0 khởi động, liệt kê 117 tool | ✅ Server chạy ngay; plugin Figma chưa test |

### Web
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Crawl4AI](web/crawl4ai.md) · [▶ demo](https://claude.ai/artifact/TYfdt6Pr4h19iJ7asTcrBX) | 86.0k | Crawl trang có JS trong 0,61 giây; bảng ra Markdown đúng | ✅ Ổn định; bộ lọc còn để lọt quảng cáo |
| [Pretext](web/pretext.md) · [▶ demo](https://claude.ai/artifact/HGYKd3syxPbvYFCJnG9qXz) | 50.8k | Khớp DOM ở 60/61 độ rộng với văn bản tiếng Việt; nhanh hơn DOM khoảng 11,5 lần | ✅ Chính xác và nhanh |

### Animation
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Code Animation Prompts](animation/code-animation-prompts.md) · [▶ demo](https://claude.ai/artifact/AhpmG8QwaAmts5nWEpWNac) | 422 | 341 prompt, 193 ảnh tĩnh; làm theo prompt B3 ra đúng hình, render 1080p | ✅ Prompt rất chi tiết; ⚠️ tiếng Trung, 148 phong cách chỉ có mô tả chữ |
| [AnyScene](animation/anyscene.md) · [▶ demo](https://claude.ai/artifact/FqweHvq9w5ibrDY3w8SFLR) | 285 | Camera rig quay đúng (đổi tiêu cự, kéo nét); encoder chỉ chạy trên Windows | ⚠️ Cần fal trả phí: ~150 USD cho cảnh 90 prop |
| [15 repo motion](animation/claude-motion-studio-15-repos.md) · [▶ demo](https://claude.ai/artifact/EPPqkjHvhpKRGWh7763ymW) | — | HyperFrames render phim 5 giây trong 10,5 giây; đếm skill thực tế của 9 repo | ✅ Nên bắt đầu với HyperFrames + gsap-skills |
| [anidoodle](animation/anidoodle.md) · [▶ demo](https://claude.ai/artifact/WaETkwggYuzWMWC8yk9EHp) | 993 | Ảnh tĩnh lặp lại được; phim 4 giây render trong 4,3 giây | ✅ Nhẹ, nhanh |

### Video
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Tech stack video YouTube bằng AI](video/youtube-ai-stacks.md) | — | Kiểm tra nhanh 18 repo (sao, giấy phép, ngày cập nhật); chưa cài thử | ⚠️ Nhiều repo được gọi "trending" nhưng rất nhỏ hoặc bỏ lâu |
| [MoneyPrinterTurbo](video/moneyprinterturbo.md) · [▶ ví dụ](examples/caphe-vietnam-shorts/) | 141.6k | Ra Shorts tiếng Việt 43,6 giây trong 2 phút 14 giây (hình tự làm, Edge TTS, phụ đề, nhạc) | ✅ Pipeline miễn phí chạy thật; ⚠️ Pexels tạm ngưng cấp key mới |
| [Freefield](video/freefield.md) · [▶ demo](https://claude.ai/artifact/Gq4szHmbhpdZrcSdT7GbGE) | 229 | ComfyUI CPU chấp nhận 122/122 workflow + 334/334 lab case; app smoke chạy thật | ✅ Rất chỉn chu, toàn bộ workflow hợp lệ; ⚠️ app thật cần GPU mạnh/Modal |
| [Recordly](video/recordly.md) · [▶ demo](https://claude.ai/artifact/Xq6vaMXuPw299JkPv17nGc) | 34.5k | 1.604 test đạt; mở được app Electron trên Linux | ✅ Lựa chọn miễn phí cho video demo; giấy phép AGPL kèm điều khoản ghi công |
| [Skillry (awesome-opus5-5-videos)](video/skillry-opus-videos.md) · [▶ demo](https://claude.ai/artifact/QAjKzMaye1tjEZVMq7tidm) | 8.8k | 703 prompt (29% không đầy đủ); làm theo 1 prompt bằng Remotion ra video 15 giây | ✅ Kho prompt tham khảo tốt; nên kết hợp với một skill có quy tắc rõ ràng |
| [OpenMontage](video/openmontage.md) · [▶ demo](https://claude.ai/artifact/SLcZu7ZYH9Q2Q1o7MJJpo1) | 69.5k | Setup 53 giây; demo 23 giây 1080p render trong 2 phút 6 giây | ✅ Demo không cần key chạy ngay |
| [lemo-opuscar](video/lemo-opuscar.md) | 3.1k | Pipeline lõi render được; demo có sẵn thiếu font | ⚠️ Không render lại được demo từ bản clone mới |
| [Seedance 2.0 Skill OS](video/seedance-2.0-skill.md) | 7.8k | Kiểm tra repo đạt 19/19; bộ sàng lọc kiểm duyệt bắt đúng từ khóa | ✅ Công cụ viết prompt nghiêm túc |

### Voice
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [VieNeu-TTS](voice/vieneu-tts.md) · [▶ demo](https://claude.ai/artifact/QovAghxN6vmvbz2iW2nu55) | 3.2k | 25 giọng Việt 3 miền, chạy CPU nhanh hơn thời gian thực; không sót chữ nhưng có chỗ ngắt sai, sai dấu | ✅ Offline, Apache-2.0; ⚠️ phải nghe lại trước khi dùng, ghim onnxruntime 1.22.1 |
| [edge-tts](voice/edge-tts.md) | 12.5k | 2 giọng Việt, mốc thời gian từng từ; cần chỉ định proxy | ✅ Nhanh, miễn phí; ⚠️ dịch vụ Microsoft dùng không chính thức |
| [Biên bản họp tiếng Việt](examples/vi-meeting-minutes/) | — | Hướng dẫn Meetily và WhisperX, cùng script `bien_ban.py` tự viết; WhisperX 3.8.6 cài được, script đã test với mock | ⚠️ Chưa chạy nhận dạng giọng nói thật (Hugging Face bị chặn) |

### Security
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Strix](security/strix.md) | 71.9k | Cài pip + CLI + định tuyến LLM chạy; sandbox Kali không dựng được ở đây | ⚠️ Chưa kiểm được chất lượng; telemetry bật mặc định; chỉ quét hệ thống được phép |
| [Codex Security](security/codex-security.md) | 11.2k | Cài 17 giây; `--dry-run` chạy; mặc định gpt-5.6-sol mức xhigh | ✅ Đủ quy trình quét–vá–SARIF; ⚠️ cần tài khoản OpenAI, dễ tốn tiền |
| [VoidAccess](security/voidaccess.md) | 925 | Chạy không Tor/LLM trong 30 giây; xuất STIX, Sigma | ⚠️ Gắn sai thực thể với độ tin cậy 93 rồi sinh rule Sigma; phải duyệt tay |
| [OpenShell](security/openshell.md) · [▶ demo](https://claude.ai/artifact/5nu9fdeUN787NRYPz8rDGF) | 17.8k | Sandbox lên trong 1 giây; chặn file/mạng, đổi policy khi đang chạy; prover bắt quyền POST và host mới | ✅ Cô lập đúng như mô tả; ⚠️ bản 0.1.x, image trên ghcr/nvcr |
| [REA](security/rea-reverse-engineer-anything.md) | 385.0k | Phân tích web app: 408k nút AST, 130 phát hiện trong 48 giây; 6.8.0 đọc đúng header GGUF/safetensors và hàm EVM | ✅ Kết quả có cấu trúc, tự nêu giới hạn |
| [PentAGI](security/pentagi.md) · [▶ demo](https://claude.ai/artifact/5iuTYvBvcbwh4YAXUZcJJU) | 31.1k | Web UI chạy bằng Docker sau khoảng 10 giây | ⚠️ Có nút bỏ qua việc đổi mật khẩu mặc định; nên đổi ngay |

### Game
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [pixelfx](game/pixelfx.md) · [▶ demo](https://claude.ai/artifact/EM7uifwYmXvKWgSY4GK8a2) | 4.2k | 244/244 hiệu ứng qua check; tự viết thêm 1 hiệu ứng, check bắt đúng lỗi | ✅ Đẹp, gọn, công cụ kiểm tra tốt |
| [Claude Code Game Studios](game/claude-code-game-studios.md) | 26.8k | 49 agent, 74 skill; cả 14 hook đều qua `bash -n` | ✅ Template chặt chẽ; nên dùng mức `minimal` |
| [Scenario Agent Skills](game/scenario-skills.md) | 1.1k | Cài được 149 skill | ⚠️ Phần tạo asset là dịch vụ trả phí |

### Agents
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Grok Build](agents/grok-build.md) | 27.5k | Binary Rust; headless ra JSON; `--yolo` thực thi tạo file, mặc định chặn chờ duyệt | ✅ Gọn, an toàn mặc định; ⚠️ build from source tải công cụ lúc build |
| [ThinkRail](agents/thinkrail.md) | 2.0k | Cài 2,7 giây; mỗi agent một git worktree riêng, thay đổi không đụng checkout chính | ✅ Ý tưởng worktree chạy đúng; ⚠️ công tắc chia sẻ dữ liệu bật sẵn |
| [Claude SEO](agents/claude-seo.md) | 21.2k | 1.068/1.074 test đạt (6 lỗi do mạng test); phân tích HTML và kiểm schema đúng | ✅ Chạy trên máy, nhiều script độc lập; ⚠️ nhiều tính năng cần API key |
| [Pi](agents/pi.md) | 117.8k | Chỉ 4 tool, prompt khoảng 3k ký tự; gọi bash qua mock | ✅ Gọn và rẻ nhất; ⚠️ treo nếu không đóng stdin |
| [Qwen Code](agents/qwen-code.md) | 28.7k | Gọi shell qua mock trong 4,5 giây; prompt khoảng 36k ký tự | ✅ Giống Claude Code, đa nhà cung cấp; ⚠️ thống kê sử dụng bật mặc định |
| [Harness²](agents/harness2.md) | 19.7k | Demo không cần key: 2 tác vụ, 28 lần thực thi, 2,3 giây | ✅ Hợp nghiên cứu; ⚠️ chạy thật cần Vertex AI |
| [Hermes Agent](agents/hermes-agent.md) | 256.3k | Cài bằng uv (Python 3.14); agent gọi tool `terminal` qua mock LLM | ✅ Chạy đúng; ⚠️ ~12k token system prompt + schema tool mỗi lượt |
| [OpenClaw](agents/openclaw.md) | 392.7k | Gateway chạy trên 127.0.0.1:18789 có token, Control UI HTTP 200 | ✅ Mặc định an toàn; cần Node 24+ |
| [Cua](agents/cua.md) | 30.5k | SDK 0.6.0 cài được; điều khiển máy cần `cua-spacesd` (giấy phép FSL, gắn tài khoản cua.ai) | ⚠️ Telemetry bật mặc định; nên chạy trong sandbox |
| [The Agency](agents/agency-agents.md) | 161.2k | 18 phòng ban, 282 agent; cài thử 65 agent engineering | ✅ Chỉ nên cài phòng ban cần dùng |
| [Agent Reach](agents/agent-reach.md) | 99.1k | `doctor`: 2/16 kênh dùng được; đọc web đi qua Jina Reader | ⚠️ Các kênh dùng cookie có nguy cơ bị khóa tài khoản |
| [OpenWorker](agents/openworker.md) | 18.6k | Server chạy; API yêu cầu token; có 5 agent, 23 nhà cung cấp model, 40 connector | ✅ Đáng thử; vẫn đang beta |

### Learning
| Ghi chú | ⭐ | Đã kiểm tra | Kết luận nhanh |
|---|--:|---|---|
| [Claude How-To](learning/claude-howto.md) | 41.9k | 10 module, 76 trang tiếng Việt, 91 template | ✅ Onboarding tốt |

### Dev environment
| Ghi chú | ⭐ | Đã kiểm tra | Kết luận nhanh |
|---|--:|---|---|
| [Open Code Review](dev-env/open-code-review.md) | 48.1k | Review repo mẫu: 2 comment gắn đúng dòng; JSON cho CI | ✅ Pipeline chặt chẽ; ⚠️ F1 ~25% theo benchmark của chính họ |
| [agent-usage-guard](dev-env/agent-usage-guard.md) | 45 | `plugin validate --strict` đạt, 101/101 test | ✅ Chặn fan-out, ngữ cảnh lớn, vòng lặp lỗi; repo nhỏ |
| [Sphinx](dev-env/sphinx.md) · [▶ demo](https://claude.ai/artifact/Rz11HWWZJguQhvcBrPgqGT) | 291 | 740/740 test đạt; hook chặn push lên main | ✅ Đúng như mô tả; ⚠️ áp dụng mọi repo, gửi code tới nhà cung cấp model |
| [Omarchy](dev-env/omarchy.md) | 45.1k | Phân tích tĩnh: 14 lệnh agent, 51 trang manual | ⚠️ Phải cài lại hệ điều hành; nên thử trên máy ảo |

### LLM
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [colibri](llm/colibri.md) | 43.9k | Build bằng gcc trong 6 giây; kiểm tra model MoE tí hon đạt hết | ✅ Chạy MoE khổng lồ không cần GPU lớn; ⚠️ model lớn dưới 2 tok/s |
| [DeepInfer](llm/deepinfer.md) | 18.2k | ⛔ Cần GPU NVIDIA SM100 hoặc Ascend 950 | ⛔ Chỉ cho DeepSeek-V4.1-Flash, chưa đủ để dựng dịch vụ online |
| [AirLLM](llm/airllm.md) | 39.4k | Chạy từng layer trên model nhỏ cho logit khớp 100% với model đầy đủ; 44/45 test đạt | ✅ Cơ chế đúng; ⚠️ chậm vì phụ thuộc SSD, không hợp để chat |

### Prompts
| Ghi chú | ⭐ | Đã đánh giá | Kết luận nhanh |
|---|--:|---|---|
| [7 prompt Claude xây kênh YouTube](prompts/claude-youtube-7-prompts.md) | — | Đọc từng prompt, đối chiếu ngưỡng kiếm tiền YouTube | ⚠️ Khung brainstorm tốt; prompt 2 và 6 dễ sai nếu không có dữ liệu thật |

## Quy ước

- **Vị trí file:** mỗi công cụ một file `.md`, đặt trong thư mục chủ đề phù hợp nhất.
- **Phần đầu mỗi ghi chú:** link repo, giấy phép, số sao/fork lấy qua GitHub API (kèm ngày), ngày test.
- **Chỉ ghi dữ liệu kiểm chứng được:** kết quả tự chạy, nội dung trong repo và tài liệu chính thức. Bước nào không chạy được thì ghi rõ lý do.
