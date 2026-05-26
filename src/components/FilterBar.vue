<script setup>
import { CATEGORIES } from '../utils/categories'

defineProps({
  currentCategory: { type: String, required: true },
  searchQuery: { type: String, required: true },
})

const emit = defineEmits(['update:searchQuery', 'set-category'])

const filterCategories = CATEGORIES.filter((c) => c.id !== 'all')
</script>

<template>
  <section
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sticky top-16 z-30 py-3 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm"
  >
    <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
      <div class="relative flex-1 max-w-md">
        <span
          class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"
        >
          <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          :value="searchQuery"
          placeholder="Tìm kiếm chủ đề bạn quan tâm..."
          class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all shadow-sm"
          @input="emit('update:searchQuery', $event.target.value)"
        />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
          :class="
            currentCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/10'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50'
          "
          @click="emit('set-category', 'all')"
        >
          Tất cả
        </button>
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
          :class="
            currentCategory === cat.id
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/10'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50'
          "
          @click="emit('set-category', cat.id)"
        >
          {{ cat.emoji }} {{ cat.label }}
        </button>
      </div>
    </div>
  </section>
</template>
