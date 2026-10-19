# Scenario Agent Skills: "cả phòng art game" dưới dạng agent skill

> Nguồn: ảnh chụp video do người dùng cung cấp ("scenario-labs/skills, 7.2k sao, An entire game art department as agent skills").
> Repo: https://github.com/scenario-labs/skills. Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

Đây là bộ Agent Skills chính thức của **Scenario** (scenario.com, nền tảng tạo asset bằng AI có thu phí).
Skill dạy coding agent (Claude Code, Cursor, Codex, Copilot và hơn 70 agent khác) tạo nội dung qua **Scenario MCP server**:
ảnh, video, âm thanh, texture, skybox, model 3D, và model tự huấn luyện.

- **Giấy phép:** code của skill theo **MIT**. Nhưng việc tạo asset chạy trên dịch vụ trả phí của Scenario (tính bằng "Creative Units").
- **Số lượng:** khoảng **75 skill Scenario**, cộng thêm các bộ "expert tools" cho phần mềm dựng hình và engine game.
- **Mức độ phổ biến:** 7.2k sao theo ảnh chụp. Chưa kiểm chứng trực tiếp.

## Các nhóm skill chính

| Nhóm | Ví dụ skill | Làm gì |
|---|---|---|
| Khởi đầu | `scenario`, `scenario-inspiration` | Kết nối MCP, vòng tạo cơ bản, moodboard, phương án A/B/C/D |
| Ảnh và game 2D | `scenario-game-assets`, `scenario-sprite-animation`, `scenario-side-view-game-kit` | Sprite, icon, prop, walk cycle, VFX sheet |
| 3D và môi trường | `scenario-3d`, `scenario-textures`, `scenario-skyboxes`, `scenario-walkable-room` | Ảnh → 3D kèm rigging, PBR liền mạch, skybox 360°, phòng đi lại được |
| Nhất quán nhân vật | `scenario-consistency`, `scenario-identity-library`, `scenario-model-training` | Một nhân vật giữ nguyên ở mọi cảnh; tự huấn luyện model |
| Video và âm thanh | `scenario-seedance`, `scenario-veo`, `scenario-kling`, `scenario-audio`, `scenario-elevenlabs` | Video điện ảnh, nhạc, hiệu ứng âm thanh, giọng nói |
| Kiểm soát chất lượng và chi phí | `scenario-quality-gate`, `scenario-model-comparison`, `scenario-refine-loop` | Chấm pass/warn/fail, so sánh model kèm chi phí, chạy thử để xem giá trước |
| Quản trị team | `scenario-team-admin`, `scenario-admin-analytics` | Giới hạn chi tiêu theo thành viên, quyền API key |
| Expert tools | ZBrush, Blender, Maya, Unreal, Unity, Godot | Điều khiển phần mềm đã cài trên máy. **Không cần Scenario MCP** |

## Cài đặt

```bash
npx skills add scenario-labs/skills                       # chọn skill từ menu
npx skills add scenario-labs/skills --skill scenario      # chỉ cài skill lõi
claude mcp add --transport http scenario https://mcp.scenario.com/mcp   # kết nối MCP (đăng nhập OAuth hoặc dùng API key)
```

## Nhận xét

- **Bản chất là "cổng vào" dịch vụ Scenario.** Skill thì miễn phí, nhưng mỗi asset tạo ra đều tốn tiền.
  Các skill có sẵn "dry-run pricing" để xem giá trước khi chạy, nên dùng chúng.
- **Phần độc lập đáng giá:** bộ expert tools cho Blender, Godot, Unity, Unreal chạy được mà không cần tài khoản Scenario.
- **Kết hợp được với** [Claude Code Game Studios](claude-code-game-studios.md): CCGS lo thiết kế và code game, Scenario lo art.
- **Quyền dùng thương mại** của asset sinh ra phụ thuộc điều khoản của Scenario và của từng model bên dưới (Veo, Kling, Seedance…).
- Skill luôn lấy bản mới nhất từ nhánh `main`, không cố định phiên bản. Theo dõi Releases để biết thay đổi.
