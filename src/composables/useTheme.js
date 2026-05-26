import { ref, onMounted } from 'vue'
import { STORAGE_KEYS } from '../constants/storage'

export function useTheme() {
  const isDark = ref(false)

  function applyTheme(dark) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEYS.colorTheme)
    const prefersDark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    applyTheme(prefersDark)
  }

  function toggleTheme() {
    const next = !isDark.value
    applyTheme(next)
    localStorage.setItem(STORAGE_KEYS.colorTheme, next ? 'dark' : 'light')
  }

  onMounted(initTheme)

  return { isDark, toggleTheme, initTheme }
}
