<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'
import { REQUEST_STATUS } from '~/utils/requestStatus'

const props = defineProps<{
  status: AsyncDataRequestStatus
  message?: string
}>()
defineEmits<{ retry: [] }>()

const { t } = useI18n()

const isError = computed(() => props.status === REQUEST_STATUS.error)
const isLoading = computed(
  () => props.status === REQUEST_STATUS.pending || props.status === REQUEST_STATUS.idle,
)
</script>

<template>
  <div v-if="isError" role="alert" class="rounded-2xl border border-wine/30 bg-cream-light p-8">
    <p class="font-serif text-xl font-semibold text-wine">{{ t('common.error.title') }}</p>
    <p class="mt-2 max-w-prose text-sm">{{ message || t('common.error.text') }}</p>
    <button
      type="button"
      class="mt-4 rounded-full border border-wine px-5 py-2 text-sm font-semibold text-wine transition hover:bg-wine hover:text-cream"
      @click="$emit('retry')"
    >
      {{ t('common.retry') }}
    </button>
  </div>
  <p v-else-if="isLoading" role="status" class="py-10 text-sm text-ink/70">
    {{ t('common.loading') }}
  </p>
  <slot v-else />
</template>
