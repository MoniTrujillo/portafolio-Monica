<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string; active: boolean; speed?: number }>(), {
  speed: 18,
})
const emit = defineEmits<{ done: [] }>()

// Antes de montar mostramos el texto completo (sirve para SEO y sin JavaScript).
const typed = ref(props.text.length)
const animate = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let started = false

const isTyping = computed(() => animate.value && props.active && typed.value < props.text.length)

function finish() {
  clearInterval(timer)
  emit('done')
}

function start() {
  if (!props.active || started) return
  started = true
  if (!animate.value) return finish()
  timer = setInterval(() => {
    typed.value += 1
    if (typed.value >= props.text.length) finish()
  }, props.speed)
}

onMounted(() => {
  animate.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (animate.value) typed.value = 0
  start()
})

watch(() => props.active, start)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <p>
    <span class="sr-only">{{ text }}</span>
    <span aria-hidden="true">{{ text.slice(0, typed) }}</span>
    <span v-if="isTyping" class="relative inline-block w-0" aria-hidden="true">
      <span class="absolute -top-[0.1em] left-0 h-[1.1em] w-0.5 animate-pulse bg-wine" />
    </span>
    <span class="invisible" aria-hidden="true">{{ text.slice(typed) }}</span>
  </p>
</template>
