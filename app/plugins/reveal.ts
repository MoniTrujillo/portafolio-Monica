export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add('opacity-0', 'translate-y-6')
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.add('transition', 'duration-700')
          el.classList.remove('opacity-0', 'translate-y-6')
          observer.disconnect()
        },
        { threshold: 0.15 },
      )
      observer.observe(el)
    },
  })
})
