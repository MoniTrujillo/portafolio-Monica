import type { Ref } from 'vue'

const RESTING_PROGRESS = 0.5

export function useScrollProgress(target: Ref<HTMLElement | undefined>) {
  const progress = ref(RESTING_PROGRESS)
  let frame = 0

  function update() {
    frame = 0
    if (!target.value) return
    const { top, height } = target.value.getBoundingClientRect()
    const travelled = (window.innerHeight - top) / (window.innerHeight + height)
    progress.value = Math.min(Math.max(travelled, 0), 1)
  }

  function requestUpdate() {
    frame ||= requestAnimationFrame(update)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestUpdate)
    cancelAnimationFrame(frame)
  })

  return progress
}
