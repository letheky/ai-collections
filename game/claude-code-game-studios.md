# Claude Code Game Studios: biến Claude Code thành studio làm game

> Nguồn: người dùng yêu cầu ("claude-studio-game", đã xác nhận là repo này).
> Repo: https://github.com/Donchitos/Claude-Code-Game-Studios
> Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

Đây là **template project** cho Claude Code, không phải engine game. Bạn clone repo về làm thư mục gốc cho game của mình.
Template mô phỏng cơ cấu của một studio làm game thật, gồm các agent sau:

- **Directors:** giữ tầm nhìn chung của game.
- **Leads:** phụ trách từng mảng.
- **Specialists:** trực tiếp làm việc: gameplay, engine, AI, UI, âm thanh, cốt truyện, QA, devops…

| Thành phần | Số lượng |
|---|---|
| Agents (subagent có vai trò và đường báo cáo riêng) | 49 |
| Skills (lệnh slash như `/start`, `/brainstorm`, `/create-stories`, `/dev-story`) | 74 |
| Hooks (bash) | 12 |
| Rules: chuẩn code theo từng đường dẫn (gameplay, engine, UI, network…) | 13 |

- **Giấy phép:** MIT.
- **Mức độ phổ biến:** khoảng 26.7k sao (theo một trang tổng hợp, chưa kiểm chứng trực tiếp).
- **Engine hỗ trợ:** có agent chuyên cho **Godot 4** (GDScript, shader), **Unity** (DOTS/ECS, Addressables) và **Unreal 5** (GAS, Blueprints).
  Mặc định là Godot.

## Điểm đáng chú ý

- **Chọn mức độ kỹ lưỡng** bằng `modes.rigor`:
  - `minimal` (mặc định): kiểu game jam, chỉ cần một trang brief.
    Quy trình: `/start` → `/setup-engine` → `/brainstorm` → `/create-stories` → `/dev-story`.
  - `standard`: bắt buộc viết GDD (tài liệu thiết kế game), QA và review kỹ hơn.
- **README tự đánh giá khá thẳng thắn:**
  - Họ làm 4 game từ cùng một brief, ở các mức rigor khác nhau.
  - Bản `standard` viết 30 tài liệu trước khi code, mất 58 phút.
  - Nhưng khi người chơi thử và người review đánh giá mù, bản này bị xếp **cuối**.
  - Kết luận của chính tác giả: tài liệu nhiều hơn giúp truy vết tốt hơn, chứ không làm ra game hay hơn. Nên bắt đầu ở mức `minimal`.
- **QA bằng cách nhìn thật:** mỗi story có thay đổi về hình ảnh chỉ được đóng khi game đã thực sự chạy, được quan sát,
  và có ảnh chụp màn hình lưu trong `production/qa/evidence/`.

## Cài đặt

```bash
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game && claude        # phải mở Claude Code ở thư mục gốc, nếu không thì hooks không chạy
/start                      # hoặc /setup-engine godot 4.6
```

Yêu cầu: Claude Code, Python 3 (để đọc `project.yaml`), Bash (Windows thì dùng Git Bash). Nên có thêm `jq`.

## Lưu ý

- **Tốn token:** 49 agent kèm vòng review của các director rất tốn token. Ở mức `standard`, chi phí tăng đáng kể.
- **Nó điều phối, không làm hộ mọi thứ:** đồ họa, âm thanh và việc build vẫn phải có công cụ thật (Godot/Unity/Unreal, asset).
  Có thể ghép với [Mesh2Motion](../animation/mesh2motion.md) để có animation 3D theo CC0, hoặc [VoiceStudio](../voice/voicestudio.md) để lồng tiếng
  (lưu ý giấy phép NC của VoiceStudio).
- **Dùng Unity:** có biến thể riêng [IdoCohen560/claude-unity-game-studio](https://github.com/IdoCohen560/claude-unity-game-studio)
  với 49 agent và hơn 120 skill.

## Nguồn

- https://github.com/Donchitos/Claude-Code-Game-Studios
- https://github.com/Donchitos/Claude-Code-Game-Studios/releases
- https://github.com/IdoCohen560/claude-unity-game-studio
- https://skillsllm.com/skill/claude-code-game-studios
