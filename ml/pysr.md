# PySR

> Repo: https://github.com/astroautomata/PySR · Apache-2.0 · PyPI `pysr`
>
> ⭐ **4.182 sao**, 386 fork (GitHub API, 2026-10-26) · Đã test: 2026-10-26 (bản 2.7.2)
>
> 🎬 **Demo đã dựng:** https://claude.ai/artifact/UyeEfqbRo4yrTizUCYMV1j (đường Pareto khi tìm lại một công thức đã biết)

## Là gì

Thư viện hồi quy biểu tượng (symbolic regression): thay vì huấn luyện một mạng nơ-ron "hộp đen", nó dùng giải thuật tiến hóa để tìm **công thức toán tường minh** khớp với dữ liệu.
Giao diện Python giống scikit-learn (`PySRRegressor`), phần lõi chạy bằng Julia (SymbolicRegression.jl). Kết quả là một dãy công thức từ đơn giản đến phức tạp, xuất được sang SymPy, PyTorch, JAX hoặc LaTeX. Dự án có từ năm 2020, hay được dùng để tìm định luật vật lý từ dữ liệu đo.

## Đã test

| Bước | Kết quả |
|---|---|
| `pip install pysr` | ✅ 3,7 giây, bản 2.7.2 |
| Cài Julia và gói lõi (tự động ở lần `import` đầu tiên) | ⚠️ Máy test chặn trang tải Julia, nên tôi lấy Julia 1.13.2 từ conda-forge. Cài 138 gói Julia mất khoảng 7 phút, chiếm khoảng 1 GB |
| `import pysr` | ⚠️ 9,1 giây. Phải nạp OpenSSL của conda trước do xung đột thư viện. Lỗi này đến từ cách tôi phải cài vòng, cài bình thường sẽ không gặp |
| Dữ liệu: 200 điểm từ `y = x0² + 2,5·cos(x2) − 2`, có thêm biến nhiễu x1. Chạy 40 vòng | ⚠️ 9,5 giây. Chưa tìm ra công thức gốc mà dùng cos để xấp xỉ x0², sai số 0,008 |
| Cùng dữ liệu, 200 vòng | ✅ 19,5 giây. Tìm **đúng** `x0·x0 + cos(x2)·2,5 − 2,0`, sai số 7e-14, và bỏ qua biến nhiễu x1 |

## Kết luận nhanh

✅ Tìm lại được đúng công thức ẩn trong dữ liệu, kết quả dễ hiểu và dễ kiểm tra. Hợp cho khoa học dữ liệu, vật lý, kỹ thuật, khi bạn cần một phương trình thay vì một mô hình hộp đen.
⚠️ Lần đầu phải tải Julia và biên dịch gói, mất vài phút. Chạy ít vòng thì dễ ra công thức "khớp mà sai bản chất", nên hãy tăng `niterations` và xem cả đường Pareto, đừng chỉ lấy dòng tốt nhất.

## Cài đặt

```bash
pip install pysr
python -c "import pysr"        # lần đầu tự cài Julia + SymbolicRegression.jl
```

```python
from pysr import PySRRegressor
m = PySRRegressor(niterations=200, binary_operators=["+", "-", "*", "/"], unary_operators=["cos", "exp"])
m.fit(X, y)
print(m.sympy())               # công thức tốt nhất
print(m.equations_)            # cả đường Pareto
```
