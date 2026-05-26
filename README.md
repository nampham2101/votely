# Votely

Nền tảng bình chọn tối giản — trưng cầu ý kiến trên các chủ đề tranh luận với upvote/downvote, lọc theo danh mục và mã định danh ẩn danh lưu trên trình duyệt.

## Trang web PROD

**[https://stupendous-tiramisu-c47fa0.netlify.app/](https://stupendous-tiramisu-c47fa0.netlify.app/)**

## Tính năng

- Bình chọn **Up** / **Down** trên 30 chủ đề mẫu (Công nghệ, Đời sống, Tranh cãi, Tương lai)
- Tìm kiếm, lọc danh mục, sắp xếp (mặc định / nhiều vote / nhiều upvote)
- Mã định danh 9 chữ số (`xxx xxx xxx`) để chống spam — chỉ lưu trên máy người dùng
- Giao diện sáng/tối, toast thông báo, reset dữ liệu gốc

## Công nghệ

- Một file tĩnh: `index.html`
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- Lưu trữ cục bộ: `localStorage` (`votely_userId`, `votely_userVotes`, `votely_topics`)

## Chạy local

Không cần build. Mở trực tiếp file hoặc phục vụ bằng HTTP tĩnh:

```bash
# Ví dụ với Python
python3 -m http.server 8080
```

Sau đó truy cập `http://localhost:8080` (mở `index.html`).

## Triển khai

Site PROD được host trên [Netlify](https://www.netlify.com/). Deploy bằng cách đẩy repo và trỏ Netlify tới thư mục gốc (file `index.html`).

## Cấu trúc

```
voting-site/
├── index.html    # Toàn bộ UI + logic
└── README.md
```

## Giấy phép

Dự án demo cá nhân — tùy chỉnh theo nhu cầu của bạn.
