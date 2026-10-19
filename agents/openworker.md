# OpenWorker: AI coworker chạy trên máy của Andrew Ng

> Nguồn: ảnh chụp do người dùng cung cấp ("openworker"). Repo: https://github.com/andrewyng/openworker
> Trang chủ: https://openworker.com. Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

OpenWorker là **app desktop** (macOS Apple Silicon, Windows 10/11) do nhóm Andrew Ng làm.
Định vị: một "đồng nghiệp AI" giao **việc đã làm xong**, không chỉ trò chuyện.

- **Giấy phép:** MIT. Đang ở **open beta** và tự cập nhật.
- **Mức độ phổ biến:** khoảng 18.6k sao (theo kết quả tìm kiếm).
- **Engine:** xây trên [aisuite](https://github.com/andrewyng/aisuite), thư viện Python cung cấp API thống nhất cho nhiều nhà cung cấp LLM, kèm lớp agent (tool, MCP).
  Server agent chạy cục bộ bằng FastAPI. Giao diện viết bằng React/Tauri.

## Tính năng chính

- **Không khóa vào model nào:**
  - Tự mang API key: OpenAI, Anthropic, Gemini, DeepSeek, Kimi, Qwen, GLM, MiniMax, Mistral, Grok…
  - Model open-weight qua Together hoặc Fireworks.
  - Chạy **hoàn toàn local** bằng Ollama.
- **Hơn 25 tích hợp:** GitHub, Slack, Jira, Notion, Linear, HubSpot, Outlook, Gmail, Google Calendar… cùng terminal, file local và bất kỳ MCP nào.
- **Ví dụ use case:** review bảo mật codebase. Kết quả lấy từ công cụ quét tất định (semgrep) cộng với suy luận của model,
  và bản sửa được quét lại trước khi đưa người dùng duyệt.
- **Quản trị nằm trong kiến trúc:**
  - Mọi hành động được phân loại rủi ro (đọc, ghi file local, chạy lệnh, gọi ra ngoài) và được ghi log.
  - Agent không tự cấp thêm quyền cho mình được.
  - Lệnh có thể chạy trong sandbox: **NVIDIA OpenShell** (mỗi agent một container Linux, không chứa key, mạng theo danh sách cho phép),
    sandbox có sẵn của macOS, hoặc một tài khoản ẩn trên Windows.

## Cài đặt

- **Dùng ngay:** tải bản cài từ openworker.com (bản Mac đã ký và notarize). Mở app, thêm API key hoặc trỏ tới Ollama.
- **Từ source:**
  1. Chạy script bootstrap trong `packaging/` để tạo venv Python.
  2. Chạy server `coworker.server.run`.
  3. Chạy giao diện trong `surfaces/gui/` bằng `npm install` rồi khởi động dev.

## Nhận xét

- **Khác Claude Code / Codex:** đối tượng là **người dùng văn phòng nói chung**, có GUI và connector cho công cụ doanh nghiệp, chứ không chỉ cho dev.
  Gần với Claude Cowork hay các "AI coworker" thương mại, nhưng mã nguồn mở và chọn được model.
- **Điểm mạnh:** thiết kế bảo mật nghiêm túc (sandbox, phân quyền, log). Rất đáng chú ý khi agent có quyền vào Gmail, Slack…
- **Lưu ý:**
  - Vẫn đang beta.
  - Chưa có bản Linux và Mac Intel (ngoài cách tự build từ source).
  - Chi phí phụ thuộc model bạn chọn.
  - Model ngoài danh sách đã kiểm chứng có thể gọi tool kém.
- **Đừng nhầm với** `langchain-ai/openwork`, một app desktop khác dành cho deepagentsjs.
