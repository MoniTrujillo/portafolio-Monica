<script setup lang="ts">
import { navItems } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)

watch(
  () => route.fullPath,
  () => (open.value = false),
)
</script>

<template>
  <header class="sticky top-0 z-40 bg-wine text-cream">
    <div class="mx-auto flex max-w-page items-center justify-between gap-6 px-gutter py-4 lg:px-12">
      <NuxtLink
        :to="localePath('/')"
        class="font-serif text-lg font-semibold focus-visible:outline-cream"
      >
        {{ t('site.name') }}
      </NuxtLink>

      <nav :aria-label="t('nav.label')" class="hidden md:block">
        <ul class="flex items-center gap-8 text-sm">
          <li v-for="item in navItems" :key="item.key">
            <NuxtLink
              :to="localePath(item.path)"
              class="border-b border-transparent pb-1 transition hover:border-cream/60 focus-visible:outline-cream"
              active-class="!border-cream"
              exact-active-class="!border-cream"
            >
              {{ t(`nav.${item.key}`) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <LanguageSwitcher />
        <button
          type="button"
          class="rounded-full p-2 hover:bg-cream/15 focus-visible:outline-cream md:hidden"
          :aria-label="open ? t('nav.close') : t('nav.open')"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <nav
      v-if="open"
      id="mobile-menu"
      :aria-label="t('nav.label')"
      class="border-t border-cream/20 md:hidden"
    >
      <ul class="flex flex-col px-gutter py-4">
        <li v-for="item in navItems" :key="item.key">
          <NuxtLink
            :to="localePath(item.path)"
            class="block py-3 font-serif text-xl focus-visible:outline-cream"
            exact-active-class="underline underline-offset-8"
          >
            {{ t(`nav.${item.key}`) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
