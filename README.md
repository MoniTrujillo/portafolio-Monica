Portafolio de Mónica Trujillo

Mi portafolio hecho con Nuxt, Vue, TypeScript y Tailwind. Tiene Inicio, Sobre mí, Proyectos, detalle de proyecto, Contacto y una página 404. Está en español e inglés.

Cómo arrancarlo

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Enlaces
Figma: https://www.figma.com/design/jJ6kyo8YmyeqdYuzVjKy0S/Prueba-tecnica--about-me--alebat?node-id=0-1&p=f&t=14xSUdrryldbkat4-0

Vercel web: https://portafolio-monica.vercel.app

Dónde está cada cosa

- `app/pages/`: las páginas.
- `app/components/`: piezas reutilizables (botón, tarjeta de proyecto, etc.).
- `app/composables/`: lógica que se repite (proyectos, GitHub, formulario).
- `i18n/locales/`: todos los textos (`es.json` y `en.json`).
- `public/images/projects/<proyecto>/`: capturas de cada proyecto. `pantallaMovil.jpg` es la que va dentro del teléfono.
- `server/api/projects.get.ts`: la lista de proyectos.

Qué decisiones tomé

Nuxt + Composition API + TypeScript** en todo el proyecto.
Ningún texto escrito en las plantillas**: todo está en los JSON de idioma.
Tailwind** con los colores y fuentes de mi marca en `tailwind.config.ts`.
Sobre mí** usa la API de GitHub y maneja carga y error.
Contacto** abre mi WhatsApp con el mensaje ya escrito.
Calidad**: ESLint, Prettier, Husky, lint-staged y commitlint.

Comandos útiles

- `pnpm lint` revisa el código
- `pnpm build` genera la versión final
