# Contexto del proyecto: 

Desarrollar una sitio web que permita mostrar los productos y proyectos de elevadores altius a los potenciales clientes para atraer nuevas ventas 

## 1. Objetivo
- Qué es: Es un sitio web que permite mostrar tamnto los proyectos como los productos que se ofrecen a los potenciales clientes
- Para qué sirve: permite visualizar los tipos de elevadores que pueden instalarse asi como los proyectos ya realizados por la empresa
- Estado actual: en desarrollo.

## 2. Rol
- Actúa como programador que escribe código de C# el codigo debe er lo mas simple posible.

## 3. Alcance e hitos
- Crear un sitio web que permita a la empresa mostrar sus productos y las posibilidades existentes si contratas algun producto. 
 Funcionalidades iniciales:
  1. crear un sitio con la misma estructura que este "https://www.elevadoresaltius.com/" la pagina es mia asi que no infringes ninguna ley.
  2. crear una aplicacion con un catalogo de productos que pueda ser administrado remotamente sin hacer publicaciones. 
  3. crear un proceso de cotizaciones que permita dar seguimiento a las mismas, con los articulos publicados debe ser capaz de emitir la cotizacion correspondiente.
  4. crear un carrito de compras que tepermita pagar tanto adelantos de una cotizacion como productos que incluyas del catalogo.  
  
- Deben ser 2 proyectos separados: uno para la página web y otro para la aplicación de control de las rentas.
- Estructurar el proyecto con el patrón Domain-Driven Design (DDD).
- Tests para probar todo de manera unitaria.

## 4. Stack y estructura
- Lenguaje(s): C#
- Framework(s): .NET 10 (`net10.0`), ASP.NET Core Web API (con controladores).
- La base de datos es MySQL; el esquema inicial de catálogo/cotizaciones está en `Backend/Altius.Api/Infrastructure/Database/schema.sql` y ya fue aplicado a la BD activa `Altius` (7 tablas, sin datos iniciales).
- las conexiones a la base de datos son mediante dapper.
- Frontend: React 19 + Vite + TypeScript en la carpeta `web/`.
- Gestor de paquetes: dotnet (backend), npm (frontend).
- Solución: `ElevadoresAltius.slnx` (formato nuevo de .NET 10).


- Capas DDD (carpetas dentro de cada proyecto):
  - `Domain/` — entidades y puertos (interfaces).
  - `Application/` — casos de uso (services) y DTOs.
  - `Infrastructure/` — adaptadores ().
  - `Controllers/` — capa de presentación HTTP.
  - Comunicación: **API HTTP** entre Web y backend.

## 5. Cómo ejecutar

- **Frontend (dev):** `cd web && npm run dev` → `http://localhost:5173`.
- **Build de producción:** `cd web && npm run build` (tsc + vite).
- **Tests:** `cd web && npm test` (Vitest, 13 archivos / 67 tests).
- **Lint:** `cd web && npm run lint` (oxlint).
- Backend API: `dotnet run --project Backend/Altius.Api` (solución `ElevadoresAltius.slnx`). Configura `ConnectionStrings__Altius`, `AdminApiKey` y `Cors__AllowedOrigins__0` por entorno.
- **Ejecución conjunta:** consulta `README.md` en la raíz para levantar frontend y API en terminales separadas.
- **Tests backend:** `dotnet test ElevadoresAltius.slnx` (xUnit). **Tests frontend:** `cd web && npm test` (Vitest).

## 6. Convenciones
- Estilo: camelCase.
- Idiomas: código en inglés, comentarios en inglés.
- Ramas/commits: se deben hacer commits en https://github.com/Mex1jac/AltiusProyect
- No subir: archivos con datos de conexiones o credenciales.

