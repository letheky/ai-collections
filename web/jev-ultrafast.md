# Jev Ultrafast

> Repo: https://github.com/browser-use/jev-ultrafast · MIT
>
> ⭐ **23.230 sao**, 1.728 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Thư viện Python làm browser agent. Agent đọc snapshot DOM của các điều khiển đang hiển thị, chuyển thành một bảng phần tử có đánh số,
rồi gọi model **Jev của TypeSafe** (API trả phí, chạy trên cloud) để chọn thao tác và phần tử.
Các thao tác: CLICK, TYPE_TEXT, SELECT, SCROLL, WAIT, DONE, BLOCKED.
Riêng khi cần gõ chữ thì gọi thêm một LLM khác để viết nội dung.
Kết nối với Chrome qua Browser Harness.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv sync` | ✅ 1,3 giây |
| `pytest tests` | ✅ **31/31 test đạt** trong 0,36 giây (test offline cho bảng DOM và executor) |
| Chạy agent thật | ⛔ Không test được: cần `TYPESAFE_API_KEY` và `TEXT_MODEL_API_KEY` trả phí |

## Kết luận nhanh

⚠️ Code gọn và test pass, nhưng repo mới chỉ có 3 commit và phần ra quyết định khóa vào API trả phí của TypeSafe, không tự host được.
README không đưa ra benchmark chuẩn hay bảng giá.

## Cài đặt

```bash
git clone https://github.com/browser-use/jev-ultrafast && cd jev-ultrafast
uv sync && cp .env.example .env    # điền TYPESAFE_API_KEY, TEXT_MODEL_API_KEY
uv run jev                         # giao diện kiểm tra ở http://127.0.0.1:8766
```

## Lưu ý (từ README)

- Chưa hỗ trợ: shadow DOM, iframe, canvas, upload, tab pop-up, vùng cuộn lồng nhau.
- Agent dùng chung profile Chrome đang mở, nên có quyền với các phiên đăng nhập sẵn.
