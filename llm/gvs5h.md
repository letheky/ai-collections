# GVS5H (Gorilla vs. 5 Humans)

> Repo: https://github.com/slee-persis/GVS5H · Code MIT, bài báo và dữ liệu CC BY 4.0
>
> ⭐ **993 sao**, 111 fork (GitHub API, 2026-10-26) · Đã kiểm chứng dữ liệu: 2026-10-26

## Là gì

Một bài báo kèm code chứng minh một kỹ thuật: **điều phối zero-shot dựa trên sổ cái**, không huấn luyện thêm. Các bản sao mới của **cùng một model** đóng hai vai: một "manager" viết kế hoạch và chia việc, các "worker" mỗi người làm một việc, trao đổi qua các file dùng chung (`plan.md`, ghi chú, lời giải hiện tại). Worker không nói chuyện trực tiếp với nhau.
Đo trên 100 bài khó mới nhất của LiveCodeBench. Tên GVS5H là ẩn dụ "một con khỉ đột đấu 5 người", không phải "5 model trên 1 GPU".

## Đã test

Tôi **không chạy lại benchmark** (cần API key của nhiều nhà cung cấp). Thay vào đó tôi tự tính lại pass@1 từ dữ liệu chạy có sẵn trong repo (thư mục `runs/`), và đối chiếu với bảng trong bài báo.

| Bước | Kết quả |
|---|---|
| Tự tính pass@1 từ file kết quả `runs/.../results/*.json` | ✅ Khớp với bảng chính của bài báo |
| Qwen3.8-27B (open weight): một lần gọi → có manager | ✅ **66,8% → 92,4%** (trung bình 5 pass). Đây là kết quả đáng chú ý nhất |
| Qwen3.8-Flash-Next có manager | ✅ **93,0%**, so với Fable 5 một lần gọi **90,4%** |
| Fable 5 (tham chiếu) | ✅ 90,4% |
| Bảng `tab-regrade.tex`: số "đã chấm thô" so với số "báo cáo" | ⚠️ Fable 5 thô là **87,4%**, được nâng lên 90,4% nhờ hai hiệu chỉnh của chính tác giả (sửa mock `sys.stdin`, và chấm lại 4 bài có nhiều đáp án đúng). Tôi xác nhận: số thô tôi tính ra đúng là 87,4%, số "patched" là 90,4% |
| Có model không cải thiện hoặc tệ đi | ✅ Đúng như bài báo thừa nhận: Qwen3.6-35B một lần gọi 35% nhưng có manager chỉ 26%; MiniMax-M3 thấp |

## Kết luận nhanh

✅ Các con số trong bài báo tái lập được từ dữ liệu họ công bố, và kỹ thuật có tác dụng thật: ghép nhiều lần gọi một model cỡ vừa qua sổ cái giúp model 27B mã nguồn mở đạt mức ngang Fable 5 trên tập test này.
⚠️ Vài điều cần tỉnh táo: (1) Con số "frontier" phụ thuộc vào hiệu chỉnh evaluator của chính tác giả (thô 87,4 → 90,4 cho Fable 5). (2) Chỉ trên 100 bài LiveCodeBench Hard, không phải mọi loại việc lập trình. (3) Chính bài báo ghi: nếu giá Qwen cao hơn 1,28 lần giả định, lợi thế chi phí so với Fable 5 **biến mất hoàn toàn**. (4) Có manager tốn gấp nhiều lần token so với một lần gọi.

## Cài đặt

```bash
cd codebase/v2-current
export OPENAI_API_KEY=...        # hoặc ANTHROPIC_API_KEY, DASHSCOPE_API_KEY, OPENROUTER_API_KEY
MULTIAGENT_MODEL=openai:gpt-5.6-terra \
uv run --no-project --python 3.12 --with 'datasets<4' --with numpy --with anthropic \
  python escalation/run_bench.py --engine multiagent --only lcb --lcb 100 --parallel 8
# --engine single là baseline một lần gọi. Điểm pass@1 in ra ở cuối.
```
