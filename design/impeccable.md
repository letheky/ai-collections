# Impeccable

> Repo: https://github.com/pbakaus/impeccable · Apache 2.0 · Trang: https://impeccable.style
>
> ⭐ **82.742 sao**, 4.999 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Một skill thiết kế cho coding agent (tác giả Paul Bakaus), gồm hai phần:
- **24 lệnh** gọi qua `/impeccable <lệnh>`: `init`, `shape`, `craft`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, `typeset`, `layout`, `colorize`, `animate`, `harden`, `live`…
- **Bộ phát hiện tất định** (README ghi 61 luật). Chạy bằng CLI, không cần LLM hay API key.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx -y impeccable --version` | ✅ 4.6.0 |
| `impeccable detect slop.html` (trang cố tình "kiểu AI": Inter, gradient tím, card lồng card, chữ xám trên nền màu, h1 → h3, câu "Supercharge…") | ✅ **9 lỗi** trong **< 1 giây**: 2 lỗi độ tương phản WCAG, `gray-on-color`, `overused-font` (Inter), `flat-type-hierarchy`, `nested-cards`, `skipped-heading`, `ai-color-palette` (tím), `marketing-buzzword` |
| `impeccable detect clean.html` (trang tối giản, font serif, nền kem) | ⚠️ Vẫn bị bắt **1 lỗi** `cream-palette`, vì luật coi nền kem là "mặc định của AI". Bộ luật mang quan điểm riêng của tác giả |
| Telemetry | ⚠️ **Bật mặc định**. Tắt bằng `npx impeccable telemetry off` |
| 24 lệnh trong agent | ⛔ Không test (cần phiên agent tương tác) |

## Kết luận nhanh

✅ Bộ detect rất nhanh và bắt đúng các mẫu UI phổ biến, chạy được trong CI mà không tốn token.
Nên tinh chỉnh bằng `impeccable ignores` cho hợp với design system của bạn.

## Cài đặt

```bash
npx impeccable install          # cài skill vào project
npx impeccable telemetry off
npx impeccable detect src/      # chạy detector
# trong agent: /impeccable init
```
