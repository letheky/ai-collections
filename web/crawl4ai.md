# Crawl4AI

> Repo: https://github.com/unclecode/crawl4ai · Apache-2.0
>
> ⭐ **85.997 sao**, 8.941 fork (GitHub API, 2026-10-22) · Đã test: 2026-10-22 (bản 0.9.5)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/TYfdt6Pr4h19iJ7asTcrBX (trang thử và Markdown gốc / đã lọc)

## Là gì

Thư viện Python crawl web bằng trình duyệt thật (Playwright) và xuất ra Markdown sạch để đưa vào LLM, RAG hoặc agent.
Có bộ lọc nội dung, crawl song song, và trích xuất có cấu trúc.

## Đã test

Trang thử tự viết, chạy cục bộ: có menu, dòng quảng cáo, bảng, footer, và một đoạn chỉ hiện ra sau khi JavaScript chạy 300 ms.

| Bước | Kết quả |
|---|---|
| `uv pip install -e .` + `playwright==1.56.0` | ✅ crawl4ai 0.9.5 |
| `AsyncWebCrawler.arun()` với `wait_for="css:#js-part h2"` | ✅ Xong trong **0,61 giây**, **lấy được đoạn tải bằng JavaScript** |
| Bảng HTML | ✅ Thành bảng Markdown đúng cột và dòng |
| `PruningContentFilter` (`fit_markdown`) | ⚠️ Bỏ được menu và footer, **vẫn giữ dòng quảng cáo** |
| Thông báo khi chạy | ⚠️ In banner quảng cáo Crawl4AI Cloud. Tắt bằng `CRAWL4AI_NO_CLOUD_NOTICE=1` |
| API | `PruningContentFilter` đã bị đánh dấu deprecated; nên dùng `PruningContentFilterLXML` |

## Kết luận nhanh

✅ Ổn định, nhanh, xử lý tốt trang có JavaScript. Bộ lọc tự động vẫn có thể để lọt quảng cáo; nên thêm CSS selector hoặc cấu hình loại trừ cho từng site.

## Cài đặt

```bash
pip install crawl4ai
crawl4ai-setup        # cài trình duyệt cho Playwright
```
