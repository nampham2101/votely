# Roadmap (tham khảo — chưa triển khai)

Các hạng mục dưới đây **chưa có** trong code. Agent chỉ implement khi user yêu cầu.

## Backend / sync vote

- API REST hoặc Supabase/Firebase để vote đồng bộ đa thiết bị
- Netlify Functions hoặc serverless tương đương

## Sản phẩm

- Thêm/sửa/xóa chủ đề từ admin (hiện chỉ seed cố định)
- Export kết quả (CSV/JSON)
- Chia sẻ link chủ đề (deep link — cần router, ví dụ Vue Router)

## Kỹ thuật

- Unit test (Vitest) cho `useVotely` vote logic
- E2E (Playwright) flow vote + auth modal
- i18n (vue-i18n) nếu cần đa ngôn ngữ

## Deploy

- Preview deploy per PR trên Netlify (nếu bật trong dashboard)
