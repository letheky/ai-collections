# Figwright

> Repo: https://github.com/awdr74100/figwright · MIT
>
> ⭐ **1.092 sao**, 63 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

MCP server mã nguồn mở nối coding agent (Claude Code, Cursor, Codex…) với Figma qua một plugin chạy cục bộ.
Đường đi: MCP client ↔ stdio ↔ `@figwright/mcp` ↔ WebSocket relay `127.0.0.1:3055` ↔ plugin Figma.
Có hai chiều: đọc thiết kế để sinh code, và ghi trực tiếp lên canvas.
Dùng Plugin API công khai nên không cần Dev Mode seat.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx -y @figwright/mcp@latest` | ✅ Server **0.6.0** khởi động, tự nhận vai trò leader và mở relay trên `:3055` |
| MCP `initialize` + `tools/list` | ✅ **117 tool** (README ghi 121; số thực tế phụ thuộc phiên bản), ví dụ `ping`, `get_selection`, `get_document`, `get_node`, `search_nodes`… |
| Plugin trong Figma | ⛔ Không test được: cần app Figma Desktop |

## Kết luận nhanh

✅ Phần server chạy ngay, không cần tài khoản trả phí. Cần tự cài plugin bằng tay vào Figma Desktop để dùng thật.

## Cài đặt

```json
{ "mcpServers": { "figwright": { "command": "npx", "args": ["-y", "@figwright/mcp@latest"] } } }
```

Sau đó tải file zip plugin từ GitHub Release, vào Figma Desktop chọn Plugins → Development → Import plugin from manifest, mở plugin và đợi hiện "Connected".
Cần Node.js 20.19+ hoặc 22.12+.

## Lưu ý

- Ở chế độ Dev Mode thì mọi lệnh ghi đều lỗi. FigJam không có component, variable, style.
- Plugin cài tay, nên phiên bản server và plugin có thể bị lệch nhau.
- Tool export ghi file vào đường dẫn do agent chọn, nên bật chế độ duyệt tool call.
