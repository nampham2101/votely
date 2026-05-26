<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  open: { type: Boolean, required: true },
  shake: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'save', 'invalid'])

const identityInput = ref('')
const showValidation = ref(false)
const inputRef = ref(null)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      identityInput.value = ''
      showValidation.value = false
      await nextTick()
      inputRef.value?.focus()
    }
  },
)

function formatIdentity(value) {
  const digits = value.replace(/\D/g, '')
  let formatted = ''
  if (digits.length > 0) formatted += digits.substring(0, 3)
  if (digits.length > 3) formatted += ' ' + digits.substring(3, 6)
  if (digits.length > 6) formatted += ' ' + digits.substring(6, 9)
  return formatted
}

function onInput(e) {
  identityInput.value = formatIdentity(e.target.value)
  showValidation.value = false
}

function submit() {
  const idRegex = /^\d{3} \d{3} \d{3}$/
  if (!idRegex.test(identityInput.value)) {
    showValidation.value = true
    emit('invalid')
    return
  }
  emit('save', identityInput.value)
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
        class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800/50 transition-all duration-300 ease-out scale-100 opacity-100"
        :class="{ 'animate-shake': shake }"
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          @click="emit('close')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Xác nhận định danh</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Để thực hiện quyền bỏ phiếu và chống spam, vui lòng nhập một dãy số định danh gồm
          <span class="font-semibold text-indigo-500">9 chữ số</span> theo định dạng
          <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-500"
            >xxx xxx xxx</code
          >. Thông tin này sẽ lưu trữ hoàn toàn ẩn danh tại máy của bạn.
        </p>

        <div class="space-y-4">
          <div>
            <label
              for="identityInput"
              class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
              >Dãy số định danh của bạn</label
            >
            <input
              id="identityInput"
              ref="inputRef"
              type="text"
              :value="identityInput"
              placeholder="123 456 789"
              maxlength="11"
              class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-center font-mono text-xl tracking-widest font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700"
              @input="onInput"
            />
            <p
              v-if="showValidation"
              class="mt-2 text-xs text-red-500 flex items-center gap-1"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Vui lòng điền đủ 9 chữ số theo đúng format!</span>
            </p>
          </div>

          <button
            type="button"
            class="w-full py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20"
            @click="submit"
          >
            Xác nhận & Bỏ phiếu
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
