import { ref, computed } from 'vue'
import { INITIAL_TOPICS } from '../data/initialTopics'
import { STORAGE_KEYS } from '../constants/storage'

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function useVotely(showToast) {
  const userId = ref(localStorage.getItem(STORAGE_KEYS.userId) || null)
  const userVotes = ref(loadJson(STORAGE_KEYS.userVotes, {}))
  const topics = ref(loadJson(STORAGE_KEYS.topics, structuredClone(INITIAL_TOPICS)))
  const currentCategory = ref('all')
  const searchQuery = ref('')
  const sortBy = ref('default')
  const pendingVote = ref(null)

  const showAuthModal = ref(false)
  const showDeleteModal = ref(false)
  const showResetModal = ref(false)
  const authShake = ref(false)

  function persist() {
    localStorage.setItem(STORAGE_KEYS.topics, JSON.stringify(topics.value))
    localStorage.setItem(STORAGE_KEYS.userVotes, JSON.stringify(userVotes.value))
  }

  const filteredTopics = computed(() => {
    let list = topics.value.filter((topic) => {
      const matchesCategory =
        currentCategory.value === 'all' || topic.category === currentCategory.value
      const matchesSearch = topic.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
      return matchesCategory && matchesSearch
    })

    if (sortBy.value === 'popular') {
      list = [...list].sort(
        (a, b) => b.upVotes + b.downVotes - (a.upVotes + a.downVotes),
      )
    } else if (sortBy.value === 'up') {
      list = [...list].sort((a, b) => b.upVotes - a.upVotes)
    } else {
      list = [...list].sort((a, b) => a.id - b.id)
    }

    return list
  })

  function executeVote(topicId, voteType) {
    const topic = topics.value.find((t) => t.id === topicId)
    if (!topic) return

    const currentVoteState = userVotes.value[topicId]

    if (currentVoteState === voteType) {
      if (voteType === 'up') topic.upVotes = Math.max(0, topic.upVotes - 1)
      else topic.downVotes = Math.max(0, topic.downVotes - 1)
      delete userVotes.value[topicId]
      showToast('Đã thu hồi vote của bạn trên chủ đề này.', 'info')
    } else if (currentVoteState) {
      if (voteType === 'up') {
        topic.upVotes += 1
        topic.downVotes = Math.max(0, topic.downVotes - 1)
      } else {
        topic.downVotes += 1
        topic.upVotes = Math.max(0, topic.upVotes - 1)
      }
      userVotes.value[topicId] = voteType
      showToast('Đã chuyển đổi lượt bình chọn thành công!', 'success')
    } else {
      if (voteType === 'up') topic.upVotes += 1
      else topic.downVotes += 1
      userVotes.value[topicId] = voteType
      showToast('Bình chọn thành công cho chủ đề!', 'success')
    }

    persist()
  }

  function handleVote(topicId, voteType) {
    if (!userId.value) {
      pendingVote.value = { topicId, voteType }
      showAuthModal.value = true
      return
    }
    executeVote(topicId, voteType)
  }

  function saveIdentity(formattedId) {
    userId.value = formattedId
    localStorage.setItem(STORAGE_KEYS.userId, formattedId)
    showToast(`Chào mừng bạn! Định danh "${formattedId}" đã được kích hoạt.`, 'success')

    const pending = pendingVote.value
    showAuthModal.value = false
    pendingVote.value = null

    if (pending) {
      setTimeout(() => executeVote(pending.topicId, pending.voteType), 400)
    }
  }

  function closeAuthModal() {
    showAuthModal.value = false
    pendingVote.value = null
  }

  function triggerAuthShake() {
    authShake.value = true
    setTimeout(() => {
      authShake.value = false
    }, 500)
  }

  function confirmClearUserIdentity() {
    userId.value = null
    localStorage.removeItem(STORAGE_KEYS.userId)
    showDeleteModal.value = false
    showToast('Đã gỡ bỏ mã định danh thành công.', 'info')
  }

  function confirmResetAllData() {
    localStorage.removeItem(STORAGE_KEYS.userId)
    localStorage.removeItem(STORAGE_KEYS.userVotes)
    localStorage.removeItem(STORAGE_KEYS.topics)

    userId.value = null
    userVotes.value = {}
    topics.value = structuredClone(INITIAL_TOPICS)
    currentCategory.value = 'all'
    searchQuery.value = ''
    sortBy.value = 'default'
    showResetModal.value = false
    showToast('Đã khôi phục hoàn toàn cấu hình và dữ liệu gốc!', 'success')
  }

  return {
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
  }
}
