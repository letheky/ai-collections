# Seedance 2.0 Skill OS

> Repo: https://github.com/Emily2040/seedance-2.0 · MIT · Phiên bản v6.7.0
>
> ⭐ **7.771 sao**, 1.133 fork (GitHub API, 2026-10-19) · Đã test: 2026-10-19

## Là gì

Agent skill giúp **lên shot và viết prompt** cho model video Seedance 2.0. Skill không tự tạo video: bạn dùng nhà cung cấp Seedance riêng và tự trả phí.

Repo có **28 skill**:
- Kỹ thuật quay: prompt, camera, lighting, motion, characters, continuation, sequence, vfx, audio.
- An toàn nội dung: filter, copyright, antislop.
- Từ vựng 6 ngôn ngữ: en, zh, ja, ko, es, ru. **Không có tiếng Việt.**

Còn có các script Python để lint prompt, kiểm tra shot table và sàng lọc từ ngữ dễ bị kiểm duyệt chặn.

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install --require-hashes -r requirements-validation.lock` + `python scripts/validate_repo.py --release` | ✅ **PASS 19/19** bước kiểm tra (unittest OK, bỏ qua 57), mất **9 phút 20 giây**. Chỉ kiểm tra cấu trúc, không đánh giá chất lượng video |
| `moderation_prescreen.py` trên một prompt mẫu có "knife", "gun", "blood" | ✅ Báo **2 cảnh báo mức high** (nhóm weapon: gun, knife; nhóm injury: blood). Lưu ý: script chỉ quét prompt nằm trong khối code hoặc blockquote |
| Tạo video thật | ⛔ Không test (cần tài khoản Seedance) |

## Kết luận nhanh

✅ Kiểm tra chất lượng repo nghiêm túc. Công cụ sàng lọc kiểm duyệt hữu ích để tránh bị từ chối và mất tiền render.
Chưa có số liệu nào chứng minh video đẹp hơn.

## Cài đặt

```bash
git clone https://github.com/Emily2040/seedance-2.0.git && cd seedance-2.0
python scripts/install_codex_skill.py --client codex --scope user
# Với Claude Code: dùng --dest ~/.claude/skills/seedance-20/
```
