# Spec — Elevadores Altius (React + Vite)

## Requirements

| # | Tarea | Prioridad | Estado | Notas |
|---|-------|-----------|--------|-------|
| 1 | Copia de https://www.elevadoresaltius.com/ en React + Vite con estructura y navegación idénticas | Alta | Completada | Ver sección "Delivered (Task-01)" |
| 2 | El globo de WhatsApp queda fuera de la línea de visión en varias resoluciones | Alta | Completada | Ver sección "Delivered (Task-02)" |
| 3 | Backend .NET 10 con ASP.NET Core, DDD, Dapper y MySQL | Alta | En progreso | Solución/API y capas iniciales listas; esquema aplicado a Altius (7 tablas, 6 relaciones FK). |
| 4 | Catálogo de productos administrable remotamente | Alta | En progreso | API de categorías/productos implementada parcialmente; faltan imágenes y aplicación administrativa. |
| 5 | Cotizaciones con seguimiento a partir del catálogo | Alta | En progreso | Creación, versiones, estados, historial y snapshots implementados; faltan PDF, búsqueda y pruebas MySQL. |
| 6 | Carrito y pagos para productos y anticipos | Alta | Pendiente | Depende del catálogo y cotizaciones. |

---

## In Progress (Tasks 03-05 — backend, catálogo y cotizaciones)

### Backend

- Solución `ElevadoresAltius.slnx` con API ASP.NET Core 10 y proyecto xUnit en `Backend/`.
- Capas organizadas dentro del API: `Domain`, `Application`, `Infrastructure` y `Controllers`.
- Dapper + MySqlConnector. La conexión se lee desde `ConnectionStrings:Altius`; en el entorno local está configurada en `Backend/Altius.Api/appsettings.Development.json` (ignorado por Git). También se puede definir con `ConnectionStrings__Altius`; no hay credenciales en `appsettings.json`.
- CORS lee `Cors:AllowedOrigins`; no se permiten orígenes por defecto.
- Operaciones administrativas protegidas con `AdminApiKey` y el header `X-Admin-Api-Key`. Debe configurarse por entorno; esto es protección inicial, no reemplaza autenticación/roles para producción.
- El DDL está en `Backend/Altius.Api/Infrastructure/Database/schema.sql` y se aplicó a la BD `Altius`: 7 tablas y 6 relaciones FK verificadas. No se insertaron datos iniciales.

### Catálogo implementado

- Categorías: listado público de activas, consulta individual, creación/edición y archivo lógico.
- Productos: listado de activos por categoría, consulta, alta/edición y archivo lógico. Los productos de categorías archivadas tampoco aparecen en la lectura pública.
- SKU único, precio en MXN y referencia de categoría. El esquema incluye metadatos de imágenes, pero faltan endpoints de imágenes y almacenamiento de archivos.
- Rutas base: `GET/POST /api/catalog/categories`, `GET/PUT /api/catalog/categories/{id}`, `PATCH /api/catalog/categories/{id}/active`; `GET/POST /api/catalog/products`, `GET/PUT /api/catalog/products/{id}`, `PATCH /api/catalog/products/{id}/active`.

### Cotizaciones implementadas

- Crear y consultar cotizaciones versionadas; revisar una cotización enviada crea una nueva versión y conserva la anterior como `superseded`.
- Estados `draft`, `sent`, `accepted`, `rejected`, `expired` y `superseded` con historial. Transiciones inválidas se rechazan.
- Las líneas de catálogo toman nombre, SKU y precio vigentes del servidor; los conceptos manuales requieren precio propio. Cada línea conserva su snapshot y el desglose de impuesto. Los totales se calculan y persisten transaccionalmente.
- Rutas: `POST /api/quotes`, `GET /api/quotes/{id}?version=...`, `POST /api/quotes/{id}/versions` y `PATCH /api/quotes/{id}/versions/{version}/status`.
- Todas las rutas de cotización requieren `AdminApiKey` en esta fase. El formato del número de cotización (`COT-{año}-{16 caracteres hex}`) es provisional.
- Faltan PDF, búsqueda/listado paginado, datos de cliente reutilizables, pruebas de integración MySQL y el frontend administrativo.

### Validación actual

