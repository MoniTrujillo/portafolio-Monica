<script setup lang="ts">
defineProps<{
  status: 'idle' | 'pending' | 'success' | 'error'
  message?: string
}>()
defineEmits<{ retry: [] }>()

const { t } = useI18n()
</script>

<template>
  <div
    v-if="status === 'error'"
    role="alert"
    class="rounded-2xl border border-wine/30 bg-cream-light p-8"
  >
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
  <p
    v-else-if="status === 'pending' || status === 'idle'"
    role="status"
    class="py-10 text-sm text-ink/70"
  >
    {{ t('common.loading') }}
  </p>
  <slot v-else />
</template>
