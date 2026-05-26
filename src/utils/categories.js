export const CATEGORIES = [
  { id: 'all', label: 'Tất cả', emoji: null },
  { id: 'tech', label: 'Công nghệ', emoji: '👨‍💻' },
  { id: 'lifestyle', label: 'Đời sống', emoji: '🍀' },
  { id: 'society', label: 'Tranh cãi', emoji: '🗣️' },
  { id: 'future', label: 'Tương lai', emoji: '🚀' },
]

export function getCategoryEmoji(cat) {
  const found = CATEGORIES.find((c) => c.id === cat)
  return found?.emoji ?? '📌'
}

export function getCategoryName(cat) {
  const found = CATEGORIES.find((c) => c.id === cat)
  return found?.label ?? 'Tổng hợp'
}
