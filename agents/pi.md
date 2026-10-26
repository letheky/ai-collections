# Pi (earendil-works)

> Repo: https://github.com/earendil-works/pi · MIT · npm `@earendil-works/pi-coding-agent`
>
> ⭐ **117.797 sao**, 15.089 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 1.4.0)

## Là gì

Coding agent tối giản trên terminal, cùng một monorepo các package: `pi-ai` (API chung cho nhiều model), `pi-agent`, `pi-tui`, `pi-durable`, `pi-mcp`, `pi-codemode`, `pi-telemetry`…
Cố ý không có sub-agent hay plan mode. Muốn thêm thì tự bảo Pi viết hoặc cài package mở rộng.
Chú trọng chuỗi cung ứng:
- Dependency trực tiếp ghim đúng phiên bản.
- Installer khóa cả dependency bắc cầu.
- Cài bằng `--ignore-scripts`.
- Chạy cách ly được qua micro-VM Gondolin hoặc NVIDIA OpenShell.

## Đã test

| Bước | Kết quả |
|---|---|
| `curl -fsSL https://pi.dev/install.sh \| sh` | ⛔ pi.dev bị chặn trong môi trường test |
| `npm install --ignore-scripts @earendil-works/pi-coding-agent` | ✅ 9,3 giây, bản 1.4.0 |
| Thêm endpoint riêng qua `models.json` (`api: openai-completions`) | ✅ Làm theo đúng tài liệu |
| `pi --print --model mock/mock-model "<prompt>"` | ✅ Gọi tool `bash`, tạo `proof.txt` rồi trả lời |
| Request gửi model | **Chỉ 4 tool** (read, bash, edit, write), system prompt khoảng 3.100 ký tự cộng 3.000 ký tự schema. Qwen Code là khoảng 36.000 + 20.000, Hermes khoảng 12.000 + 37.600 |
| Chạy trong script không có stdin | ⚠️ Pi chờ đọc stdin nên bị treo. Thêm `< /dev/null` là chạy được |
| Chạy với model thật | ⛔ Không test (không có API key) |

## Kết luận nhanh

✅ Gọn nhất trong các coding agent tôi đã thử: prompt nhỏ nên rẻ và nhanh, hợp với model local. Cách làm chuỗi cung ứng nghiêm túc.
⚠️ Thiếu sẵn nhiều tính năng (sub-agent, plan mode), phải tự thêm. Khi gọi từ script nhớ đóng stdin.

## Cài đặt

```bash
curl -fsSL https://pi.dev/install.sh | sh          # khóa toàn bộ dependency
# hoặc: npm install -g --ignore-scripts @earendil-works/pi-coding-agent   (Node 22.19+)
cd your-project && pi
pi --print "tóm tắt repo này" < /dev/null          # chạy một lần trong script
```

Đặt `PI_OFFLINE=1` để tắt mọi request mạng tự động (cập nhật danh mục model).
