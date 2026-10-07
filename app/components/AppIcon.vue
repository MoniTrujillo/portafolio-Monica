<script setup lang="ts">
const props = defineProps<{ name: string }>()

const paths: Record<string, string> = {
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  arrowUpRight: 'M7 17L17 7M7 7h10v10',
  download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  chat: 'M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z',
  team: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  check: 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4L12 14l-3-3',
  refresh: 'M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M3 4v5h5M21 20v-5h-5',
}

const path = computed(() => paths[props.name] ?? '')
</script>

<template>
  <svg
    class="size-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="path" />
  </svg>
</template>
