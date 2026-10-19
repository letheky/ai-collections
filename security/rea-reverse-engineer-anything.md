# REA (Reverse Engineer Anything)

> Repo: https://github.com/morluto/rea · MIT · npm `rea-agents` · Trang: https://rea.tools
>
> ⭐ **323.504 sao**, 81.957 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

MCP server kèm CLI giúp coding agent (Claude Code, Codex, Cursor, Gemini CLI…) phân tích phần mềm mà không cần source code.
Đối tượng phân tích:
- Binary native: dùng Hopper, Ghidra hoặc IDA có sẵn trên máy.
- App JavaScript/Electron (ASAR), .NET, website, APK (qua JADX), firmware.

Mọi phân tích chạy ngay trên máy. Mỗi kết luận đi kèm bằng chứng và giới hạn của nó.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx -y rea-agents@latest --version` | ✅ 6.7.0 |
| `analyze-javascript-application <dist của một web app build sẵn> --json` | ✅ Xong trong **48 giây**: 12 file liên quan (8 MB text), parse 4 file JS, duyệt **408.920 nút AST**, ra **130 phát hiện** |
| Định dạng kết quả | JSON "evidence" có `evidence_id` và hash sha256, `confidence: derived`, `authority: shipped-artifact`, cùng **7 giới hạn ghi rõ**: chỉ phân tích tĩnh, không chạy code, thiếu dữ kiện thì không có nghĩa là không tồn tại… |
| Phân tích binary native | ⛔ Không test (máy không cài Ghidra, Hopper hay IDA) |

## Kết luận nhanh

✅ Cài bằng `npx` là chạy, kết quả có cấu trúc rõ ràng và tự nêu giới hạn. Hợp để debug, kiểm tra bảo mật và tìm hiểu kiến trúc phần mềm mà bạn có quyền phân tích.

## Cài đặt

```bash
npx rea-agents setup        # đăng ký MCP và workflow cho agent (có sao lưu cấu hình cũ)
npx -y rea-agents@latest analyze-javascript-application /path/to/app --json
```

## Lưu ý

- Hopper và IDA là phần mềm thương mại, phải có license hợp lệ.
- README cấm dùng bản crack hoặc vượt giới hạn license, và chỉ cho phép phân tích phần mềm bạn sở hữu hoặc được phép phân tích.
- Chỉ tải từ `morluto/rea`, rea.tools hoặc npm `rea-agents`, vì đã có repo nhái copy README.
