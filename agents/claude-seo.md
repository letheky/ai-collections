# Claude SEO (Universal SEO Skill)

> Repo: https://github.com/AgriciDaniel/claude-seo · MIT
>
> ⭐ **21.152 sao**, 2.966 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26

## Là gì

Bộ skill SEO cho Claude Code: **26 sub-skill** và **19 agent** chuyên biệt, gọi bằng các lệnh `/seo ...`. Bao gồm kiểm toán SEO kỹ thuật, đánh giá E-E-A-T, sinh và kiểm tra Schema.org, tối ưu cho tìm kiếm AI (GEO: AI Overviews, ChatGPT, Perplexity, Gemini), SEO local và e-commerce, và kiểm tra mức sẵn sàng cho web agent (Lighthouse Agentic Browsing, WebMCP, `llms.txt`).
Chạy hoàn toàn trên máy bằng các script Python; `/seo setup` tự tạo môi trường Python riêng và Chromium headless. Một số nguồn dữ liệu (Google Search Console, PageSpeed, DataForSEO…) cần API key, không có thì bỏ qua.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx skills add AgriciDaniel/claude-seo --list` | ✅ Liệt kê đủ **26 skill** |
| `uv pip install -r requirements.txt pytest` rồi `pytest tests/` | ✅ **1.068/1.074 test đạt**. 6 lỗi đều do môi trường test (chặn DNS ra ngoài và proxy nội bộ `127.0.0.1`), không phải lỗi code. Bỏ biến proxy đi thì còn 4 lỗi, đều vì không ra được `example.com` |
| `parse_html.py` trên trang mẫu | ✅ Trích đúng title, nhiều thẻ H1, ảnh thiếu alt, link nội bộ/ngoài, JSON-LD, đếm từ, phân giải URL tương đối thành tuyệt đối |
| `schema_ecommerce_validate.py` trên Product JSON-LD thiếu trường | ✅ Chấm FAIL, chỉ ra thiếu `image`, `description`, `priceCurrency`, chính sách đổi trả, chi tiết giao hàng — theo quy tắc Google Merchant |
| Kiểm toán website thật `/seo audit <url>` | ⛔ Không test đầy đủ (cần Claude Code và mạng ra ngoài) |

## Kết luận nhanh

✅ Nhiều script chạy được độc lập và có bộ test lớn (hơn 1.000 ca). Trình phân tích HTML và trình kiểm tra schema cho kết quả đúng, rõ ràng. Chạy trên máy, không gửi dữ liệu đi (PRIVACY.md ghi không có telemetry). Hữu ích để kiểm toán SEO ngay trong terminal.
⚠️ Muốn dùng hết sức mạnh (dữ liệu Google, đối thủ, backlink) cần nhiều API key, một số trả phí. Đây là công cụ trợ giúp, không thay được hiểu biết SEO của người dùng.

## Cài đặt

Trong Claude Code 1.0.33 trở lên:

```bash
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo setup
/seo audit https://your-site.com
```

Cài tay: `git clone` rồi `bash install.sh`.
