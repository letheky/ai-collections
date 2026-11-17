# Comfy MCP

> Repo: https://github.com/Comfy-Org/comfy-mcp · **AGPL-3.0-or-later hoặc giấy phép thương mại của Comfy Org** (GitHub ghi "NOASSERTION")
>
> ⭐ **348 sao**, 51 fork (GitHub API, 2026-11-17) · Đã chạy: 2026-11-17, bản 0.11.0 (commit `a99599f`)

## Là gì

MCP server chính chủ của đội ComfyUI. Cho Claude Code, Claude Desktop, Cursor điều khiển ComfyUI trên máy mình:
- chạy workflow, theo dõi job;
- tìm node, model và template đang thực sự có trong bản cài;
- cài custom node, khởi động hoặc tắt ComfyUI;
- biến video thành contact sheet và audio thành dạng sóng để agent tự xem.

Bản chạy trên cloud là Comfy Cloud MCP, cài riêng.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv pip install -e .` | ✅ 10 giây |
| MCP `tools/list` | ✅ Đúng **41** công cụ như bản tin, gồm `run_workflow`, `preview_media`, `install_node`, `download_model`, `validate_workflow`... |
| `preview_media` trên pilot phim Berlin | ✅ Ra contact sheet theo dòng thời gian, kèm thông số (1920×1080, 24 fps, 19,58 giây, có âm thanh). Cần cài thêm `comfy-cli` 1.26.0 |
| Các công cụ cần ComfyUI đang chạy (`discover`, `nodes`, `run_workflow`) | ⛔ Chưa test: máy không có GPU nên không dựng ComfyUI cho lần này |

## Kết luận nhanh

⚠️ Bộ công cụ đầy đủ, hợp với ai đã có ComfyUI chạy trên GPU. Riêng `preview_media` hữu ích cả khi không có ComfyUI. Lưu ý **AGPL**: dùng nội bộ thì không sao, còn đưa thành dịch vụ cho người khác dùng thì phải công khai mã nguồn hoặc mua giấy phép.

## Cài đặt

```bash
pip install comfy-mcp "comfy-cli>=1.14.0"   # server + comfy-cli (cần cho preview_media)
claude mcp add comfy-mcp -- comfy-mcp
```
