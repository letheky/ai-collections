# KiviDB

> Repo: https://github.com/kividbio/kividb · AGPL-3.0
>
> ⭐ **352 sao**, 14 fork (GitHub API, 2026-10-21) · Repo tạo 2026-10-16 · Đã test: 2026-10-21 (v1.1.0)

## Là gì

Database in-memory viết bằng Rust, tương thích giao thức Redis/Valkey (RESP), có sẵn **tìm kiếm full-text và vector**.

- **Kiến trúc:** đa luồng, dùng io_uring trên Linux.
- **Cổng mặc định:** 6380, để chạy song song được với Redis.

## Đã test

Chạy trên container 4 vCPU.

| Bước | Kết quả |
|---|---|
| `cargo build --release` | ✅ Mất **6 phút 46 giây**, binary 13,5 MB |
| Khởi động | ✅ Log báo I/O model `io_uring`, 32 shard mỗi DB. `INFO` trả về `kividb_version:1.1.0` và `redis_version:8.10.0` |
| Lệnh Redis cơ bản qua `redis-cli` | ✅ `PING`, `SET`, `INCR`, `HSET`, `HGETALL` đều đúng |
| Tìm kiếm vector: `FT.CREATE` HNSW, 64 chiều, cosine, nạp 5.000 vector bằng client Python `redis` | ✅ Nạp mất 3,49 giây (pipeline). Truy vấn KNN top 5 mất **1,17 ms**, **recall@5 = 1,0** so với tính chính xác |
| Tìm kiếm full-text `@title:` | ✅ Trả đúng 1 kết quả |
| Docker image `kividb/kividb` | ⛔ Không test (Docker Hub trả lỗi 429 do giới hạn lượt tải) |

**Benchmark so với Redis** (`redis-benchmark -n 200000 -c 50 -P 16`, cùng máy):

| | Throughput | p50 | p95 | p99 |
|---|--:|--:|--:|--:|
| SET · KiviDB | **543k req/s** | **0,78 ms** | 3,30 ms | 5,14 ms |
| SET · redis-server | 460k req/s | 1,44 ms | **2,42 ms** | **2,78 ms** |
| GET · KiviDB | **687k req/s** | **0,59 ms** | 3,34 ms | 5,01 ms |
| GET · redis-server | 513k req/s | 1,26 ms | **2,26 ms** | **2,57 ms** |

## Kết luận nhanh

✅ Tương thích Redis tốt, vector search chính xác.
Throughput và độ trễ trung vị (p50) **tốt hơn Redis khoảng 20–35%** trong phép đo này, **nhưng độ trễ đuôi (p95/p99) kém hơn**.
⚠️ Repo mới 5 ngày tuổi và dùng giấy phép AGPL. Nên chờ thêm trước khi đưa vào production.

## Cài đặt

```bash
cargo build --release
./target/release/kividb --port 6380
# hoặc: docker run -d -p 6380:6380 kividb/kividb
```
