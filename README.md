# AI Collections

Ghi chú về các công cụ và repo AI. Mọi nội dung đều từ dữ liệu tự kiểm chứng:
- số sao lấy qua GitHub API;
- thông tin lấy từ chính repo và tài liệu chính thức;
- kết quả **tự cài đặt và chạy thử**.

Mỗi ghi chú gồm: **Là gì**, **Đã test** (từng bước kèm số đo), **Kết luận nhanh**, **Cài đặt**, **Lưu ý**.

## Môi trường test (2026-10-19)

Ví dụ [Local Wan 2.2 Studio](video/local-wan22-studio.md) được bổ sung ngày 21/10/2026, kiểm tra trên Windows với GPU riêng; xem môi trường và giới hạn trong ghi chú đó. Các số đo Linux bên dưới áp dụng cho bộ ghi chú ban đầu.

- **Máy:** container Linux x86_64, 4 vCPU, 15 GB RAM, **không có GPU**.
- **Phần mềm:** Node 22.22, Python 3.13, uv 0.11, ffmpeg 6.1, Docker 29.8, Chromium 1194 (Playwright). Từ 23/10/2026 dùng thêm Go 1.24 (tự tải toolchain mới hơn khi repo yêu cầu), Rust 1.95–1.97 và Claude Code 2.1.309.
- **Mạng ra ngoài bị giới hạn:** chặn Hugging Face, index PyTorch, quay.io, ghcr.io, nvcr.io, các kho ảnh mở và một số API.
  Bước nào cần các nguồn này được ghi là ⛔ không test được.

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
| [`mcp/`](mcp/) | MCP server kết nối agent với dịch vụ ngoài |
| [`database/`](database/) | Cơ sở dữ liệu, cache, vector store |

Bản ghi có **▶ demo** là có trang kết quả chạy thật (ảnh, video hoặc demo tương tác) để xem trực tiếp. Các trang demo đang để riêng tư, chỉ chủ tài khoản mở được.

Ký hiệu: ✅ chạy tốt · ⚠️ chạy được nhưng có điểm cần lưu ý · ❌ lỗi · ⛔ không test được trong môi trường này.

## Danh mục

