<script setup>
defineProps({
  userId: { type: String, default: null },
  isDark: { type: Boolean, required: true },
})

const emit = defineEmits(['toggle-theme', 'clear-identity'])
</script>

<template>
  <header
    class="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-900 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25"
        >
          V
        </div>
        <div>
          <span
            class="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-300"
            >Votely.</span
          >
          <span class="text-[10px] block font-medium text-slate-400 -mt-1 uppercase tracking-wider"
            >Trưng cầu ý kiến</span
          >
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div
          v-if="userId"
          class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-xs"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-slate-500 dark:text-slate-400">ID:</span>
          <span class="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{{ userId }}</span>
          <button
            type="button"
            title="Xóa mã định danh"
            class="text-slate-400 hover:text-red-500 ml-1 transition-colors"
            @click="emit('clear-identity')"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
          @click="emit('toggle-theme')"
        >
          <svg v-if="isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 4.343l-.707-.707M14.828 14.828a4 4 0 11-5.656-5.656 4 4 0 015.656 5.656z"
            />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
