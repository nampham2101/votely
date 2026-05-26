<script setup>
import { CONTACT_EMAIL } from '../constants/site'

const emit = defineEmits(['reset-all'])
</script>

<template>
  <footer
    class="border-t border-slate-200/50 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 transition-colors"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between gap-4"
    >
      <p class="text-xs text-slate-400 order-2 sm:order-1">
        &copy; 2026 Votely App. Thiết kế tối giản tối ưu cho trải nghiệm tĩnh.
      </p>

      <div
        class="mt-4 sm:mt-0 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium order-1 sm:order-2"
      >
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="hover:text-indigo-500 transition-colors"
        >
          Liên hệ
        </a>
        <span class="text-slate-300 dark:text-slate-800">&bull;</span>
        <a href="#" class="hover:text-indigo-500 transition-colors">Điều khoản</a>
        <span class="text-slate-300 dark:text-slate-800">&bull;</span>
        <a href="#" class="hover:text-indigo-500 transition-colors">Bảo mật</a>
        <span class="text-slate-300 dark:text-slate-800">&bull;</span>
        <button
          type="button"
          class="hover:text-red-500 transition-colors"
          @click="emit('reset-all')"
        >
          Reset dữ liệu gốc
        </button>
      </div>
    </div>
  </footer>
</template>
