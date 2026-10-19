# The Agency (agency-agents): hơn 230 "nhân sự" AI cho coding agent

> Nguồn: ảnh chụp do người dùng cung cấp ("msitarzewski/agency-agents, 134.7k sao, 22k fork, MIT").
> Repo: https://github.com/msitarzewski/agency-agents. Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

Đây là bộ sưu tập **hơn 230 định nghĩa agent chuyên môn**. Mỗi agent là một file Markdown mô tả vai trò, tính cách, quy trình làm việc và sản phẩm cần giao.
Dự án bắt nguồn từ một thread Reddit. Giấy phép **MIT**.

- **Mức độ phổ biến:** ảnh chụp ghi 134.7k sao, 22k fork. Chưa kiểm chứng trực tiếp.
- **Có các "division" (phòng ban):**
  - Kỹ thuật: Engineering, Design, Testing, Security, Spatial Computing, Game Development.
  - Kinh doanh: Paid Media, Sales, Marketing, Product, Project Management, Support, Finance.
  - Chuyên ngành: Academic, GIS, Healthcare, Research, và nhóm Specialized.
- **Có kịch bản phối hợp mẫu:** dựng MVP cho startup, chiến dịch marketing, phát triển tính năng cho doanh nghiệp.

## Cài đặt

- **App desktop** (macOS/Linux/Windows, tại agencyagents.app): duyệt danh sách agent và cài bằng một cú nhấp.
  Có thể cài qua Homebrew: `brew install --cask msitarzewski/agency-agents/agency-agents`.
- **Bằng script:**
  ```bash
  git clone https://github.com/msitarzewski/agency-agents && cd agency-agents
  ./scripts/install.sh --tool claude-code --division engineering,security   # chỉ cài theo phòng ban
  ./scripts/install.sh --tool cursor --agent frontend-developer,ui-designer   # chỉ cài từng agent
  ./scripts/install.sh --list teams
  ```
- **Công cụ hỗ trợ:** Claude Code, Cursor, Codex, Gemini CLI, Copilot, OpenCode, Aider, Windsurf, Kimi, Hermes… (`convert.sh` chuyển đổi định dạng cho từng công cụ).

## Kiểm chứng ảnh chụp

| Nhận định | Kết quả |
|---|---|
| "Đội ngũ AI agency hoàn chỉnh trong tầm tay" | ✅ Đúng với mô tả trong README. |
| MIT | ✅ Đúng. |
| 134.7k sao / 22k fork | ❓ Chưa kiểm chứng trực tiếp. |

## Nhận xét

- **Bản chất là thư viện prompt/persona**, không phải framework điều phối. Chất lượng đầu ra vẫn phụ thuộc model và cách bạn giao việc.
- **Đừng cài hết.** 230 agent làm rối việc chọn subagent và tốn context. Nên cài theo phòng ban hoặc từng agent cần dùng.
  README cũng cảnh báo OpenCode chỉ nhận khoảng 119 agent.
- **Lời quảng cáo:** câu "battle-tested, production-ready" là tự nhận, không có benchmark.
- **So với [Claude Code Game Studios](../game/claude-code-game-studios.md):** CCGS có phân cấp, quy trình và hook ràng buộc;
  The Agency rộng hơn về lĩnh vực nhưng lỏng hơn về phối hợp.
