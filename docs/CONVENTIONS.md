# Quy ước code

## Vue

- Composition API + `<script setup>` only
- Logic chia sẻ → `composables/`
- Presentational UI → `components/`
- Không dùng Pinia/Vuex trừ khi state phình to rõ ràng

## Tailwind

- `darkMode: 'class'` — toggle qua `document.documentElement`
- Màu vote: emerald (up), rose (down), indigo (brand/active filter)
- Utility tùy chỉnh: `btn-bounce`, `no-scrollbar`, `animate-shake` trong `src/style.css`

## Đặt tên

- File component: PascalCase (`TopicCard.vue`)
- Composables: `useXxx.js`
- Category ids: English slug (`tech`, `lifestyle`, `society`, `future`)
- UI strings: tiếng Việt

## Commit message (gợi ý)

- Tiếng Anh ngắn, imperative: `Add topic filter for …`, `Fix vote toggle on …`

## Không commit

- `node_modules/`, `dist/`, `.idea/`, `.env`
