# Harness² (Google Research)

> Repo: https://github.com/google-research/harness2 · Apache-2.0
>
> ⭐ **19.654 sao**, 1.935 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26

## Là gì

Khung nghiên cứu tự động cải thiện "harness" của agent mà không train lại model. Harness gồm 8 thành phần: system prompt, guardrails, memory, tool guidance, subagents, skills, scripts, plugins.
- **Đệ quy cấp tác vụ:** với mỗi tác vụ, hệ thống đề xuất các bản sửa harness, chạy thử từng bản, rồi ghép thành harness cuối dựa trên khác biệt giữa các lần chạy (Propose–Probe–Compose). Không cần đáp án đúng.
- **Đệ quy cấp harnessing:** lưu harness tốt và bài học vào một thư viện để dùng cho tác vụ sau.

Executor hỗ trợ là OpenCode và Codex. Benchmark đi kèm: JobBench, LAB (pháp lý), WorkBuddy-Bench (văn phòng, web, code). Model chạy qua Vertex AI.

## Đã test

| Bước | Kết quả |
|---|---|
| `uv venv --python 3.12` + `uv pip install -e '.[render]'` | ✅ 1,6 giây |
| `harness2-demo --output runs/demo --k 2` (không cần key) | ✅ 2,3 giây: 2 tác vụ kế toán xong, 0 lỗi, 28 lần thực thi, 32 lần gọi editor |
| Harness sau khi tinh chỉnh | ✅ Sửa đúng lỗi cố ý trong `summarize.py` mẫu (bỏ điều kiện chỉ cộng số dương). Có lưu thư viện harness và file EXPERIENCE.md cho tác vụ sau |
| Benchmark thật với model | ⛔ Không test (cần Vertex AI và gcloud, WorkBuddy còn cần Docker) |

Demo dùng editor xác định sẵn, không có LLM. Nó chỉ chứng minh được luồng chạy, không chứng minh được chất lượng.

## Kết luận nhanh

✅ Cài và demo chạy ngay, cấu trúc output rõ ràng: mỗi harness là một thư mục file Markdown và script, dễ đọc và so sánh bằng diff. Hợp với ai nghiên cứu cách tối ưu agent.
⚠️ Đây là code nghiên cứu, "không phải sản phẩm chính thức của Google". Muốn chạy với model thật phải có Vertex AI. Các con số +11,5 điểm và +11,8 điểm phần trăm là do tác giả tự đo trên GLM-5 và Gemini 3.5 Flash.

## Cài đặt

```bash
git clone https://github.com/google-research/harness2 && cd harness2
uv venv --python 3.12 .venv && source .venv/bin/activate
uv pip install -e '.[render]'
harness2-demo --output runs/demo --k 2        # không cần key
# chạy benchmark: cp .env.example .env, điền Vertex AI, gcloud auth application-default login
```

Yêu cầu: Linux, Python 3.12. Muốn chạy benchmark thì cần thêm Node.js 20+ và Google Cloud CLI.
