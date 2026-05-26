<script setup>
import { computed } from 'vue'
import { getCategoryEmoji, getCategoryName } from '../utils/categories'

const props = defineProps({
  topic: { type: Object, required: true },
  userVote: { type: String, default: undefined },
})

const emit = defineEmits(['vote'])

const total = computed(() => props.topic.upVotes + props.topic.downVotes)
const upPercentage = computed(() =>
  total.value > 0 ? Math.round((props.topic.upVotes / total.value) * 100) : 50,
)
const downPercentage = computed(() =>
  total.value > 0 ? 100 - upPercentage.value : 50,
)
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between"
  >
    <div>
      <div class="flex items-center justify-between mb-4">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        >
          {{ getCategoryEmoji(topic.category) }} {{ getCategoryName(topic.category) }}
        </span>
        <span class="text-[11px] text-slate-400 font-medium">Tổng số: {{ total }} vote</span>
      </div>
      <h3
        class="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug line-clamp-3"
      >
        {{ topic.title }}
      </h3>
    </div>

    <div class="mt-6 space-y-4">
      <div class="space-y-1">
        <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            class="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-500"
            :style="{ width: `${upPercentage}%` }"
          ></div>
          <div
            class="bg-gradient-to-r from-rose-400 to-pink-500 h-full transition-all duration-500"
            :style="{ width: `${downPercentage}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
          <span class="text-emerald-500 dark:text-emerald-400">{{ upPercentage }}% Đồng thuận</span>
          <span class="text-rose-500 dark:text-rose-400">{{ downPercentage }}% Phản đối</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          class="btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-2xl border text-xs font-bold transition-all"
          :class="
            userVote === 'up'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent'
              : 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100/50 dark:border-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-transparent dark:hover:bg-emerald-600'
          "
          @click="emit('vote', topic.id, 'up')"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
          </svg>
          <span>Up ({{ topic.upVotes }})</span>
        </button>
        <button
          type="button"
          class="btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-2xl border text-xs font-bold transition-all"
          :class="
            userVote === 'down'
              ? 'bg-rose-500 hover:bg-rose-600 text-white border-transparent'
              : 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-100/50 dark:border-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white hover:border-transparent dark:hover:bg-rose-600'
          "
          @click="emit('vote', topic.id, 'down')"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
          <span>Down ({{ topic.downVotes }})</span>
        </button>
      </div>
    </div>
  </div>
</template>