### Design
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Impeccable](design/impeccable.md) · [▶ demo](https://claude.ai/artifact/FE4i9ujwmdHvhqHghRFcfZ) | 82.7k | Detector bắt 9 lỗi trên trang mẫu trong < 1 giây | ✅ Hợp để review UI; luật mang quan điểm riêng; telemetry bật mặc định |
| [Taste Skill](design/taste-skill.md) · [▶ demo](https://claude.ai/artifact/8JGjviJjzz7ohMMpa5b6Ag) | 98.9k | `draw` ra hướng thiết kế; `inspect` chụp 3 độ rộng, chấm 8 FAIL / 4 WARN | ✅ Hợp với landing page mới; khắt khe hơn Impeccable |
| [SolidCraft](design/solidcraft.md) · [▶ demo](https://claude.ai/artifact/9Qdiw94WeTHVmcphix9PXr) | — | Xuất STEP AP242 trong 0,49 giây; MCP có 17 tool, giới hạn đường dẫn file | ✅ CAD tham số cho agent; build từ source mất 13 phút |
| [Figwright](design/figwright.md) | 1.1k | MCP server 0.6.0 khởi động, liệt kê 117 tool | ✅ Server chạy ngay; plugin Figma chưa test |

### Web
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Crawl4AI](web/crawl4ai.md) · [▶ demo](https://claude.ai/artifact/TYfdt6Pr4h19iJ7asTcrBX) | 86.0k | Crawl trang có JS trong 0,61 giây; bảng ra Markdown đúng | ✅ Ổn định; bộ lọc còn để lọt quảng cáo |
| [Pretext](web/pretext.md) · [▶ demo](https://claude.ai/artifact/HGYKd3syxPbvYFCJnG9qXz) | 50.8k | Khớp DOM ở 60/61 độ rộng với văn bản tiếng Việt; nhanh hơn DOM khoảng 11,5 lần | ✅ Chính xác và nhanh |
| [Jev Ultrafast](web/jev-ultrafast.md) | 23.2k | 31/31 unit test đạt | ⚠️ Phần ra quyết định khóa vào API trả phí |

### Animation
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [15 repo motion](animation/claude-motion-studio-15-repos.md) · [▶ demo](https://claude.ai/artifact/EPPqkjHvhpKRGWh7763ymW) | — | HyperFrames render phim 5 giây trong 10,5 giây; đếm skill thực tế của 9 repo | ✅ Nên bắt đầu với HyperFrames + gsap-skills |
| [iArt motion skills](animation/iart-motion-skills.md) | 955 | 18 gói, 55 skill; cài thử 4 gói, số skill khớp README | ✅ Chia gói rõ ràng, MIT |
| [anidoodle](animation/anidoodle.md) · [▶ demo](https://claude.ai/artifact/WaETkwggYuzWMWC8yk9EHp) | 993 | Ảnh tĩnh lặp lại được; phim 4 giây render trong 4,3 giây | ✅ Nhẹ, nhanh |
| [huashu-art-motion](animation/huashu-art-motion.md) · [▶ demo](https://claude.ai/artifact/1Xq7MWxqVgm4hX9owAUKCo) | 4.4k | Biểu đồ tài chính 7 giây 1080p render trong 9,3 giây | ✅ Mẫu biểu đồ tài chính dùng được ngay |
| [Mesh2Motion](animation/mesh2motion.md) · [▶ demo](https://claude.ai/artifact/53Sh3dNsvRNkWpSyWkq76F) | 3.5k | Build 10 giây, chạy không lỗi, có 251 clip CC0 | ✅ Thay thế Mixamo tốt |

### Video
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [vox-director](video/vox-director.md) · [▶ demo](https://claude.ai/artifact/WGCtf6iFXo2Uyy3R6vxrde) | 2.4k | Ghép offline ra MP4 15 giây; phần AI cần Atlas Cloud | ⚠️ Phụ thuộc Atlas Cloud, watermark mặc định; lỗi font phụ đề trên Linux |
| [Local Wan 2.2 Studio](video/local-wan22-studio.md) | — | Clip Wan local, giọng Việt CPU; kèm code, kiểm tra đóng gói và 10 kịch bản | ✅ Có pipeline vận hành; ⚠️ phim dài đang render, 1080p nâng từ 480p |
| [LocalMiniDrama](video/localminidrama.md) · [▶ demo](https://claude.ai/artifact/MFF19DzKxWSiRovS9D6Qfq) | 2.2k | Chạy từ source trên Linux; tạo kịch bản 2 tập qua model giả lập | ⚠️ Mặc định cài qua mirror với SSL tắt, server mở ra LAN; cần API key để làm ảnh và video |
| [Recordly](video/recordly.md) · [▶ demo](https://claude.ai/artifact/Xq6vaMXuPw299JkPv17nGc) | 34.5k | 1.604 test đạt; mở được app Electron trên Linux | ✅ Lựa chọn miễn phí cho video demo; giấy phép AGPL kèm điều khoản ghi công |
| [Skillry (awesome-opus5-5-videos)](video/skillry-opus-videos.md) · [▶ demo](https://claude.ai/artifact/QAjKzMaye1tjEZVMq7tidm) | 8.8k | 703 prompt (29% không đầy đủ); làm theo 1 prompt bằng Remotion ra video 15 giây | ✅ Kho prompt tham khảo tốt; nên kết hợp với một skill có quy tắc rõ ràng |
| [ghost-editor](video/ghost-editor.md) | 75 | Test đồng bộ hình–tiếng và giải mã màu đạt; 1 test cutout lỗi trên Linux | ⚠️ Cần Mac, Claude Code trả phí, key Gemini |
| [OpenMontage](video/openmontage.md) · [▶ demo](https://claude.ai/artifact/SLcZu7ZYH9Q2Q1o7MJJpo1) | 69.5k | Setup 53 giây; demo 23 giây 1080p render trong 2 phút 6 giây | ✅ Demo không cần key chạy ngay |
| [lemo-opuscar](video/lemo-opuscar.md) | 3.1k | Pipeline lõi render được; demo có sẵn thiếu font | ⚠️ Không render lại được demo từ bản clone mới |
| [Seedance 2.0 Skill OS](video/seedance-2.0-skill.md) | 7.8k | Kiểm tra repo đạt 19/19; bộ sàng lọc kiểm duyệt bắt đúng từ khóa | ✅ Công cụ viết prompt nghiêm túc |
| [T3-Video](video/t3-video.md) | — (HF) | ⛔ Cần GPU khoảng 60 GB | ⛔ Không chạy được trên máy thường |
| [Gemini Agentic Video](video/gemini-agentic-video.md) | — | ⛔ Cần API key | Chỉ có số liệu Google tự công bố |

### Voice
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [VoiceStudio](voice/voicestudio.md) | 75.6k | ❌ Cài thất bại (không tải được PyTorch, Hugging Face bị chặn) | ⚠️ Model mặc định CC-BY-NC, không dùng thương mại được |

### Security
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [OpenShell](security/openshell.md) · [▶ demo](https://claude.ai/artifact/5nu9fdeUN787NRYPz8rDGF) | 17.8k | Sandbox lên trong 1 giây; chặn file/mạng, đổi policy khi đang chạy; prover bắt quyền POST và host mới | ✅ Cô lập đúng như mô tả; ⚠️ bản 0.1.x, image trên ghcr/nvcr |
| [REA](security/rea-reverse-engineer-anything.md) | 323.5k | Phân tích một web app: 408k nút AST, 130 phát hiện trong 48 giây | ✅ Kết quả có cấu trúc, tự nêu giới hạn |
| [PentAGI](security/pentagi.md) · [▶ demo](https://claude.ai/artifact/5iuTYvBvcbwh4YAXUZcJJU) | 31.1k | Web UI chạy bằng Docker sau khoảng 10 giây | ⚠️ Có nút bỏ qua việc đổi mật khẩu mặc định; nên đổi ngay |

### Game
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [Claude Code Game Studios](game/claude-code-game-studios.md) | 26.8k | 49 agent, 74 skill; cả 14 hook đều qua `bash -n` | ✅ Template chặt chẽ; nên dùng mức `minimal` |
| [Scenario Agent Skills](game/scenario-skills.md) | 1.1k | Cài được 149 skill | ⚠️ Phần tạo asset là dịch vụ trả phí |

### Agents
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
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
| [OpenAI CLI](llm/openai-cli.md) | 1.1k | Build Go; responses, `--transform`, stdin, exit code đúng với mock server | ✅ CLI chính thức, hợp script/CI |
| [respan-gateway](llm/respan-gateway.md) · [▶ demo](https://claude.ai/artifact/4Ys9gHL13EWEpccbwj5cuH) | 126 | Failover và chuyển đổi Anthropic → OpenAI đúng; thêm 0,6 ms; RAM 16,6 MB | ✅ Nhẹ, nhanh; mặc định không có xác thực |
| [DeepInfer](llm/deepinfer.md) | 18.2k | ⛔ Cần GPU NVIDIA SM100 hoặc Ascend 950 | ⛔ Chỉ cho DeepSeek-V4.1-Flash, chưa đủ để dựng dịch vụ online |
| [TorchTPU](llm/torch-tpu.md) | 588 | Cài và import được; không có TPU để chạy | ⛔ Chỉ dùng trên Cloud TPU |
| [AirLLM](llm/airllm.md) | 39.4k | Chạy từng layer trên model nhỏ cho logit khớp 100% với model đầy đủ; 44/45 test đạt | ✅ Cơ chế đúng; ⚠️ chậm vì phụ thuộc SSD, không hợp để chat |

### Prompts
| Ghi chú | ⭐ | Đã đánh giá | Kết luận nhanh |
|---|--:|---|---|
| [7 prompt Claude xây kênh YouTube](prompts/claude-youtube-7-prompts.md) | — | Đọc từng prompt, đối chiếu ngưỡng kiếm tiền YouTube | ⚠️ Khung brainstorm tốt; prompt 2 và 6 dễ sai nếu không có dữ liệu thật |

### MCP
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [whatsapp-mcp](mcp/whatsapp-mcp.md) | 314 | Typecheck sạch, 25 test đạt | ⚠️ Dùng Baileys, trái điều khoản WhatsApp; cần Cloudflare Workers Paid |

### Database
| Ghi chú | ⭐ | Đã test | Kết luận nhanh |
|---|--:|---|---|
| [KiviDB](database/kividb.md) | 352 | Tương thích Redis; KNN recall@5 = 1,0; throughput cao hơn Redis 20–35% | ⚠️ Độ trễ đuôi kém hơn Redis; repo mới 5 ngày, giấy phép AGPL |

## Quy ước

- **Vị trí file:** mỗi công cụ một file `.md`, đặt trong thư mục chủ đề phù hợp nhất.
- **Phần đầu mỗi ghi chú:** link repo, giấy phép, số sao/fork lấy qua GitHub API (kèm ngày), ngày test.
- **Chỉ ghi dữ liệu kiểm chứng được:** kết quả tự chạy, nội dung trong repo và tài liệu chính thức. Bước nào không chạy được thì ghi rõ lý do.
