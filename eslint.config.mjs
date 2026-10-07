import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Prettier escribe <img />, así que ESLint debe aceptarlo.
    'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
  },
})
