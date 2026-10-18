export type ProjectCategory = 'web' | 'app' | 'design'
export type ProjectColor = 'wine' | 'sage' | 'rose' | 'ocean'

export interface Project {
  id: string
  slug: string
  category: ProjectCategory
  color: ProjectColor
  tech: string[]
  gallery: string[]
  phoneImage?: string
  url?: string
}
