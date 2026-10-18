import { projects } from '../../data/projects'

export default defineSitemapEventHandler(() =>
  projects.map((project) => ({ loc: `/projects/${project.slug}`, _i18nTransform: true })),
)
