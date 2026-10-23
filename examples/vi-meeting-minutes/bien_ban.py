#!/usr/bin/env python3
"""Tạo biên bản cuộc họp tiếng Việt từ file JSON của WhisperX.

Chỉ dùng thư viện chuẩn của Python. Gọi bất kỳ endpoint nào tương thích
OpenAI (Ollama, LM Studio, OpenAI, OpenRouter...).

Ví dụ:
  python3 bien_ban.py hop.json --speakers "SPEAKER_00=Anh Nam,SPEAKER_01=Chị Lan"
  python3 bien_ban.py hop.json --base-url https://api.openai.com/v1 --model gpt-5.5
"""
import argparse
import json
import os
import sys
import urllib.request

MAU = """Bạn là thư ký cuộc họp. Từ bản ghi lời nói bên dưới, hãy viết BIÊN BẢN CUỘC HỌP bằng tiếng Việt, định dạng Markdown, đúng các mục:

# Biên bản cuộc họp
- **Thời lượng:** {thoi_luong}
- **Thành phần tham dự:** (liệt kê người nói)
## 1. Nội dung chính
(gạch đầu dòng theo từng chủ đề, ghi rõ ai nêu ý kiến)
## 2. Các quyết định
## 3. Việc cần làm
| Việc | Người phụ trách | Hạn |
|---|---|---|
## 4. Vấn đề còn bỏ ngỏ

Quy tắc:
- Chỉ dùng thông tin có trong bản ghi. Không bịa tên, số liệu, hạn chót. Thiếu thì ghi "chưa rõ".
- Bản ghi do máy nhận dạng nên có thể sai chính tả hoặc nghe nhầm. Từ nào không chắc thì giữ nguyên và đánh dấu (?).
- Viết ngắn gọn, khách quan.

BẢN GHI:
{ban_ghi}"""

MAU_GOP = """Dưới đây là các biên bản nháp của từng phần của CÙNG MỘT cuộc họp (thời lượng {thoi_luong}).
Hãy gộp thành MỘT biên bản hoàn chỉnh theo đúng cấu trúc đó: bỏ trùng lặp, giữ mọi quyết định và việc cần làm, không thêm thông tin mới.

{cac_phan}"""


def hms(s):
    s = int(s)
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def doc_ban_ghi(path, ten):
    data = json.load(open(path, encoding="utf-8"))
    dong, cuoi, truoc = [], 0.0, None
    for seg in data.get("segments", []):
        text = seg.get("text", "").strip()
        if not text:
            continue
        nguoi = ten.get(seg.get("speaker"), seg.get("speaker", "Người nói ?"))
        cuoi = max(cuoi, float(seg.get("end", 0)))
        if nguoi == truoc and dong:
            dong[-1] += " " + text  # gộp các câu liên tiếp của cùng một người
        else:
            dong.append(f"[{hms(seg.get('start', 0))}] {nguoi}: {text}")
        truoc = nguoi
    return dong, cuoi


def chia_doan(dong, toi_da):
    doan, cur, n = [], [], 0
    for d in dong:
        if cur and n + len(d) > toi_da:
            doan.append(cur)
            cur, n = [], 0
        cur.append(d)
        n += len(d) + 1
    if cur:
        doan.append(cur)
    return doan


def goi_llm(args, prompt):
    body = json.dumps({"model": args.model, "temperature": 0.2,
                       "messages": [{"role": "user", "content": prompt}]}).encode()
    req = urllib.request.Request(args.base_url.rstrip("/") + "/chat/completions", data=body,
                                 headers={"Content-Type": "application/json",
                                          "Authorization": f"Bearer {args.api_key}"})
    with urllib.request.urlopen(req, timeout=args.timeout) as r:
        return json.load(r)["choices"][0]["message"]["content"].strip()


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("json", help="file .json do whisperx xuất ra")
    p.add_argument("-o", "--out", help="file biên bản (mặc định: <tên>.bien-ban.md)")
    p.add_argument("--speakers", default="", help='đổi nhãn người nói, vd "SPEAKER_00=Anh Nam,SPEAKER_01=Chị Lan"')
    p.add_argument("--base-url", default=os.environ.get("LLM_BASE_URL", "http://localhost:11434/v1"))
    p.add_argument("--model", default=os.environ.get("LLM_MODEL", "qwen3:8b"))
    p.add_argument("--api-key", default=os.environ.get("LLM_API_KEY", "ollama"))
    p.add_argument("--chunk-chars", type=int, default=12000, help="độ dài tối đa mỗi phần gửi cho LLM")
    p.add_argument("--timeout", type=int, default=600)
    args = p.parse_args()

    ten = dict(x.split("=", 1) for x in args.speakers.split(",") if "=" in x)
    dong, cuoi = doc_ban_ghi(args.json, ten)
    if not dong:
        sys.exit("Không có lời nói nào trong file JSON.")
    thoi_luong = hms(cuoi)
    base = os.path.splitext(args.json)[0]

    open(base + ".transcript.txt", "w", encoding="utf-8").write("\n".join(dong) + "\n")
    doan = chia_doan(dong, args.chunk_chars)
    nhap = []
    for i, d in enumerate(doan, 1):
        print(f"[{i}/{len(doan)}] gửi {sum(map(len, d))} ký tự cho {args.model}...", file=sys.stderr)
        nhap.append(goi_llm(args, MAU.format(thoi_luong=thoi_luong, ban_ghi="\n".join(d))))
    if len(nhap) == 1:
        ket_qua = nhap[0]
    else:
        print("Gộp các phần thành một biên bản...", file=sys.stderr)
        cac_phan = "\n\n".join(f"--- PHẦN {i} ---\n{t}" for i, t in enumerate(nhap, 1))
        ket_qua = goi_llm(args, MAU_GOP.format(thoi_luong=thoi_luong, cac_phan=cac_phan))

    out = args.out or base + ".bien-ban.md"
    open(out, "w", encoding="utf-8").write(ket_qua + "\n")
    print(f"Đã ghi {out} và {base}.transcript.txt ({len(dong)} lượt nói, {thoi_luong}).", file=sys.stderr)


if __name__ == "__main__":
    main()
