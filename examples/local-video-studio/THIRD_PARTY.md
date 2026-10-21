# Nguồn và phạm vi

Các script điều phối và 10 bản thuyết minh trong thư mục này được viết cho dự án local. Thư mục không phân phối trọng số model, mã nguồn vendored, bộ cài, âm thanh hay video đã tạo.

- Wan2.2: https://github.com/Wan-Video/Wan2.2, mã nguồn kiểm tra tại commit `1ea34ff48f87168174e12956e200b1d908b1c5ff`; model https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B. Giữ các thông báo và giấy phép Apache-2.0 của upstream khi lấy source/model.
- VieNeu-TTS: https://github.com/pnnbao97/VieNeu-TTS; giọng Ngọc Linh, VieNeu v3 Turbo. Ghi công Phạm Nguyễn Ngọc Bảo. Trọng số: https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo.
- PyTorch, Diffusers, Transformers, ONNX Runtime, FFmpeg, ImageIO và Pillow là dependency độc lập, có giấy phép/thông báo riêng. Bản FFmpeg đi kèm imageio-ffmpeg không được đưa vào repo này.
- Các URL khoa học trong `series/series.json` và `demo/SOURCES.md` hỗ trợ nội dung lời dẫn. Hình Wan là minh họa AI, không phải ảnh NASA/NOAA hay dữ liệu quan trắc.

Các bài nghiên cứu về OpenMontage/Herk/Seedance/HyperFrames trong bộ sưu tập là tài liệu tham khảo cho quy trình. Bộ runtime này chưa tích hợp những hệ thống đó.