- `dotnet test ElevadoresAltius.slnx --no-restore`: 18 pruebas unitarias aprobadas.
- El build de la solución se ejecuta como parte de `dotnet test` y termina correctamente.
- En `Altius` se generaron datos de prueba con el lote `20261105-86b16d`: 6 categorías, 6 productos, 6 cotizaciones y 12 líneas.
- Estados sembrados: 2 `draft`, 1 `sent`, 1 `accepted`, 1 `rejected` y 1 `expired`.
- Verificación de datos: 0 discrepancias en subtotales/impuestos/totales y 0 discrepancias entre snapshots de catálogo y productos actuales.
- No se han agregado pruebas de integración automatizadas; la persistencia se comprobó con consultas de lectura a MySQL.

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
6. **Contenido público estático:** el contenido vive en `infrastructure/data`.
  La API de administración/cotizaciones se desarrolla por separado y aún no
  sustituye el repositorio de contenido público.

### Tests (Vitest + Testing Library — jsdom)

13 archivos, **67 tests, todos en verde**:

| Archivo | Cubre |
|---------|-------|
| `src/test/siteService.test.ts` | Servicio: 5 nav items, rutas internas, contenido por página, agentes WhatsApp, redes, privacidad |
| `src/test/staticContentRepository.test.ts` | Integridad de datos: slugs únicos, imágenes locales, 12 tarjetas externas, barras = 100 %, contadores, 8 áreas, 6 grupos de oficinas, teléfonos únicos, colores/íconos de redes |
| `src/test/appRouting.test.tsx` | Las 5 rutas renderizan + `document.title` correcto, navegación por el header, ruta desconocida → home, chrome permanente en todas las páginas |
| `Header.test.tsx` | Logo + 5 links, ruta activa, hamburguesa (aria-expanded) |
| `Footer.test.tsx` | Copyright + powered by |
| `WhatsAppWidget.test.tsx` | Apertura/cierre, 3 agentes, hrefs `api.whatsapp.com` con cada teléfono, clase `is-open` (habilita el tope del popup) |
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

La guía de ejecución conjunta del frontend y la API está en `README.md` en la raíz del repositorio.

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run lint       # oxlint
npm run build      # tsc -b && vite build
npm test           # vitest run (13 archivos / 67 tests)
npm run test:coverage
```

---

## Delivered (Task-02 — widget WhatsApp siempre visible)

**Problema reportado:** "en varias resoluciones el globo de WhatsApp queda por
debajo de la línea de visión del usuario".

**Diagnóstico (medido con chrome-devtools):** el FAB cerrado estaba siempre
visible en las 5 páginas × 9 resoluciones (1920→360 px), se mantenía `fixed`
al hacer scroll y sin elementos encima (`elementFromPoint`). El fallo real era
el **popup abierto**: crecía hacia arriba desde el FAB sin límite y se salía
por el borde superior en pantallas bajas o landscape:

| Viewport | top del popup (antes) | top (después) |
|---|---|---|
| 1440×700 | 92 ✓ | 164 ✓ |
| 1024×600 | **−8 ✗** | 64 ✓ |
| 812×375 (landscape) | **−233 ✗** | 16 ✓ |
| 744×390 (landscape) | **−218 ✗** | 16 ✓ |
| 1366×768 / 768×1024 / 375×812 / 360×640 / 1920×1080 | ✓ | ✓ |

**Solución (solo `WhatsAppWidget.css` + clase `is-open` ya existente):**

1. `.whatsapp-popup` con `max-height: calc(100dvh - 182px)` (reserva: FAB 56 +
   gap 14 + offset inferior 96 + margen superior 16) y `display: flex` en
   columna; cabecera y aviso con `flex-shrink: 0`.
2. `.whatsapp-agents` con `overflow-y: auto` → en viewports cortos la lista de
   agentes hace scroll dentro del popup (evidencia: 812×375).
3. `.whatsapp-widget.is-open .whatsapp-tooltip { display: none }` → el tooltip
   es redundante con el popup abierto (conducta del original, que lo oculta) y
   libera 72 px de altura.
4. `@media (max-width: 600px)`: `max-height: calc(100dvh - 110px)` (menor
   offset inferior: 24 px, sin tooltip).

**Verificación E2E (chrome-devtools):**

- Popup abierto `fullyVisible: true` en 9 resoluciones: 1920×1080, 1440×700,
  1366×768, 1024×768, **1024×600**, 768×1024, **812×375**, **744×390**,
  375×812 y 360×640.
- Screenshots de evidencia: `wa-fix-open-1024x600.png`, `wa-fix-open-812x375.png`,
  `wa-fix-open-1366x768.png`.
- Sin errores de consola al abrir/cerrar el popup en 1920×1080, 768×1024 y
  375×812.
- Test nuevo: `marks the widget as open so CSS can hide the tooltip and cap
  the popup height` → **13 archivos / 67 tests en verde**.
