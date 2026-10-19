# VoiceStudio

> Repo: https://github.com/debpalash/VoiceStudio · Code AGPL-3.0; trọng số model có giấy phép riêng
>
> ⭐ **75.581 sao**, 8.280 fork (GitHub API, 2026-10-19) · Đã thử cài: 2026-10-19

## Là gì (theo repo)

App desktop (Electron) kèm dịch vụ giọng nói chạy cục bộ: TTS, clone giọng, thiết kế giọng, lồng tiếng video, audiobook, chuyển giọng nói thành chữ.
Bên trong là bộ định tuyến nhiều engine. Mặc định là OmniVoice; ngoài ra có VoxCPM2, CosyVoice 3, IndexTTS 2.5, MOSS-TTS…

- **API cục bộ:** cổng `127.0.0.1:3900`, tương thích OpenAI, kèm MCP server.
- **Ngôn ngữ:** `docs/languages.md` liệt kê 646 ngôn ngữ cho OmniVoice. **Tiếng Việt (`vi`) có khoảng 8.482 giờ** dữ liệu huấn luyện, xếp khoảng thứ 13 (tiếng Anh 206k giờ).
- **Phần cứng:** OmniVoice khuyến nghị tối thiểu **6 GB VRAM**. Có bản GGUF cho máy yếu. Chạy được trên CUDA, ROCm (Linux), Apple MPS/MLX và CPU.
- **Giấy phép trọng số:** OmniVoice (mặc định), OmniVoice-GGUF và NLLB-200 (dùng để dịch khi lồng tiếng) đều là **CC-BY-NC**, tức **không được dùng thương mại**.

## Đã thử

| Bước | Kết quả |
|---|---|
| Clone repo | ✅ 127 MB. Gói Python `omnivoice` phiên bản 0.5.7 |
| `node scripts/setup-api.mjs` (uv, chọn bản CPU) | ❌ **Thất bại**: không tải được wheel PyTorch CPU từ `download-r2.pytorch.org` vì proxy của môi trường test chặn |
| Tạo giọng / clone giọng | ⛔ Không test được: thiếu PyTorch, và trọng số model nằm trên Hugging Face (cũng bị chặn). 134 file Python có tham chiếu tải từ Hugging Face |

## Kết luận nhanh

⚠️ Chưa xác minh được chất lượng giọng. Về giấy phép thì rõ ràng: cấu hình mặc định **không dùng thương mại được** vì trọng số là CC-BY-NC.
Dùng cá nhân thì cần GPU từ 6 GB VRAM và mạng truy cập được PyTorch cùng Hugging Face.

## Cài đặt (theo README)

```bash
curl -fsSL https://voicestudio.sh/install | sh      # macOS/Linux
# hoặc từ source
bun install && bun run setup:api && bun run dev
```

Bộ cài cho Windows và macOS chưa được ký số hoặc notarize, nên hệ điều hành sẽ hiện cảnh báo.
