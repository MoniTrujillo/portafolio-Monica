<script setup lang="ts">
defineProps<{
  lead: string
  accent: string
  words: [string, string]
}>()

const section = ref<HTMLElement>()
const progress = useScrollProgress(section)
</script>

<template>
  <section
    ref="section"
    class="relative isolate overflow-hidden bg-wine px-gutter py-20 text-cream sm:py-28 lg:px-12"
    :style="{ '--progress': progress }"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 flex select-none flex-col justify-center font-serif font-bold leading-[0.85] text-cream/[0.07]"
      aria-hidden="true"
    >
      <span class="drift drift-left whitespace-nowrap text-[22vw] sm:text-[14vw]">
        {{ words[0] }}
      </span>
      <span class="drift drift-right self-end whitespace-nowrap text-[22vw] italic sm:text-[14vw]">
        {{ words[1] }}
      </span>
    </div>

    <blockquote v-reveal class="mx-auto max-w-3xl text-center">
      <span class="mx-auto block h-px w-16 bg-cream/40" aria-hidden="true" />
      <p class="mt-8 text-balance font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
        {{ lead }}
        <em class="mt-2 block text-cream/80">{{ accent }}</em>
      </p>
    </blockquote>
  </section>
</template>

<style scoped>
.drift {
  will-change: transform;
}

.drift-left {
  transform: translateX(calc((0.5 - var(--progress)) * 50%));
}

.drift-right {
  transform: translateX(calc((var(--progress) - 0.5) * 50%));
}
</style>
