# SolidCraft

> Repo: https://github.com/bherbruck/solidcraft · MIT hoặc Apache-2.0 · Phiên bản 0.18.2
>
> ⭐ Không lấy được qua GitHub search API (repo có thật, clone được, nhưng API chưa trả kết quả) · Đã test: 2026-10-21

## Là gì

Phần mềm CAD 3D tham số viết bằng Rust, chạy được trên desktop, web (wasm) và dòng lệnh.
`solidcraft-cli mcp` là một MCP server, cho phép agent như Claude Code tự tạo sketch, đặt ràng buộc và dựng khối.

## Đã test

| Bước | Kết quả |
|---|---|
| `cargo build --release -p solidcraft-cli` | ✅ Mất **13 phút 23 giây** trên 4 vCPU. Binary nặng khoảng 405 MB (bản release có kèm debuginfo) |
| `solidcraft-cli commands` | ✅ Registry có **404 lệnh** |
| `solidcraft-cli run examples/bracket.json --out bracket.step` | ✅ Xong trong **0,49 giây**. File STEP 17 KB theo chuẩn **AP242**, có khối solid (`MANIFOLD_SOLID_BREP`, `ADVANCED_FACE`) |
| `solidcraft-cli mcp` (`initialize` + `tools/list`) | ✅ Server "SolidCraft" 0.18.2 có **17 tool**, ví dụ `list_commands`, `describe_command`, `execute`, `batch`, `inspect_design`, `measure`, `body_topology`, `set_parameter`… |
| Giới hạn truy cập file của MCP | ✅ Mặc định chỉ đọc/ghi trong thư mục recovery, một thư mục tạm và thư mục của bản thiết kế đang mở. Mở rộng bằng `--allow-path` |
| App desktop / web | ⛔ Không test |

## Kết luận nhanh

✅ Engine dựng và xuất STEP thật, MCP có giới hạn truy cập file hợp lý. Đáng thử nếu muốn agent dựng chi tiết cơ khí hoặc mẫu in 3D.
Build từ source khá lâu; nên tải binary từ mục Download trong README.

## Cài đặt

```bash
cargo build --release -p solidcraft-cli
claude mcp add solidcraft -- solidcraft-cli mcp
```
