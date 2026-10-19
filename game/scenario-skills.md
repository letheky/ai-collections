# Scenario Agent Skills

> Repo: https://github.com/scenario-labs/skills · MIT (riêng skill) · Dịch vụ: https://scenario.com
>
> ⭐ **1.052 sao**, 129 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Bộ Agent Skills chính thức của Scenario, dạy agent tạo asset qua **Scenario MCP server** (dịch vụ trả phí).
Asset tạo được: ảnh, sprite, texture PBR, skybox, model 3D, video, âm thanh, và model tự huấn luyện.
Ngoài ra có nhóm "expert tools" điều khiển ZBrush, Blender, Maya, Unreal, Unity, Godot đã cài trên máy; nhóm này **không cần** Scenario MCP.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx skills add scenario-labs/skills --agent claude-code -y` | ✅ Cài **149 skill** trong 5 giây (gồm cả expert tools) |
| Tạo asset qua Scenario MCP | ⛔ Không test (cần tài khoản Scenario trả phí) |
| Expert tools cho Blender, Godot… | ⛔ Không test (máy không cài các phần mềm này) |

## Kết luận nhanh

⚠️ Skill miễn phí, nhưng phần chính là cổng vào dịch vụ trả phí. Nên dùng dry-run pricing để xem giá trước khi tạo.
Không nên cài toàn bộ 149 skill cùng lúc, vì quá nhiều skill làm agent khó chọn đúng.

## Cài đặt

```bash
npx skills add scenario-labs/skills                     # chọn skill từ menu
claude mcp add --transport http scenario https://mcp.scenario.com/mcp
```

Skill luôn lấy bản mới nhất từ nhánh `main`, không cố định phiên bản.
