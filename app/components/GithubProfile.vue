<script setup lang="ts">
import type { GithubProfile } from '~/types/github'

defineProps<{ profile: GithubProfile; repoCount: number }>()

const { t } = useI18n()
</script>

<template>
  <article class="rounded-2xl bg-rose p-6 text-cream">
    <div class="flex items-center gap-4">
      <img
        :src="profile.avatar_url"
        :alt="t('github.avatarAlt', { name: profile.name ?? profile.login })"
        width="48"
        height="48"
        class="size-12 rounded-full border border-cream/50"
      />
      <div class="min-w-0">
        <h3 class="truncate font-serif text-lg font-semibold">
          {{ profile.name ?? profile.login }}
        </h3>
        <p class="truncate text-xs text-cream/90">
          {{ t('github.handle', { login: profile.login, count: repoCount }) }}
        </p>
      </div>
    </div>
    <a
      :href="profile.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-5 flex items-center justify-between border-t border-cream/30 pt-4 text-sm font-semibold hover:underline focus-visible:outline-cream"
    >
      {{ t('github.viewProfile') }}
      <span class="sr-only">{{ t('common.newTab') }}</span>
      <AppIcon name="arrowUpRight" class="size-4" />
    </a>
  </article>
</template>
