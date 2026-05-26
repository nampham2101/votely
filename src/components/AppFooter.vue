<script setup>
const emit = defineEmits(['reset-all'])
</script>

<template>
  <footer
    class="border-t border-slate-200/50 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 transition-colors"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between"
    >
      <p class="text-xs text-slate-400">
        &copy; 2026 Votely App. Thiết kế tối giản tối ưu cho trải nghiệm tĩnh.
      </p>
      <div class="mt-4 sm:mt-0 flex justify-center gap-4 text-xs text-slate-400 font-medium">
        <a href="#" class="hover:text-indigo-500 transition-colors">Điều khoản</a>
        <span>&bull;</span>
        <a href="#" class="hover:text-indigo-500 transition-colors">Bảo mật</a>
        <span>&bull;</span>
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
