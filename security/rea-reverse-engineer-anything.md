# REA (Reverse Engineer Anything)

> Repo: https://github.com/morluto/rea · MIT · npm `rea-agents` · Trang: https://rea.tools
>
> ⭐ **385.001 sao**, 96.396 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-19 (6.7.0), test lại 2026-10-26 (6.8.0)

## Là gì

MCP server kèm CLI giúp coding agent (Claude Code, Codex, Cursor, Gemini CLI…) phân tích phần mềm mà không cần source code.
Đối tượng phân tích:
- Binary native: dùng Hopper, Ghidra hoặc IDA có sẵn trên máy.
- App JavaScript/Electron (ASAR), .NET, website, APK (qua JADX), firmware.
- Bytecode WASM và EVM, header file model GGUF và safetensors (không nạp trọng số).
- Có thêm Rizin, GDB, JEB, adb và Playwright để quan sát app đang chạy. Bản 6.8.0 có khoảng 177 lệnh CLI.

Mọi phân tích chạy ngay trên máy. Mỗi kết luận đi kèm bằng chứng và giới hạn của nó.

## Đã test

| Bước | Kết quả |
|---|---|
| `npx -y rea-agents@latest --version` | ✅ 6.7.0 |
| `analyze-javascript-application <dist của một web app build sẵn> --json` | ✅ Xong trong **48 giây**: 12 file liên quan (8 MB text), parse 4 file JS, duyệt **408.920 nút AST**, ra **130 phát hiện** |
| Định dạng kết quả | JSON "evidence" có `evidence_id` và hash sha256, `confidence: derived`, `authority: shipped-artifact`, cùng **7 giới hạn ghi rõ**: chỉ phân tích tĩnh, không chạy code, thiếu dữ kiện thì không có nghĩa là không tồn tại… |
| `npx -y rea-agents@latest --version` (lần 2) | ✅ 6.8.0, khoảng 177 lệnh |
| `inspect-model-artifact` trên file safetensors và GGUF tôi tự tạo | ✅ Đọc đúng định dạng, version, metadata, tên, kiểu và kích thước tensor, offset từng tensor. Chỉ đọc phần header (224 và 160 byte) |
| `inspect-evm-interface <file> hex` trên bytecode có 2 hàm | ✅ Tìm đúng 2 selector `0x70a08231` (balanceOf) và `0xa9059cbb` (transfer). Kết quả tự ghi rõ là suy luận, chưa chạy code |
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
