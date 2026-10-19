# Seedance 2.0 Skill OS: agent viết prompt "đạo diễn" cho Seedance 2.0

> Nguồn: ảnh chụp do người dùng cung cấp ("Emily2040 / seedance-2.0").
> Repo: https://github.com/Emily2040/seedance-2.0. Ngày nghiên cứu: 2026-10-19. Phiên bản lúc nghiên cứu: v6.7.0.

## Tóm tắt

Đây là một **agent skill để lên kế hoạch và viết prompt** cho model video Seedance 2.0 (của ByteDance).
Bản thân skill **không tạo video**: bạn tự dùng nhà cung cấp video của mình để tạo, và tự trả chi phí ở đó.

- **Tác giả:** Emily (Iamemily2050).
- **Giấy phép:** MIT.
- **Ngôn ngữ tài liệu:** tiếng Anh, Trung, Nhật, Hàn, Tây Ban Nha, Nga. **Không có tiếng Việt.**

## Skill làm gì

- **Biến ý tưởng thành prompt theo từng shot**, dựa trên một "shot table" có thể kiểm tra bố cục trên giấy trước khi trả tiền render.
- **Nguyên tắc viết prompt cho model:**
  - Mỗi shot chỉ có một hành động chính; các nhân vật còn lại vẫn "sống".
  - Phản ứng được tả bằng một cảm xúc cộng một chi tiết cơ thể.
  - Cuối mỗi shot có một câu "khóa" nhắc lại ánh sáng, nhân vật và vị trí, vì model không nhớ gì qua cú cắt nếu prompt không lặp lại.
- **Sàng lọc kiểm duyệt trước:** bộ lọc của model chặn theo từ ngữ chứ không theo ý định, nên prompt được kiểm tra trước để khỏi bị từ chối.
- **Gắn tham chiếu và nối tiếp:** gắn ảnh/video tham chiếu, nối tiếp từ một clip đã ưng để làm video dài hơn một lần tạo.
- **Gallery mẫu:** 7 clip 15 giây kiểu phim ngắn có cú lật (short drama), mỗi clip kèm prompt và shot table.
  README cho thấy rõ khác biệt giữa prompt người ta hay gõ và prompt skill viết ra.

## Cài đặt

```bash
git clone https://github.com/Emily2040/seedance-2.0.git && cd seedance-2.0
python scripts/install_codex_skill.py --client codex --scope user
# Với Claude Code: dùng --dest để cài vào ~/.claude/skills/seedance-20/ hoặc .claude/skills/seedance-20/
```

Hỗ trợ Claude Code, Codex, Antigravity, OpenClaw, Hermes, Gemini CLI, Copilot, Cursor, Windsurf.

## Nhận xét

- **Tác giả khá trung thực về bằng chứng.** Mục "Evidence status" nói rõ:
  - Các bài kiểm tra trong repo chỉ kiểm cấu trúc, **không** chứng minh chất lượng video.
  - Điểm số trên model thật và pilot render 48 lần vẫn **đang chờ**.
  - Một số clip trong gallery chưa được render.
- **Hợp với ai:** người làm short drama, quảng cáo, video có kịch bản trên Seedance.
  Tiết kiệm được tiền bằng cách sửa bố cục trên giấy trước khi render. Kỹ thuật viết prompt cũng áp dụng được cho Veo hay Kling.
- **Cần tài khoản Seedance riêng** (BytePlus/Volcengine hoặc bên trung gian) để tạo video.
- **Liên quan:** [Scenario skills](../game/scenario-skills.md) có `scenario-seedance` để gọi Seedance qua MCP của Scenario;
  [OpenMontage](openmontage.md) điều phối cả quy trình sản xuất.
