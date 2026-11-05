# Spec — Elevadores Altius (React + Vite)

## Requirements

| # | Tarea | Prioridad | Estado | Notas |
|---|-------|-----------|--------|-------|
| 1 | Copia de https://www.elevadoresaltius.com/ en React + Vite con estructura y navegación idénticas | Alta | Completada | Ver sección "Delivered (Task-01)" |

---

## Delivered (Task-01 — copia del sitio original)

Réplica funcional de las **5 páginas del menú principal** del sitio original
(WordPress + Elementor), construida desde cero en React 19 + Vite + TypeScript
con arquitectura DDD.

### Rutas y páginas (idénticas a los slugs originales)

| Ruta | Página | Título (`document.title`) |
|------|--------|---------------------------|
| `/` | Inicio (hero slideshow, acerca de nosotros, banner de productos, 4 tipos de elevadores, CTA FAQ, pre-footer social) | Inicio - Elevadores Altius |
| `/quienes-somos/` | Quienes somos (hero, Misión/Visión/Valores, contadores 250/10/200, calidad, certificados TÜV/ISO/UNE, video YouTube, CTA + barra de privacidad) | Quienes Somos - Elevadores Altius |
| `/productos/` | Productos (hero solo-imagen, intro, grid 4×3 con 12 tarjetas, barras 60/20/10/10, catálogo PDF, CTA) | Productos - Elevadores Altius |
| `/proyectos-especiales-en-america-latina/` | Proyectos (hero, elevadores inclinados + 8 áreas de aplicación + 2 columnas + video, escaleras eléctricas con fondo + 2 tarjetas + video, CTA) | Proyectos - Elevadores Altius |
| `/contacto/` | Contacto (hero, oficinas con iconos, "Solicitud de cotización", 10 redes sociales, mapa Google, video) | Contacto - Elevadores Altius |

Fuera de alcance (según decisión del usuario): 12 páginas de detalle de
productos, FAQ, Aviso de Privacidad y catálogo PDF → sus enlaces apuntan al
sitio original `https://www.elevadoresaltius.com/...`.

### Estructura DDD (`web/src`)

```
domain/entities/site.ts            # Tipos de contenido (HomeContent, NavItem, SocialLink, …)
domain/ports/contentRepository.ts  # Puerto ContentRepository
application/services/siteService.ts# Servicio único de acceso al contenido
infrastructure/data/*.ts           # Contenido estático (copy exacto del original)
infrastructure/staticContentRepository.ts # Adaptador que implementa el puerto
presentation/                      # React: páginas, componentes, hooks, contexto
  siteContext.tsx                  # Composition root inyecta SiteService (DI por contexto)
  components/  Header, Footer, WhatsAppWidget, Slideshow, SocialLinks, RichTextView
  pages/       HomePage, AboutPage, ProductsPage, ProjectsPage, ContactPage
  hooks/       useReveal (animación al hacer scroll), useCountUp (contadores)
```

- El composition root (`App.tsx`) arma `StaticContentRepository → SiteService → SiteContext.Provider`.
  Un repositorio respaldado por API puede sustituirlo sin tocar aplicación ni presentación.

### Detalles de fidelidad

- **Imágenes:** 45 archivos descargados a `web/public/images` (6.1 MB); el sitio
  no depende del CDN del original en desarrollo.
- **Tokens medidos del original:** fondo `#F8F7F3`, texto `#62615C`, títulos
  `#1E1810`, acento `#F9C349` (píldoras radius 100px), WhatsApp `#2DB742`,
  Montserrat 400/700, heroes 901/901/721/853/666 px, h1 70 px, header 110 px.
- **Header:** transparente absoluto sobre el hero, logo 100×100, nav con
  subrayado amarillo en la ruta activa; hamburguesa ≤900 px (menú oscuro con 5 links).
- **Slideshow CSS puro** (cross-fade + Ken Burns, 15 s para 3 slides) en el hero
  y en la sección de productos; respeta `prefers-reduced-motion`.
- **Widget WhatsApp:** burbuja fija 56 px + tooltip (oculto <600 px) + popup de
  351 px con cabecera verde "Permítanos atenderle" y los 3 agentes reales
  (Sofía Prieto / Bernardo Hernández / Ventas) con sus números y textos.
