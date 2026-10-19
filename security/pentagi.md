# PentAGI: nền tảng multi-agent tự động hóa pentest

> Nguồn: bài giới thiệu do người dùng cung cấp. Repo: https://github.com/vxcontrol/pentagi
> Ngày nghiên cứu: 2026-10-19. Phiên bản mới nhất lúc nghiên cứu: v2.2.0 (05/10).

## Tóm tắt

- **Tác giả:** VXControl, công ty bảo mật đặt trụ sở ở Dubai.
- **Giấy phép:** MIT.
- **Mức độ phổ biến:** khoảng 31.1k sao, 4.9k fork, 952 commit.
- **Công nghệ:** backend Go, frontend React/TypeScript. Dữ liệu lưu trong PostgreSQL + pgvector. Có hàng đợi tác vụ bất đồng bộ.
- **Các agent:**
  - Nhóm chính: Orchestrator, Researcher, Developer, Executor.
  - Vai trò phụ: adviser (giám sát/mentor, kiêm lập kế hoạch), reflector (cứu agent bị kẹt), searcher, enricher, memorist, installer, pentester, reporter…

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| Hơn 20 công cụ (Nmap, Metasploit, sqlmap) chạy trong Docker sandbox | ✅ Đúng | Image mặc định là `vxcontrol/kali-linux`. README không liệt kê đầy đủ danh sách công cụ. |
| Bộ nhớ dùng PostgreSQL + pgvector, có thể thêm Neo4j + Graphiti | ✅ Đúng | Graphiti đang ở bản **beta, mặc định tắt**, và API HTTP của nó không có xác thực. |
| Hỗ trợ OpenAI, Anthropic, Gemini, Ollama | ✅ Đúng, còn thiếu | Còn có Bedrock, DeepSeek, GLM, Kimi, Qwen, MiniMax, Mistral, xAI; endpoint tương thích OpenAI (vLLM, LiteLLM, OpenRouter, Azure); có provider dự phòng. |
| Web UI, REST, GraphQL | ✅ Đúng | Có thêm Swagger. Token API có hạn từ 1 phút đến 3 năm. Cổng mặc định 8443. |
| Tự host bằng Docker Compose | ✅ Đúng | Có trình cài đặt tương tác cho Linux, Windows, macOS. Tối thiểu 2 vCPU, 4 GB RAM, 20 GB ổ đĩa. |
| Chưa phải Red Team tự chủ hoàn toàn | ⚠️ Gần đúng | Phần mô tả repo tự gọi là "Fully autonomous", và có chế độ chạy tự động từ đầu đến cuối. Nhưng README nói rõ đây **không** phải sản phẩm giả lập đối thủ với chiến dịch định sẵn. |
| Không thay thế BAS như CALDERA | ✅ Đúng | README nói thẳng điều này. |

## Phần bài viết chưa nhắc

- **Quan sát hệ thống:** có Langfuse để theo dõi LLM; OpenTelemetry + Grafana + VictoriaMetrics + Jaeger + Loki.
- **Tìm kiếm:** DuckDuckGo, Google CSE, Tavily, Firecrawl, Traversaal, Perplexity, Sploitus, SearXNG.
- **Báo cáo:** xem trên web, xuất Markdown hoặc PDF.
- **Đánh giá chất lượng:** chỉ có số liệu tự công bố. Ví dụ: chế độ giám sát + lập kế hoạch "tăng chất lượng 2×" khi thử với Qwen3.5-27B, nhưng không nêu phương pháp đo. Chưa có benchmark độc lập.
- **Chạy model local cần GPU lớn:** ví dụ Qwen3.5-27B-FP8 chạy trên 4× RTX 5090; QwQ 32B FP16 cần khoảng 71 GB VRAM.

## ⚠️ Lưu ý vận hành và bảo mật

- **Lỗ hổng CVE-2026-14784** (ảnh hưởng các bản đến 2.1.0): khi bật `DOCKER_INSIDE=true`, sandbox bị lộ Docker socket của máy chủ. Đã sửa trong 2.2.0, nên **cập nhật lên ≥ 2.2.0**.
- **Mật khẩu mặc định:** tài khoản admin mặc định là `admin@pentagi.com` / `admin`. Phải đổi ngay.
- **Cổng sandbox lộ ra ngoài:** dải cổng 28000–29999 được mở trên 0.0.0.0, và Docker bỏ qua ufw. Cần chặn bằng firewall ở tầng khác.
- **Proxy không phủ hết:** `PROXY_URL` không áp dụng cho sandbox, scraper, Graphiti.
- **Môi trường production:** README khuyên tách worker node riêng.
- **Model tự host:** parser tool-call của vLLM, llama.cpp, SGLang có thể làm hỏng flow.
- **Phạm vi pháp lý:** chỉ kiểm thử hệ thống của mình hoặc được ủy quyền bằng văn bản (xem EULA.md).

## Kết luận

PentAGI là công cụ hỗ trợ pentest đáng thử cho pentester và nhà nghiên cứu bảo mật. Nó tự động hóa tốt khâu trinh sát, chạy tool và viết báo cáo.
Tuy vậy vẫn cần người cấu hình, giới hạn phạm vi và kiểm tra lại kết quả. Bài giới thiệu nhìn chung chính xác và khá thận trọng.
