import type { Project } from '#shared/types/project'

const imagePath = (id: string, name: string) => `/images/projects/${id}/${name}.jpg`
const phoneScreen = (id: string) => imagePath(id, 'pantallaMovil')
const screenshots = (id: string, names: string[]) => names.map((name) => imagePath(id, name))

const projects: Project[] = [
  {
    id: 'arquimo',
    slug: 'arquimo',
    category: 'web',
    color: 'wine',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
    gallery: screenshots('arquimo', ['propiedadesDestacadas', 'inicioHero']),
    phoneImage: phoneScreen('arquimo'),
    url: 'https://www.arquimo.com',
  },
  {
    id: 'mota',
    slug: 'mota',
    category: 'app',
    color: 'sage',
    tech: ['Figma', 'React Native', 'Tailwind'],
    gallery: screenshots('mota', ['inicioSesion', 'listaPedidos', 'tablaPedidosConfirmar']),
    phoneImage: phoneScreen('mota'),
  },
  {
    id: 'padelOne',
    slug: 'padel-one',
    category: 'app',
    color: 'ocean',
    tech: ['Figma', 'Vue', 'Express', 'Tailwind'],
    gallery: screenshots('padelOne', ['inicioSesion', 'misReservas']),
    phoneImage: phoneScreen('padelOne'),
  },
  {
    id: 'facialByLimary',
    slug: 'facial-by-limary',
    category: 'web',
    color: 'rose',
    tech: ['HTML', 'CSS', 'JavaScript'],
    gallery: screenshots('facialByLimary', ['sobreNosotros', 'tratamientos', 'comoFunciona']),
    phoneImage: phoneScreen('facialByLimary'),
    url: 'https://www.gruponodex.com/Proyectos/Limary/',
  },
  {
    id: 'gosaHoteles',
    slug: 'gosa-hoteles',
    category: 'web',
    color: 'wine',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    gallery: screenshots('gosaHoteles', ['nuestrosHoteles', 'promociones', 'porQueReservar']),
    phoneImage: phoneScreen('gosaHoteles'),
  },
  {
    id: 'tiatsa',
    slug: 'tiatsa',
    category: 'web',
    color: 'sage',
    tech: ['HTML', 'CSS', 'JavaScript'],
    gallery: screenshots('tiatsa', ['inicio', 'marcas', 'nosotros']),
    phoneImage: phoneScreen('tiatsa'),
  },
  {
    id: 'floreDiLuna',
    slug: 'flore-di-luna',
    category: 'design',
    color: 'rose',
    tech: ['Figma'],
    gallery: screenshots('floreDiLuna', ['inicio', 'inicioSesion']),
    phoneImage: phoneScreen('floreDiLuna'),
  },
]

export default defineEventHandler(() => projects)