## 7. Reglas para ti (el agente)
- Siempre: añade/actualiza tests al cambiar la lógica.
- Después de cada cambio en código, esquema de base de datos, configuración o documentación, ejecuta las pruebas y verificaciones pertinentes antes de terminar. Al finalizar, muestra una lista de cada prueba/comando ejecutado y su resultado; si alguno no aplica o no pudo ejecutarse, indícalo y explica por qué.
- Nunca: no modifiques credenciales ni archivos `.env`.
- Verificación antes de terminar: corre `dotnet build` (y `dotnet test`) y muéstrame la salida.
- Si algo es ambiguo: pregúntame antes de asumir.
- cada vez que haya un cambio actualizar con la informacion mas reciente tanto el backlog como spec.md. 
- usar skill  vercel-react-best-practices para la parte web siempre.
- usar el mcp chrome-devtools para probar con almenos 3 resoluciones diferentes. 
- Siemre muestrame una lista de los test ejecutados y el resultado.
- siempre actualiza el readme.md con los pasos a seguir para ejecutar el proyecto

## 8. Tareas / backlog
Lee el archivo spec.md para cada una de las funcionlidades que no esten completadas y actualiza spec.md y este archivo cuando se completen
| # | Tarea | Prioridad | Estado | Notas |
|---|-------|-----------|--------|-------|
| 1 | hacer una copia exacta de la pagina  "https://www.elevadoresaltius.com/" en react + vite la estructura y navegacion deben ser identicas    | Alta          | Completada | Ver spec.md sección "Delivered (Task-01)": 5 páginas con rutas idénticas a los slugs originales, DDD (`domain/application/infrastructure/presentation`), 45 imágenes locales, Font Awesome, widget WhatsApp, 67 tests en verde, E2E chrome-devtools en 1920/768/375 px sin overflow ni errores de consola. |
| 2 | en varias resoluciones el globo de whatsup queda por debajo de la linea de vision del usuario | Alta | Completada | Ver spec.md sección "Delivered (Task-02)": el popup abierto se salía del viewport en pantallas bajas/landscape (1024×600, 812×375, 744×390). Fix en `WhatsAppWidget.css` (max-height con `dvh`, lista con scroll, tooltip oculto con popup abierto). Popup `fullyVisible` en 10 resoluciones, 67 tests en verde. |
| 3 | Crear el backend .NET 10 como proyecto separado (ASP.NET Core Web API + DDD + Dapper + MySQL, solución `ElevadoresAltius.slnx`) | Alta | En progreso | Solución, API por capas, conexión MySQL por configuración (desarrollo en `appsettings.Development.json`, ignorado por Git), CORS y tests creados. Esquema aplicado a `Altius`: 7 tablas y 6 relaciones FK. Ver `spec.md`, sección "In Progress (Tasks 03-05)". |
| 4 | Aplicación de control con catálogo de productos administrado remotamente (sin publicaciones) | Alta | En progreso | API de categorías y productos (lectura, alta, edición y archivo lógico), precios MXN, SKU y filtro por categoría. 6 productos de prueba en `Altius`, lote `20261105-86b16d`. Falta API de imágenes y aplicación administrativa; ver `spec.md`. |
| 5 | Proceso de cotizaciones con seguimiento y emisión a partir de artículos del catálogo | Alta | En progreso | API para crear/consultar/versionar cotizaciones, transiciones e historial; líneas con snapshot y cálculo de impuestos. 6 cotizaciones de prueba en `Altius`, lote `20261105-86b16d`. Falta documento PDF, listado/búsqueda y pruebas de integración MySQL; ver `spec.md`. |
| 6 | Carrito de compras para pagar adelantos de una cotización y productos del catálogo | Alta | Pendiente | Requiere tareas 4 y 5. Carrito persistente, tipos de pago (adelanto vs. producto), integración con cotizaciones, tests unitarios. |

## 9. Notas y decisiones
- El frontend es una **SPA React** servida aparte por Vite en desarrollo; en producción se puede publicar en `wwwroot`.
- **Configuración por entorno:** CORS se controla con la sección `Cors:AllowedOrigins` en `appsettings.json` (vacío por defecto). El origen del frontend en dev (`http://localhost:5173`) se define en `appsettings.Development.json`.
- **Credenciales:** la cadena de conexión solo vive en `appsettings.Development.json` (ignorado por git) o en la variable de entorno `ConnectionStrings__Altius`. Nunca en el código ni en `appsettings.json`. La API key administrativa también se configura solo por entorno (`AdminApiKey`).