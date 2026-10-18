import type { FetchError } from 'ofetch'
import type { GithubProfile, GithubRepo } from '~/types/github'
import { errorKeyFor, HTTP_STATUS } from '~/utils/httpErrors'
import { combineStatus } from '~/utils/requestStatus'

const GITHUB_API = 'https://api.github.com'
const GITHUB_HEADERS = { Accept: 'application/vnd.github+json' }

const GITHUB_ENDPOINTS = {
  user: (user: string) => `${GITHUB_API}/users/${user}`,
  repos: (user: string) => `${GITHUB_API}/users/${user}/repos?per_page=100`,
}

const GITHUB_ERROR_KEYS = {
  [HTTP_STATUS.notFound]: 'github.errors.notFound',
  [HTTP_STATUS.forbidden]: 'github.errors.rateLimit',
}
const GITHUB_DEFAULT_ERROR = 'github.errors.network'

export function useGithub() {
  const { t } = useI18n()
  const user = useRuntimeConfig().public.githubUser

  const profile = useAsyncData<GithubProfile, FetchError>(`githubProfile-${user}`, () =>
    $fetch<GithubProfile>(GITHUB_ENDPOINTS.user(user), { headers: GITHUB_HEADERS }),
  )
  const repos = useAsyncData<GithubRepo[], FetchError>(`githubRepos-${user}`, () =>
    $fetch<GithubRepo[]>(GITHUB_ENDPOINTS.repos(user), { headers: GITHUB_HEADERS }),
  )

  const repoCount = computed(() => (repos.data.value ?? []).filter((repo) => !repo.fork).length)

  const status = computed(() => combineStatus(profile.status.value, repos.status.value))

  const errorMessage = computed(() => {
    const error = profile.error.value ?? repos.error.value
    if (!error) return ''
    return t(errorKeyFor(error.statusCode, GITHUB_ERROR_KEYS, GITHUB_DEFAULT_ERROR), { user })
  })

  async function retry() {
    await Promise.all([profile.refresh(), repos.refresh()])
  }

  return { profile: profile.data, repoCount, status, errorMessage, retry }
}
