# Jev Ultrafast: browser agent đọc DOM thay vì chụp màn hình

> Nguồn: bài giới thiệu do người dùng cung cấp. Repo: https://github.com/browser-use/jev-ultrafast
> Ngày nghiên cứu: 2026-10-19.
>
> ⭐ GitHub `browser-use/jev-ultrafast`: **23.230 sao**, 1.728 fork (kiểm chứng qua GitHub API ngày 2026-10-19).

## Tóm tắt

Jev Ultrafast là thư viện Python kèm giao diện kiểm tra chạy cục bộ (`uv run jev`, mở ở http://127.0.0.1:8766).
Repo thuộc tổ chức browser-use và kết nối với Chrome qua Browser Harness. Khẩu hiệu: "Fastest and cheapest web agent".

- **Giấy phép:** MIT.
- **Mức độ phổ biến:** 23.230 sao, 1.728 fork. Nhưng nhánh main chỉ có **3 commit**: đây là bản MVP.
- **Model quyết định:** "Jev" của TypeSafe, là **API trả phí được host sẵn**, không chạy trên máy. Cần `TYPESAFE_API_KEY`.
- **Model viết chữ:** một LLM riêng, chỉ dùng khi cần gõ text. Ví dụ cấu hình dùng OpenRouter với `inception/mercury-2.5`; có thể thay bằng Gemini, GLM, DeepSeek. Cần `TEXT_MODEL_API_KEY`.

## Cách hoạt động

1. Chụp snapshot DOM, **chỉ lấy các điều khiển đang hiển thị** trên màn hình. Không chụp ảnh màn hình trong vòng lặp chính.
2. Chuyển snapshot thành bảng phần tử có đánh số, ví dụ `[1] button Change ticket type · Round trip`.
3. Gửi một request tới Jev. Jev trả về thao tác cần làm và phần tử đích, chọn trong các thao tác:
   CLICK, TYPE_TEXT, SELECT, SCROLL_UP/DOWN, WAIT, DONE, BLOCKED.
4. Nếu thao tác là TYPE_TEXT, gọi thêm LLM viết chữ một lần nữa để sinh nội dung cần gõ.
5. Trước khi thực thi, kiểm tra lại trang còn mới không và phần tử có bị che không.

## Kiểm chứng bài giới thiệu

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| "Quyết định bước tiếp theo mà không cần đoán" | ⚠️ Nói quá | Model vẫn dự đoán theo xác suất (giao diện kiểm tra hiển thị xác suất của từng thao tác). README nói kết quả DONE vẫn cần kiểm tra lại độc lập. |
| "Quét màn hình để thấy mọi nút bấm và ô nhập" | ⚠️ Một phần | Chỉ lấy phần tử **đang hiển thị**, không phải toàn trang. Đây là snapshot DOM tự viết, không phải accessibility tree đầy đủ. |
| "Chọn chính xác thao tác trong một bước" | ⚠️ Một phần | Một lần gọi model chọn thao tác và phần tử. Riêng việc gõ chữ cần thêm một lần gọi LLM nữa. |
| Đọc cấu trúc trang thay vì ảnh màn hình | ✅ Đúng | |
| Tìm chuyến bay Zurich → London trong 7 giây | ✅ Có, kèm điều kiện | 7,073 ms trên Google Flights, **chỉ một lần chạy được quay video**. Một chiều, ngày 20/9/2026, 1 người lớn, hạng phổ thông. Dừng khi kết quả hiện ra, không đặt vé. |
| "Nhanh hơn nhiều so với công cụ truyền thống" | ❌ Không có số liệu | README không so sánh với tool nào khác. Không có benchmark chuẩn (WebVoyager, Mind2Web). Số duy nhất là nhanh hơn 25% so với chính phiên bản trước của nó, đo qua 6 lần chạy. |
| "Rẻ nhất" | ❌ Không có số liệu | Không công bố giá. Các ví dụ đều gọi API trả phí. |

## Cài đặt

```bash
git clone https://github.com/browser-use/jev-ultrafast.git && cd jev-ultrafast
uv sync && cp .env.example .env   # điền TYPESAFE_API_KEY và TEXT_MODEL_API_KEY
uv run jev                        # mở http://127.0.0.1:8766
```

## Hạn chế (README tự nêu)

- Chưa hỗ trợ: shadow DOM, iframe, canvas, upload file, tab pop-up, vùng cuộn lồng nhau, widget bàn phím phức tạp.
- Không đọc được nội dung chỉ có dạng hình ảnh, vì agent không nhìn ảnh.
- Agent dùng chung profile Chrome đang mở, tức là có quyền với các phiên đăng nhập sẵn. Cẩn thận khi giao việc cho nó.
- Bị khóa vào API Jev của TypeSafe. Không tự host được phần model quyết định.
