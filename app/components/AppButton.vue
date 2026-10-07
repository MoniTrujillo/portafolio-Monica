<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'light' | 'outline'
    icon?: string
    download?: boolean
    external?: boolean
  }>(),
  { variant: 'primary', to: undefined, href: undefined, icon: undefined },
)

const { t } = useI18n()

const variants = {
  primary: 'bg-wine text-cream hover:bg-wine-dark',
  light: 'bg-cream text-wine hover:bg-cream-light',
  outline: 'border border-current text-current hover:bg-white/10',
}

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :download="download || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center gap-2 rounded-full px-6 py-3 font-serif text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
    :class="variants[variant]"
  >
    <slot />
    <span v-if="external" class="sr-only">{{ t('common.newTab') }}</span>
    <AppIcon v-if="icon" :name="icon" class="size-4" />
  </component>
</template>
