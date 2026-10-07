import type { FetchError } from 'ofetch'
import type { GithubProfile, GithubRepo } from '~/types/github'

const API = 'https://api.github.com'

export function useGithub() {
  const { t } = useI18n()
  const user = useRuntimeConfig().public.githubUser
  const headers = { Accept: 'application/vnd.github+json' }

  const profile = useAsyncData<GithubProfile, FetchError>(`githubProfile-${user}`, () =>
    $fetch<GithubProfile>(`${API}/users/${user}`, { headers }),
  )
  const repos = useAsyncData<GithubRepo[], FetchError>(`githubRepos-${user}`, () =>
    $fetch<GithubRepo[]>(`${API}/users/${user}/repos?per_page=100`, { headers }),
  )

  const repoCount = computed(() => (repos.data.value ?? []).filter((repo) => !repo.fork).length)

  const status = computed(() => {
    if (profile.status.value === 'error' || repos.status.value === 'error') return 'error'
    if (profile.status.value === 'success' && repos.status.value === 'success') return 'success'
    return 'pending'
  })

  const errorMessage = computed(() => {
    const error = profile.error.value ?? repos.error.value
    if (!error) return ''
    if (error.statusCode === 404) return t('github.errors.notFound', { user })
    if (error.statusCode === 403) return t('github.errors.rateLimit')
    return t('github.errors.network')
  })

  async function retry() {
    await Promise.all([profile.refresh(), repos.refresh()])
  }

  return { profile: profile.data, repoCount, status, errorMessage, retry }
}
