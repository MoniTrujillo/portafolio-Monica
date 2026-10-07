<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="overflow-hidden border-y border-wine/20 bg-cream-light py-4">
    <ul
      class="flex w-max animate-marquee gap-10 font-serif text-lg font-semibold hover:[animation-play-state:paused] sm:text-xl"
    >
      <template v-for="copy in 2" :key="copy">
        <li
          v-for="item in items"
          :key="`${copy}-${item}`"
          class="flex items-center gap-10"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          {{ item }}
          <span class="size-2 rounded-full bg-ink" aria-hidden="true" />
        </li>
      </template>
    </ul>
  </div>
</template>
