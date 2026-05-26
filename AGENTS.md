# Votely — hướng dẫn cho AI agent

Đọc file này trước khi sửa code. Không cần hỏi user các thông tin đã ghi ở đây.

## Sản phẩm

**Votely** — trang trưng cầu ý kiến tiếng Việt: 30 chủ đề, upvote/downvote, lọc danh mục, tìm kiếm, dark mode.

- **PROD:** https://stupendous-tiramisu-c47fa0.netlify.app/
- **Repo GitHub:** `nampham2101/votely`
- **Ngôn ngữ UI:** tiếng Việt (giữ nguyên copy khi sửa)

## Stack (bắt buộc)

| Layer | Công nghệ |
|-------|-----------|
| Build | Vite 6 |
| UI | Vue 3 (Composition API, `<script setup>`) |
| CSS | Tailwind CSS 3 (`darkMode: 'class'`) |
| Font | Plus Jakarta Sans (Google Fonts) |
| Deploy | Netlify → `npm run build` → thư mục `dist/` |

## Cấu trúc thư mục

```
voting-site/
├── raw_resource/index.html   # Bản HTML gốc (tham chiếu, KHÔNG deploy)
├── src/
│   ├── App.vue               # Layout chính, wire composables
│   ├── main.js
│   ├── style.css             # Tailwind directives + custom utilities
│   ├── data/initialTopics.js # 30 chủ đề seed
│   ├── constants/storage.js  # localStorage keys
│   ├── composables/          # useVotely, useTheme, useToast
│   ├── components/           # UI tách theo vùng
│   └── utils/categories.js
├── docs/                     # Chi tiết kiến trúc & quy ước
├── netlify.toml
└── index.html                # Vite entry (khác raw_resource)
```

## localStorage (KHÔNG đổi key)

Giữ tương thích người dùng đã vote trên bản cũ:

| Key | Nội dung |
|-----|----------|
| `votely_userId` | Chuỗi `xxx xxx xxx` |
| `votely_userVotes` | JSON `{ topicId: 'up' \| 'down' }` |
| `votely_topics` | JSON mảng topic (upVotes, downVotes, …) |
| `color-theme` | `'light'` \| `'dark'` |

Logic vote: toggle cùng nút = thu hồi; đổi nút = chuyển vote; chưa có ID → mở `AuthModal` → lưu pending vote.

## Lệnh thường dùng

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Liên hệ (footer)

- Email: `allstarsmen@gmail.com` — constant `src/constants/site.js` (`CONTACT_EMAIL`)

## Quy tắc khi chỉnh sửa

1. **Đừng sửa** `raw_resource/` trừ khi user yêu cầu đồng bộ bản gốc.
2. Thêm chủ đề mới → `src/data/initialTopics.js` (+ cập nhật hero text nếu đổi số lượng).
3. Danh mục: `tech` \| `lifestyle` \| `society` \| `future` — cập nhật `src/utils/categories.js` nếu thêm category.
4. Giữ UI/UX và class Tailwind nhất quán với hiện tại (indigo brand, emerald up, rose down).
5. Chưa có backend — vote chỉ trên client. Muốn sync server → xem `docs/ROADMAP.md`.

## Tài liệu chi tiết

- `docs/ARCHITECTURE.md` — luồng dữ liệu & component
- `docs/CONVENTIONS.md` — style code Vue/Tailwind
- `docs/ROADMAP.md` — ý tưởng tương lai (API, i18n, …)

## Netlify

`netlify.toml` đã cấu hình `build` + `publish = dist`. Sau khi push `main`, Netlify tự build nếu site đã nối repo.
