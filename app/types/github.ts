export interface GithubProfile {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
}

export interface GithubRepo {
  id: number
  fork: boolean
}
