# Open Code Review (Alibaba)

> Repo: https://github.com/alibaba/open-code-review · Apache-2.0 · npm `@alibaba-group/open-code-review`
>
> ⭐ **48.076 sao**, 3.517 fork (GitHub API, 2026-10-23) · Đã test: 2026-10-23 (bản 1.13.3)

## Là gì

CLI review code viết bằng Go (lệnh `ocr`). Nó đọc git diff, gửi từng nhóm file cho LLM, và LLM chỉ được dùng 6 tool cố định: `file_read`, `file_read_diff`, `file_find`, `code_search`, `code_comment`, `task_done`. Comment được gắn đúng dòng nhờ đối chiếu đoạn code trích dẫn.
Ngoài review diff còn có `ocr scan` để review cả thư mục, kèm GitHub Action, MCP và ACP. Telemetry chỉ bật khi đặt `OCR_ENABLE_TELEMETRY=1`.

## Đã test

| Bước | Kết quả |
|---|---|
| `npm install @alibaba-group/open-code-review@1.13.3` | ✅ 3 giây, kèm binary Go dựng sẵn cho linux/amd64 |
| `ocr review --from main --to feature` trên repo mẫu (lỗi SQL injection + chia cho 0), mock LLM gọi `code_comment` | ✅ Hai comment gắn đúng dòng 5 và 9, có gợi ý sửa, phân loại security/critical và bug/medium |
| `--format json --output` | ✅ JSON có số token, số lần gọi tool, session id để chạy tiếp |
| Khi model trả lời bằng text thay vì gọi tool | ⚠️ Lặp khoảng 100 request rồi mới báo lỗi. Với model thật, việc này đốt token |
| Bước "review filter" | ⚠️ Cần LLM trả JSON. Mock trả text nên bước này lỗi parse, nhưng comment vẫn được giữ |
| Chất lượng review với model thật | ⛔ Không test (không có API key) |

**Benchmark** (ảnh trong README, do chính Alibaba đo trên bộ AACR-Bench gồm 200 PR từ 50 repo): F1 cao nhất là **25,1%** (Claude-4.6-Opus + OCR) so với 11,6% khi dùng Claude Code. Token trung bình mỗi review là 385K so với 5.664K (khoảng 1/15). Riêng Claude-4.8-Opus thì 352K so với 2.062K (khoảng 1/6). Recall của OCR thấp hơn Claude Code. Tôi chưa chạy lại benchmark này.

## Kết luận nhanh

✅ Pipeline chặt chẽ: tool cố định, comment gắn đúng dòng, output JSON dễ đưa vào CI. Hợp để review PR tự động với chi phí thấp.
⚠️ F1 tuyệt đối chỉ khoảng 20–25% theo chính benchmark của họ, tức vẫn bỏ sót phần lớn lỗi. Hãy coi nó là lớp lọc đầu tiên, không thay được người review.

## Cài đặt

```bash
npm install -g @alibaba-group/open-code-review
ocr config provider     # chọn nhà cung cấp, nhập key
ocr review              # review thay đổi hiện tại
ocr review --from main --to feature-branch --format json --output result.json
```

Có thể cấu hình qua biến môi trường: `OCR_LLM_URL`, `OCR_LLM_TOKEN`, `OCR_LLM_MODEL`, `OCR_LLM_PROTOCOL` (openai hoặc anthropic).