- **Iconos:** Font Awesome 7.3.1 (`@fortawesome/fontawesome-free`), mismas
  clases `fab/fas/far` que el original.
- **Videos embebidos:** `sBqS7nBP6cI` (quienes somos), `GzO-l3-z7ns` y
  `sCjQSCiMYd8` (proyectos), `yNvHjSVQK3Y` con `controls=0` (contacto).
- **Mapa:** iframe de Google Maps con la dirección real (C. Nicolás Bravo 1936, Metepec).

### Decisiones

1. **Formulario "Solicitud de cotización":** el widget del original renderiza
   vacío (roto en WordPress). Se replica como título, sin campos.
2. **Badge "NORMAS INTERNACIONALES":** no existe en el DOM en vivo (artefacto
   transitorio de Elementor) → no se replica.
3. **Contadores:** valores reales 250 / 10 / 200 (los del AJAX del original).
4. **Aviso de Privacidad / FAQ / catálogo / detalle de productos:** enlaces al
   sitio original (fuera del alcance de las 5 páginas).
5. **`useReveal` / `useCountUp`:** si `IntersectionObserver` no existe (jsdom)
   o hay `prefers-reduced-motion`, muestran el estado final de inmediato
   (contenido nunca queda oculto y los tests son deterministas).
6. **Sin backend todavía:** el contenido vive en `infrastructure/data`. El
   futuro API (backlog #2) sustituirá el repositorio sin tocar el resto.

### Tests (Vitest + Testing Library — jsdom)

13 archivos, **66 tests, todos en verde**:

| Archivo | Cubre |
|---------|-------|
| `src/test/siteService.test.ts` | Servicio: 5 nav items, rutas internas, contenido por página, agentes WhatsApp, redes, privacidad |
| `src/test/staticContentRepository.test.ts` | Integridad de datos: slugs únicos, imágenes locales, 12 tarjetas externas, barras = 100 %, contadores, 8 áreas, 6 grupos de oficinas, teléfonos únicos, colores/íconos de redes |
| `src/test/appRouting.test.tsx` | Las 5 rutas renderizan + `document.title` correcto, navegación por el header, ruta desconocida → home, chrome permanente en todas las páginas |
| `Header.test.tsx` | Logo + 5 links, ruta activa, hamburguesa (aria-expanded) |
| `Footer.test.tsx` | Copyright + powered by |
| `WhatsAppWidget.test.tsx` | Apertura/cierre, 3 agentes, hrefs `api.whatsapp.com` con cada teléfono |
| `RichTextView.test.tsx` | Texto plano, `<strong>`, enlaces inline |
| `Slideshow.test.tsx` | 1 div por slide, delays escalonados, duración total, aria-hidden |
| `HomePage.test.tsx` | Hero + CTA, acerca de, 3 blurbs, 4 tarjetas, FAQ externo, redes + píldora |
| `AboutPage.test.tsx` | Hero, 3 pilares, contadores finales, 3 columnas de calidad, 3 certificados, video, CTA/privacidad |
| `ProductsPage.test.tsx` | Hero sin texto, intro, 12 tarjetas externas, 4 barras, PDF, CTA |
| `ProjectsPage.test.tsx` | Hero con línea amarilla, 8 áreas, 2 videos, 2 tarjetas de escaleras, CTA |
| `ContactPage.test.tsx` | 6 grupos de oficinas, heading sin formulario, 10 redes, mapa, video `controls=0` |

### Verificación E2E (chrome-devtools)

- **1920×1080:** captura full-page de las 5 páginas; sin errores de consola
  (solo mensajes de Vite/React); popup de WhatsApp abierto y verificado por
  píxeles (cabecera `#2DB742` + cuerpo blanco); mapa y videos YouTube cargan.
- **768×1024:** sin overflow horizontal en las 5 páginas; layout de tablet
  (hamburguesa, grid 2 columnas, blurbs apilados).
- **375×812 (emulación móvil):** sin overflow horizontal en las 5 páginas;
  hamburguesa abre/cierra con 5 links táctiles de 51 px; tooltip de WhatsApp
  oculto (<600 px); todo el contenido legible.

### Comandos

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run lint       # oxlint
npm run build      # tsc -b && vite build
npm test           # vitest run (13 archivos / 66 tests)
npm run test:coverage
```
