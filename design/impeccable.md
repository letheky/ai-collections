# Impeccable: skill thiết kế giúp UI do AI làm bớt "mùi AI"

> Nguồn: người dùng yêu cầu. Repo: https://github.com/pbakaus/impeccable. Trang chủ: https://impeccable.style
> Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `pbakaus/impeccable`: **82.742 sao**, 4.999 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Impeccable là **một skill thiết kế duy nhất**, mở rộng từ skill `frontend-design` gốc của Anthropic.
Tác giả là Paul Bakaus (cựu kỹ sư Google, người làm Khroma). Giấy phép **Apache 2.0**.
Repo có 82.742 sao, 4.999 fork.

Gồm ba phần:

- **24 lệnh**, tất cả gọi qua `/impeccable <lệnh>`. Chúng tạo ra một bộ từ vựng thiết kế chung giữa bạn và agent:

  | Nhóm | Lệnh |
  |---|---|
  | Thiết lập | `init` (ghi bối cảnh sản phẩm vào `PRODUCT.md`), `document` (tạo `DESIGN.md` từ code có sẵn), `extract` (tách token và component) |
  | Lên kế hoạch và xây | `shape` (thiết kế UX trước khi code), `craft` (từ lên hình đến xây, có lặp bằng hình ảnh) |
  | Review | `critique` (thứ bậc thị giác, độ rõ ràng), `audit` (a11y, hiệu năng, responsive) |
  | Chỉnh sửa | `polish`, `bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`, `animate`, `delight`, `overdrive`, `clarify`, `harden` (lỗi, i18n, tràn chữ), `onboard`, `adapt`, `optimize` |
  | Lặp trực tiếp trên trình duyệt | `live`, `generate` (sinh nhiều biến thể của một phần tử ngay trên trang) |

- **61 luật phát hiện tất định**, chạy bằng CLI hoặc tiện ích trình duyệt **không cần LLM hay API key**. Chúng bắt các "mẫu UI kiểu AI", ví dụ:
  - font quá phổ biến (Inter, Arial, font hệ thống);
  - chữ xám trên nền màu; đen hoặc xám thuần (nên pha thêm màu);
  - card lồng card;
  - easing kiểu nảy (bounce/elastic).
- **Tài liệu tham khảo:** màu và độ tương phản, không gian, chuyển động, tương tác, responsive, viết chữ cho UX.

## Cài đặt

```bash
npx impeccable install      # chạy ở thư mục gốc của project
# sau đó, trong Claude Code / Cursor / Codex…
/impeccable init
```

- Engine là một binary độc lập, tự tải về `~/.impeccable/bin/` khi chạy lần đầu. Chỉ cần Node nếu cài bằng `npx`.
- Hỗ trợ rất nhiều agent: Claude, Cursor, Gemini, Codex, Copilot, Grok, OpenCode, Kiro…
- `/impeccable pin audit` tạo lệnh tắt `/audit`.

## Nhận xét

- Mạnh nhất ở **review và chỉnh sửa UI có sẵn** nhờ bộ lệnh rõ ràng, cùng bộ luật tất định chạy được cả trong CI mà không tốn token.
- Bộ luật là "gu" của tác giả. Ví dụ "không dùng Inter" không phải luôn đúng, nên chỉnh theo design system của bạn.
- Dùng tốt cùng lúc với [taste-skill](taste-skill.md): taste-skill tạo hướng nghệ thuật cho trang mới, Impeccable mài giũa và audit.
