# Votely

Nền tảng bình chọn tối giản — trưng cầu ý kiến trên các chủ đề tranh luận với upvote/downvote, lọc theo danh mục và mã định danh ẩn danh lưu trên trình duyệt.

## Trang web PROD

**[https://stupendous-tiramisu-c47fa0.netlify.app/](https://stupendous-tiramisu-c47fa0.netlify.app/)**

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Deploy: [Netlify](https://www.netlify.com/) (`netlify.toml`)

## Phát triển

```bash
npm install
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173)

```bash
npm run build    # output → dist/
npm run preview  # xem bản build
```

## Cấu trúc

```
voting-site/
├── src/                 # Ứng dụng Vue (source chính)
├── raw_resource/        # Bản HTML gốc (tham chiếu, không deploy)
├── docs/                # Kiến trúc & quy ước
├── AGENTS.md            # Hướng dẫn cho AI agent
└── netlify.toml
```

## Tài liệu cho contributor / AI

- [AGENTS.md](./AGENTS.md) — đọc đầu tiên
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [docs/CONVENTIONS.md](./docs/CONVENTIONS.md)

## localStorage

Dữ liệu vote và mã định danh lưu trên máy người dùng (`votely_*` keys). Xem `src/constants/storage.js`.

## Giấy phép

Dự án demo cá nhân — tùy chỉnh theo nhu cầu của bạn.