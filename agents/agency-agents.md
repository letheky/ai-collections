# The Agency (agency-agents)

> Repo: https://github.com/msitarzewski/agency-agents · MIT · App: https://agencyagents.app
>
> ⭐ **161.227 sao**, 26.088 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Thư viện persona (vai trò) cho subagent. Mỗi agent là một file Markdown có frontmatter (`name`, `description`, `color`) và phần mô tả vai trò, quy trình làm việc.
Có script cài vào Claude Code, Cursor, Codex, Gemini CLI, Copilot, OpenCode, Aider, Windsurf… và có app desktop.

## Đã test

| Bước | Kết quả |
|---|---|
| `./scripts/install.sh --list teams` | ✅ **18 phòng ban, tổng 282 agent**: engineering 65, specialized 59, marketing 37, game-development 21, gis 13, security 12, design 10, sales 9, testing 9… |
| `install.sh --tool claude-code --division engineering` (vào một HOME tạm) | ✅ Cài **65 file subagent** vào `~/.claude/agents/` |
| Nội dung một agent | Toàn văn bản mô tả vai trò, không có code chạy hay ràng buộc (hook) nào |

## Kết luận nhanh

✅ Cài nhanh, chọn được theo phòng ban. Bản chất là bộ prompt nên chất lượng phụ thuộc model và cách bạn giao việc.
**Chỉ cài phòng ban cần dùng**: 282 agent làm agent khó chọn đúng và tốn context.
README cũng ghi OpenCode chỉ nhận khoảng 119 agent.

## Cài đặt

```bash
git clone https://github.com/msitarzewski/agency-agents && cd agency-agents
./scripts/install.sh --tool claude-code --division engineering,security
./scripts/install.sh --tool cursor --agent frontend-developer,ui-designer
```
