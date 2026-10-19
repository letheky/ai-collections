# Figwright: Figma MCP miễn phí, hai chiều

> Nguồn gốc: reel Facebook https://www.facebook.com/reel/1386569361206220 (caption do người dùng cung cấp).
> Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `awdr74100/figwright`: **1.092 sao**, 63 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

[Figwright](https://github.com/awdr74100/figwright) là một MCP server mã nguồn mở (MIT, 1.092 sao, tác giả `awdr74100`).
Nó nối coding agent (Claude Code, Cursor, Codex, hoặc bất kỳ MCP client nào) với Figma qua một plugin chạy cục bộ.
Nó **không** liên quan chính thức tới Figma và chỉ dùng Plugin API công khai.

## Kiểm chứng các nhận định trong reel

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| Figma MCP chính thức bản free giới hạn 20 lượt/tháng | ⚠️ Sai một phần | Theo docs của Figma, gói Starter (và seat View/Collab) chỉ được **6 tool call/tháng**. Con số 20 là từ blog bên thứ ba. Seat Dev/Full ở gói trả phí: tới 200 lượt/ngày (Pro/Org), 600 lượt/ngày (Enterprise). |
| Muốn dùng thoải mái phải mua Dev Mode seat | ✅ Đúng về cơ bản | Cần seat Dev hoặc Full ở gói trả phí. |
| Dùng được với tài khoản Figma miễn phí | ✅ Đúng | README ghi rõ không cần Dev Mode seat hay gói trả phí. |
| Kết nối qua plugin cục bộ / WebSocket relay | ✅ Đúng | MCP client ↔ (stdio) ↔ `@figwright/mcp` ↔ (WebSocket `127.0.0.1:3055`) ↔ plugin Figma. |
| Hai chiều: frame → code React theo token; code/mô tả → vẽ lên canvas | ✅ Đúng, kèm lưu ý | Nó tự nhận diện framework và hệ thống style của project, dùng lại component/token/icon có sẵn (`token_map`, `component_map`, `icon_map`). React chỉ là ví dụ, không phải target duy nhất. Có thể tạo/sửa frame, text, auto-layout, style, variable, component. |
| 121 MCP tools | ✅ Đúng theo README hiện tại | Chia thành 3 nhóm: Read, Write, Grounding. Các nguồn cũ ghi 92 hoặc 112, nên con số này tăng theo từng phiên bản. |
| Cần Figma Desktop | ✅ Đúng khi cài đặt | Plugin chưa có trên Community, phải import `manifest.json` bằng app desktop. |

## Cài đặt (theo README)

1. Yêu cầu Node.js 20.19+ hoặc 22.12+.
2. Thêm vào `.mcp.json`:
   ```json
   { "mcpServers": { "figwright": { "command": "npx", "args": ["-y", "@figwright/mcp@latest"] } } }
   ```
3. Tải file zip plugin từ GitHub Release mới nhất. Trong Figma Desktop vào Plugins → Development → Import plugin from manifest…
4. Mở plugin Figwright, đợi hiện "Connected", rồi bảo agent chạy `ping`.
5. Tùy chọn: `npx skills add awdr74100/figwright/skills`.

## Hạn chế và rủi ro

- Ở chế độ Dev Mode thì chỉ đọc được, mọi thao tác ghi đều thất bại.
- FigJam không hỗ trợ component, variable, style.
- Plugin phải cài tay, nên phiên bản server và plugin có thể bị lệch nhau.
- Tool export ghi file vào đường dẫn do agent chọn, nên cần bật chế độ duyệt tool call.
- Việc "dữ liệu không rời khỏi máy" là lời tự nhận của dự án, chưa được kiểm chứng độc lập.
- Đây là dự án cá nhân, không có SLA. Nếu Figma đổi Plugin API thì có thể bị hỏng.

## Các lựa chọn tương tự

- [figma-console-mcp (Desktop Bridge)](https://github.com/southleft/figma-console-mcp/tree/main/figma-desktop-bridge)
- [agent-to-figma-mcp](https://glama.ai/mcp/servers/caelinsutch/agent-to-figma-mcp)

## Nguồn

- https://github.com/awdr74100/figwright
- https://www.npmjs.com/package/@figwright/mcp
- https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/
- https://github.com/figma/mcp-server-guide
