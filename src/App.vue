<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FilterBar from './components/FilterBar.vue'
import TopicCard from './components/TopicCard.vue'
import AppFooter from './components/AppFooter.vue'
import AuthModal from './components/AuthModal.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import { useTheme } from './composables/useTheme'
import { useToast } from './composables/useToast'
import { useVotely } from './composables/useVotely'

const { isDark, toggleTheme, initTheme } = useTheme()
initTheme()

const { toasts, showToast } = useToast()

const {
  userId,
  userVotes,
  topics,
  currentCategory,
  searchQuery,
  sortBy,
  filteredTopics,
  showAuthModal,
  showDeleteModal,
  showResetModal,
  authShake,
  handleVote,
  saveIdentity,
  closeAuthModal,
  triggerAuthShake,
  confirmClearUserIdentity,
  confirmResetAllData,
} = useVotely(showToast)
</script>

<template>
  <div
    class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col antialiased"
  >
    <AppHeader
      :user-id="userId"
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
      @clear-identity="showDeleteModal = true"
    />

    <HeroSection />

    <FilterBar
      :current-category="currentCategory"
      :search-query="searchQuery"
      @update:search-query="searchQuery = $event"
      @set-category="currentCategory = $event"
    />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 pb-16">
      <div class="mb-4 flex items-center justify-between">
        <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Đang hiển thị {{ filteredTopics.length }}/{{ topics.length }} chủ đề
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400">Sắp xếp:</span>
          <select
            v-model="sortBy"
            class="text-xs font-semibold bg-transparent border-none text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="default" class="bg-white dark:bg-slate-900">Mặc định</option>
            <option value="popular" class="bg-white dark:bg-slate-900">Nhiều vote nhất</option>
            <option value="up" class="bg-white dark:bg-slate-900">Nhiều Upvote nhất</option>
          </select>
        </div>
      </div>

      <div
        v-if="filteredTopics.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          class="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-400"
        >
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="font-bold text-lg">Không tìm thấy chủ đề nào</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-1">
          Hãy thử gõ từ khóa khác hoặc chuyển danh mục bộ lọc.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <TopicCard
          v-for="topic in filteredTopics"
          :key="topic.id"
          :topic="topic"
          :user-vote="userVotes[topic.id]"
          @vote="handleVote"
        />
      </div>
    </main>

    <AppFooter @reset-all="showResetModal = true" />

    <AuthModal
      :open="showAuthModal"
      :shake="authShake"
      @close="closeAuthModal"
      @save="saveIdentity"
      @invalid="triggerAuthShake"
    />

    <ConfirmModal
      :open="showDeleteModal"
      title="Xóa mã định danh?"
      message="Mọi quyền bình chọn của bạn vẫn được lưu trữ, nhưng bạn sẽ phải nhập lại mã định danh mới vào lần bình chọn tiếp theo."
      confirm-label="Xác nhận xóa"
      variant="rose"
      @close="showDeleteModal = false"
      @confirm="confirmClearUserIdentity"
    />

    <ConfirmModal
      :open="showResetModal"
      title="Khôi phục cài đặt gốc?"
      message="Thao tác này sẽ đặt lại toàn bộ lượt vote về trạng thái ban đầu và xóa thông tin định danh của bạn. Hành động này không thể hoàn tác."
      confirm-label="Xác nhận Reset"
      variant="amber"
      @close="showResetModal = false"
      @confirm="confirmResetAllData"
    />

    <ToastContainer :toasts="toasts" />
  </div>
</template>
