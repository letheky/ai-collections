# AI Collections

Ghi chú nghiên cứu về các công cụ, repo và tin tức AI lan truyền trên mạng xã hội (Facebook Reels, X…).

Mỗi ghi chú trả lời ba câu hỏi:
- **Nó là gì?**
- **Bài đăng nói có đúng không?** (bảng kiểm chứng ✅ / ⚠️ / ❌)
- **Có nên dùng không, và cần lưu ý gì?** (giấy phép, phần cứng, chi phí, rủi ro)

## Cấu trúc

| Thư mục | Chủ đề |
|---|---|
| [`design/`](design/) | Thiết kế UI, Figma ↔ code |
| [`web/`](web/) | Frontend, browser agent |
| [`animation/`](animation/) | Hoạt hình và motion graphics bằng code, hoạt hình 3D |
| [`video/`](video/) | Sản xuất video bằng agent, model tạo video, AI hiểu video |
| [`voice/`](voice/) | TTS, clone giọng, lồng tiếng |
| [`security/`](security/) | Pentest, dịch ngược |
| [`game/`](game/) | Làm game bằng agent, art game |
| [`agents/`](agents/) | Agent đa năng, AI coworker, bộ agent và công cụ cho agent |
| [`learning/`](learning/) | Tài liệu học Claude Code / agent |
| [`dev-env/`](dev-env/) | Môi trường làm việc, hệ điều hành cho dev |

## Danh mục

### Design
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [Impeccable](design/impeccable.md) | 82.7k | Skill thiết kế: 24 lệnh (`polish`, `audit`, `critique`…) và 61 luật bắt "UI kiểu AI" chạy không cần LLM | ✅ Rất hợp để review và mài giũa UI có sẵn |
| [Taste Skill](design/taste-skill.md) | 98.9k | Cho agent "gu" thiết kế: rút ngẫu nhiên hướng thiết kế, dùng ảnh thật, tự kiểm tra trên trình duyệt | ✅ Hợp với landing page mới; mỗi lần build tốn 30–45 phút và vài trăm nghìn token |
| [Figwright](design/figwright.md) | 1.1k | MCP hai chiều Figma ↔ coding agent, dùng được với tài khoản Figma miễn phí | ✅ Đáng thử. Bản chính thức của Figma ở gói free chỉ có 6 lượt/tháng, không phải 20 như bài đăng nói |

### Web
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [Pretext](web/pretext.md) | 50.8k | Thư viện đo và dàn trang chữ không cần DOM (Cheng Lou) | ⚠️ Không phải thư viện animation, chỉ là mảnh ghép cho hiệu ứng chữ |
| [Jev Ultrafast](web/jev-ultrafast.md) | 23.2k | Browser agent đọc DOM thay vì chụp màn hình (browser-use) | ⚠️ Bản MVP, phải dùng API trả phí, con số "7 giây" chỉ đến từ một lần chạy |

### Animation
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [15 repo Claude Motion Studio](animation/claude-motion-studio-15-repos.md) | — | Danh sách đầy đủ owner/repo của 15 skill và framework motion (HyperFrames, Remotion, GSAP…) | Nền tảng nên bắt đầu: HyperFrames + gsap-skills + motion-design-skill |
| [anidoodle](animation/anidoodle.md) | 993 | Tranh vẽ tay và phim quá trình vẽ từng nét, viết bằng code, 32 phong cách | ⚠️ Không cập nhật "tức thì" như bài đăng nói |
| [huashu-art-motion](animation/huashu-art-motion.md) | 4.4k | Skill vẽ 35–36 phong cách nghệ thuật thành hoạt hình | ❌ Không "biến ảnh tĩnh thành hoạt hình"; bài đăng dịch sai nhiều chỗ |
| [Mesh2Motion](animation/mesh2motion.md) | 3.5k | Bản thay thế Mixamo chạy trên web: gắn xương và animation cho model 3D | ✅ Animation theo CC0, nhưng chỉ nhận GLB/GLTF |

