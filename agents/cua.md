# Cua (trycua/cua)

> Repo: https://github.com/trycua/cua · Phần lớn MIT; Cua Spaces và Driver Bench theo FSL-1.1-MIT
>
> ⭐ **30.494 sao**, 2.205 fork (GitHub API, 2026-10-21) · Đã test: 2026-10-21 (SDK `cua` 0.6.0)

## Là gì

Nền tảng cho **computer-use agent**, tức agent điều khiển chuột, bàn phím và màn hình. Gồm các phần:

| Thành phần | Vai trò |
|---|---|
| Cua Driver | Thao tác app trên macOS, Windows, Linux |
| Cua Spaces / `cua-spacesd` | Desktop sandbox cho agent |
| Lume | Máy ảo macOS/Linux trên Apple Silicon |
| Cua Bench | Tạo task, đánh giá agent, xuất trajectory |
| SDK | Python (`pip install cua`), TypeScript, Rust, kèm CLI `cua` và MCP server |

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install cua` | ✅ Bản 0.6.0, cài trong khoảng 1 giây |
| `cua --help` | ✅ Có các nhóm lệnh: `do` (screenshot, click, type, key, scroll, a11y…), `sandbox`, `mcp`, `skills`, `trajectory`, `host`, `spaces`, `cloud`, `team`… |
| `cua do switch host` | ✅ **Bắt buộc xác nhận** bằng `cua do-host-consent`, kèm cảnh báo rằng AI sẽ có toàn quyền bàn phím, chuột và màn hình |
| Chụp màn hình hoặc điều khiển máy (màn hình ảo Xvfb) | ❌ Không chạy được: cần dịch vụ `cua-spacesd`. Muốn cài thì `cua host setup` sẽ **đăng ký máy vào relay cua.ai bằng tài khoản của bạn**, nên tôi không cài |
| Telemetry | ⚠️ CLI tự gửi dữ liệu tới `eu.i.posthog.com` theo mặc định (bị chặn trong môi trường test). Xem bằng `cua telemetry show-last` |
| Sandbox, Lume, Bench | ⛔ Không test (cần image hoặc máy ảo; Docker Hub đang giới hạn lượt tải) |

## Kết luận nhanh

⚠️ SDK cài dễ, CLI rất đầy đủ, có cơ chế xin phép rõ ràng trước khi điều khiển máy thật.
Nhưng điều khiển máy cục bộ cần daemon `cua-spacesd`, phần này dùng giấy phép FSL (source-available, không phải MIT) và gắn với tài khoản cua.ai.
Nên chạy trong sandbox, đừng chạy trên máy chính.

## Giấy phép (theo README)

- Phần lớn repo theo MIT.
- **Cua Spaces, `cua-spacesd` và Driver Bench theo FSL-1.1-MIT:** được dùng và tự host, nhưng không được làm dịch vụ cạnh tranh; mỗi bản chuyển sang MIT sau 2 năm.
- `cua-som` theo AGPL.
