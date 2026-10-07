import type { Project } from '#shared/types/project'

export function useProjects() {
  return useFetch<Project[]>('/api/projects', { key: 'projects', default: () => [] })
}
