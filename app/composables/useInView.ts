import type { Ref } from 'vue'

/** Pasa a true la primera vez que el elemento entra en pantalla. */
export function useInView(target: Ref<HTMLElement | undefined>) {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        inView.value = true
        observer?.disconnect()
      },
      { threshold: 0.2 },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}