### Video
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [lemo-opuscar](video/lemo-opuscar.md) | 3.1k | Phim ngắn làm hoàn toàn bằng code, 51 phong cách, phim OPUSCAR 98 | ✅ Đúng, chỉ có số liệu sao/phong cách trong bài đã cũ |
| [OpenMontage](video/openmontage.md) | 69.5k | Xưởng phim AI điều khiển bằng agent (Remotion/HyperFrames + các provider AI) | ⚠️ "Video từ $0.02" không có trong README |
| [T3-Video](video/t3-video.md) | — (HF) | Tạo video 4K gốc từ Wan2.1-1.3B bằng attention cửa sổ | ❌ Không phải mới ra, không thấy demo; cần khoảng 60 GB VRAM |
| [Seedance 2.0 Skill OS](video/seedance-2.0-skill.md) | 7.8k | Skill lên shot và viết prompt kiểu "đạo diễn" cho Seedance 2.0 | ✅ Hữu ích cho short drama; tác giả nói rõ chưa có số liệu chất lượng |
| [Gemini Agentic Video](video/gemini-agentic-video.md) | — (Google) | Gemini tự chọn đoạn video cần xem, giảm tới 88% token | ✅ Đúng phần lớn; ý "bắt lỗi trong bản ghi màn hình" không có trong tài liệu chính thức |

### Voice
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [VoiceStudio](voice/voicestudio.md) | 75.6k | App TTS, clone giọng, lồng tiếng chạy offline, hỗ trợ tiếng Việt | ⚠️ Dùng cá nhân được. Model mặc định là CC-BY-NC nên **không dùng thương mại được** |

### Security
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [PentAGI](security/pentagi.md) | 31.1k | Nền tảng multi-agent tự động hóa pentest | ✅ Đáng thử; cập nhật lên bản ≥ 2.2.0 (đã vá CVE-2026-14784) |
| [REA](security/rea-reverse-engineer-anything.md) | 323.5k | MCP dịch ngược app cho agent, kèm phân tích vụ "hack TradingView" | ⚠️ Công cụ có thật (323k sao); vụ TradingView chưa có bằng chứng và là vi phạm |

### Game
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [Scenario Agent Skills](game/scenario-skills.md) | 1.1k | Khoảng 75 skill tạo asset game (sprite, 3D, texture, skybox, video, audio) qua Scenario MCP, cùng expert tools cho Blender/Unity/Godot | ⚠️ Skill MIT nhưng việc tạo asset tính phí trên Scenario |
| [Claude Code Game Studios](game/claude-code-game-studios.md) | 26.8k | Template biến Claude Code thành studio game: 49 agent, 74 skill, hỗ trợ Godot/Unity/Unreal | ✅ Đáng thử, nên bắt đầu ở mức `minimal` (chính README cho thấy nhiều tài liệu hơn không làm game hay hơn) |

### Agents
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [The Agency](agents/agency-agents.md) | 161.2k | Hơn 230 persona agent chuyên môn chia theo phòng ban (engineering, marketing, sales…) | ✅ Hữu ích; chỉ cài phòng ban cần dùng |
| [Agent Reach](agents/agent-reach.md) | 99.1k | Cho agent đọc và tìm kiếm web, YouTube, X, Reddit, Bilibili, Xiaohongshu… | ⚠️ Dùng cookie nên có nguy cơ bị khóa tài khoản; chỉ dùng tài khoản phụ |
| [OpenWorker](agents/openworker.md) | 18.6k | App "AI coworker" chạy trên máy của Andrew Ng: chọn được model hoặc dùng Ollama, hơn 25 connector, có sandbox | ✅ Đáng thử, thiết kế bảo mật tốt; vẫn đang beta |

### Learning
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [Claude How-To](learning/claude-howto.md) | 41.9k | Lộ trình 10 module học Claude Code, có bản tiếng Việt | ✅ Rất hợp để onboarding; "90% sức mạnh chưa dùng" là câu marketing |

### Dev environment
| Ghi chú | ⭐ | Tóm tắt | Kết luận nhanh |
|---|--:|---|---|
| [Omarchy](dev-env/omarchy.md) | 45.1k | Bản Linux của DHH, có sẵn lệnh khởi chạy cho khoảng 14 coding agent | ⚠️ Rất "opinionated", phải cài lại cả hệ điều hành; nên thử trên máy ảo hoặc dual boot trước |

## Quy ước

- **Vị trí file:** mỗi công cụ một file `.md`, đặt trong thư mục chủ đề phù hợp nhất.
- **Phần đầu mỗi ghi chú:** nguồn bài đăng, link repo, ngày nghiên cứu.
- **Số liệu thay đổi nhanh** (sao, phiên bản) được ghi kèm ngày lấy số. Cột ⭐ lấy từ GitHub API ngày 2026-10-19.
- **Nguồn không truy cập được trực tiếp** thì ghi rõ trong ghi chú.
