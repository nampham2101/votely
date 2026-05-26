<script setup>
defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmLabel: { type: String, required: true },
  variant: { type: String, default: 'rose' },
})

const emit = defineEmits(['close', 'confirm'])

const iconClass = {
  rose: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400',
  amber: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
}

const confirmClass = {
  rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/10',
  amber: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10',
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300"
    >
      <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="emit('close')"></div>

      <div
        class="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800/50 transition-all duration-300 ease-out scale-100 opacity-100"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          :class="iconClass[variant] ?? iconClass.rose"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              v-if="variant === 'amber'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">{{ title }}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{{ message }}</p>

        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            @click="emit('close')"
          >
            Hủy
          </button>
          <button
            type="button"
            class="flex-1 py-3 rounded-xl text-white font-semibold text-xs transition-all shadow-lg"
            :class="confirmClass[variant] ?? confirmClass.rose"
            @click="emit('confirm')"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
