export type ProjectCategory = 'web' | 'app' | 'design'
export type ProjectColor = 'wine' | 'sage' | 'rose' | 'ocean'

export interface Project {
  /** Clave camelCase: se usa en los textos (i18n) y en la carpeta de imágenes. */
  id: string
  /** Texto de la URL, por ejemplo /projects/padel-one */
  slug: string
  category: ProjectCategory
  color: ProjectColor
  tech: string[]
  /** Capturas de escritorio para la galería del detalle. */
  gallery: string[]
  /** Captura móvil que se muestra dentro del teléfono. */
  phoneImage?: string
  url?: string
}
