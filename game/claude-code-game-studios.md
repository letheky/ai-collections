# Claude Code Game Studios

> Repo: https://github.com/Donchitos/Claude-Code-Game-Studios · MIT · Bản 1.1.3
>
> ⭐ **26.827 sao**, 3.958 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Template project biến Claude Code thành một "studio làm game": các agent được chia cấp director → lead → chuyên viên, kèm lệnh slash, hook và rule.
Hỗ trợ Godot 4 (mặc định), Unity và Unreal 5. Có hai mức độ kỹ lưỡng là `minimal` và `standard` (đặt trong `modes.rigor`).

## Đã test

| Bước | Kết quả |
|---|---|
| Đếm cấu trúc `.claude/` | ✅ **49 agent, 74 skill, 14 hook script, 13 rule** |
| `settings.json` | Gắn hook vào **9 sự kiện** (SessionStart, PreToolUse, PostToolUse, Notification, PreCompact, PostCompact, Stop, SubagentStart, SubagentStop); có **131 rule chặn** (deny) |
| `bash -n` trên 14 hook | ✅ Cả 14 file đều không lỗi cú pháp |
| Chạy thử hook SessionStart | ✅ In ra bối cảnh phiên: nhánh, commit gần nhất, chế độ review "solo" |
| Làm một game hoàn chỉnh | ⛔ Không test (cần phiên Claude Code tương tác và engine Godot/Unity/Unreal) |

## Kết luận nhanh

✅ Template chặt chẽ, hook chạy được và có nhiều rule bảo vệ.
Nên bắt đầu ở mức `minimal`: chính README ghi lại thí nghiệm của tác giả cho thấy viết nhiều tài liệu hơn không làm ra game hay hơn.
Nhiều agent và nhiều vòng review sẽ tốn token.

## Cài đặt

```bash
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game && claude        # phải mở ở thư mục gốc thì hook mới chạy
/start                      # hoặc /setup-engine godot 4.6
```

Cần Python 3 và Bash (Windows thì dùng Git Bash); nên có `jq`.
Có biến thể cho Unity là `IdoCohen560/claude-unity-game-studio`, nhưng repo này mới có 22 sao.
