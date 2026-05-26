<script setup>
defineProps({
  toasts: { type: Array, required: true },
})

const iconByType = {
  info: {
    color: 'text-indigo-400',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    color: 'text-emerald-400',
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  error: {
    color: 'text-rose-400',
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
}

/** Fixed high-contrast styles — không đổi theo light/dark mode của trang */
function toastClasses(type) {
  if (type === 'success') {
    return 'bg-emerald-950 border-emerald-800/60 text-emerald-50'
  }
  if (type === 'error') {
    return 'bg-rose-950 border-rose-900/60 text-rose-50'
  }
  return 'bg-slate-900 border-slate-800 text-white'
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-3 p-4 rounded-2xl border shadow-xl pointer-events-auto"
        :class="toastClasses(toast.type)"
      >
        <div :class="iconByType[toast.type]?.color ?? iconByType.info.color">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconByType[toast.type]?.path ?? iconByType.info.path"
            />
          </svg>
        </div>
        <div class="text-xs font-semibold">{{ toast.message }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
