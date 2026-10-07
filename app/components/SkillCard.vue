<script setup lang="ts">
defineProps<{ icon: string; title: string; text: string }>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <span class="grid size-12 place-items-center rounded-full bg-cream text-wine">
      <AppIcon :name="icon" />
    </span>
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="max-w-[16rem] text-sm text-cream/85">{{ text }}</p>
  </div>
</template>
