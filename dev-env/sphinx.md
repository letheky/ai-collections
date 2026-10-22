# Sphinx (sphinx-understand)

> Repo: https://github.com/parthh01/sphinx · MIT · npm `sphinx-understand`
>
> ⭐ **291 sao**, 12 fork (GitHub API, 2026-10-22) · Repo tạo 2026-10-14 · Đã test: 2026-10-22 (bản 0.1.13)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/Rz11HWWZJguQhvcBrPgqGT (push bị chặn, kết quả test)

## Là gì

Git hook cho người làm việc cùng coding agent. Trước khi push lên nhánh được chọn (mặc định `main`/`master`),
Sphinx đặt 0–3 câu hỏi về thay đổi đó (tùy độ lớn) và chỉ cho push khi bạn trả lời đạt.
Câu hỏi do một LLM sinh và chấm: Claude Code, Codex, OpenRouter hoặc một endpoint tương thích OpenAI.

## Đã test

Cài trong một HOME tạm để không đụng tới cấu hình git thật.

| Bước | Kết quả |
|---|---|
| `npm ci` + `npm test` | ✅ **740/740 test đạt** |
| `sphinx install --yes --agents none` | ❌ Bị từ chối: lần cài đầu bắt buộc chọn `--preset` |
| `sphinx install --yes --preset claude-economy` | ✅ Đặt **`core.hooksPath` toàn cục**, nên áp dụng cho mọi repo trên máy |
| `git push origin main` (thay đổi nhỏ) | ✅ **Bị chặn**: "understanding check needed", mở trang câu hỏi trên `127.0.0.1` và giữ git chờ (tối đa 25 phút theo README) |
| Sinh và chấm câu hỏi | ⛔ Không test (cần Claude Code hoặc Codex đã đăng nhập, hoặc key OpenRouter) |

## Kết luận nhanh

✅ Hook hoạt động đúng như mô tả. Hợp với team muốn chắc người review hiểu code AI viết trước khi push.
⚠️ Lưu ý:
- Áp dụng cho **mọi repo** trên máy.
- **Gửi code thay đổi tới nhà cung cấp model.** Mặc định loại `.env` và key.
- Mỗi lần kiểm tra gọi model khoảng 5–8 lần và mặc định không giới hạn; nên đặt `--max-model-calls`.
- README tự ghi đây là "luyện tập, không phải cổng bảo mật": người dùng có thể bỏ qua hook.

## Cài đặt

```bash
npm install -g sphinx-understand        # cần Node 22.19+
sphinx install --yes --preset claude-economy --agents claude
cd your-repo && sphinx init
sphinx config --max-model-calls 30
```
