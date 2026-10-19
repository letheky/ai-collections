# OpenMontage: biến coding agent thành xưởng phim AI

> Nguồn: reel của "Beeknoee AI" do người dùng cung cấp ("46.081 sao, video từ $0.02, AGPL-3.0").
> Repo: https://github.com/calesthio/OpenMontage. Ngày nghiên cứu: 2026-10-19.

## Tóm tắt

OpenMontage tự giới thiệu là "hệ thống sản xuất video agentic mã nguồn mở đầu tiên".
Bạn mô tả video bằng lời, coding agent (Claude Code, Cursor…) sẽ lo trọn quy trình:
nghiên cứu → viết kịch bản → tạo hoặc tìm tư liệu → dựng → render.

- **Giấy phép:** AGPLv3.
- **Đặc điểm nổi bật:**
  - Có nhiều pipeline: explainer, documentary montage, character animation, trailer, product film…
  - Ra đề xuất với 2–3 concept, kèm **ước tính chi phí** trước khi chạy.
  - Có bước duyệt storyboard trước khi tạo tư liệu.
  - Bảng "Backlot" chạy cục bộ, hiển thị tiến độ và số tiền đã tiêu.
- **Hai engine dựng:** Remotion (React) và HyperFrames (HTML/GSAP). Hậu kỳ bằng FFmpeg. Có thể dùng Blender cho 3D.
- **Có thể bắt đầu từ một video mẫu:** dán link YouTube hoặc Reel bạn thích, agent phân tích nhịp và hook rồi làm bản tương tự.

## Kiểm chứng reel

| Nhận định | Kết quả | Ghi chú |
|---|---|---|
| 46.081 sao | ⚠️ Không kiểm chứng được con số chính xác | Star History ghi 55.9k (ngày 2026-09-04). Có thể reel dùng số cũ hơn, hoặc nguồn khác nhau. Repo tăng sao rất nhanh. |
| AGPL-3.0, mã nguồn mở | ✅ Đúng | Nếu sửa rồi cung cấp dưới dạng dịch vụ mạng thì phải công bố source. |
| Hỗ trợ Claude Code, Cursor, FFmpeg, Remotion | ✅ Đúng | Có thêm HyperFrames và Blender. |
| "Video hoàn chỉnh chỉ 2 xu ($0.02)" | ⚠️ README không có con số này | README chia mức chi phí như sau: <br>• **0 USD** nếu không dùng API key: giọng Piper TTS chạy offline, footage từ Archive.org/NASA/Wikimedia/Pexels, dựng bằng Remotion/HyperFrames. <br>• **~0.15–1.50 USD** nếu có provider ảnh/video. <br>• **~1–3 USD** với bộ đầy đủ. <br>Các phim mẫu: "The Last Banana" 1.33 USD, "Reimagine Your Universe" khoảng 4 USD. <br>Con số 0.02 USD có thể là trường hợp chỉ tốn tiền một thứ nhỏ như TTS. Dù sao thì **token của LLM điều khiển agent** cũng không được tính vào. |

## Cài đặt

```bash
git clone https://github.com/calesthio/OpenMontage && cd OpenMontage
make setup        # tạo venv Python, cài requirements, npm install cho remotion-composer, cài piper-tts, tạo .env
# hoặc làm thủ công theo README nếu máy không có make
```

Yêu cầu: Python, Node.js, FFmpeg. Thêm API key nào thì mở khóa thêm provider đó (Veo, Kling qua fal.ai, Google Chirp TTS, ElevenLabs…).

## Lưu ý

- **"Từ $0.02" chỉ là chi phí tạo tư liệu.** Bản thân agent (Claude Code, Cursor) tiêu nhiều token, nhất là với pipeline dài.
- **Đường không mất tiền:** dùng ảnh tĩnh + Remotion, hoặc ghép footage có sẵn. Chất lượng kém hơn nhiều so với phim mẫu dùng Veo hay Kling.
- **Bản quyền:** footage tải từ archive hoặc stock vẫn có giấy phép riêng, cần kiểm tra trước khi dùng thương mại.
  Tính năng "làm giống video bạn thích" dễ đi tới chỗ sao chép ý tưởng của người khác; nên dùng để học nhịp và cấu trúc.
- **Liên quan:** cùng nhóm với [lemo-opuscar](lemo-opuscar.md) và các repo HyperFrames/Remotion trong [animation/claude-motion-studio-15-repos.md](../animation/claude-motion-studio-15-repos.md).
  Điểm khác của OpenMontage: đây là "xưởng" điều phối nhiều provider AI, chứ không phải dựng thuần bằng code.

## Nguồn

- https://github.com/calesthio/OpenMontage
- https://openmontage.video
- https://www.star-history.com/calesthio/openmontage
- https://ossinsight.io/analyze/calesthio/OpenMontage
