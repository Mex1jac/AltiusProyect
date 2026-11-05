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
- La base de datos es MySQL y todavia no se definen tablas.
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
- **Tests:** `cd web && npm test` (Vitest, 13 archivos / 66 tests).
- **Lint:** `cd web && npm run lint` (oxlint).
- El backend (.NET) se agregará en la tarea #2 del backlog.

## 6. Convenciones
- Estilo: camelCase.
- Idiomas: código en inglés, comentarios en inglés.
- Ramas/commits: se deben hacer commits en https://github.com/Mex1jac/AltiusProyect
- No subir: archivos con datos de conexiones o credenciales.

## 7. Reglas para ti (el agente)
- Siempre: añade/actualiza tests al cambiar la lógica.
- Nunca: no modifiques credenciales ni archivos `.env`.
- Verificación antes de terminar: corre `dotnet build` (y `dotnet test`) y muéstrame la salida.
- Si algo es ambiguo: pregúntame antes de asumir.
- cada vez que haya un cambio actualizar con la informacion mas reciente tanto el backlog como spec.md. 
- usar skill  vercel-react-best-practices para la parte web siempre.
- usar el mcp chrome-devtools para probar con almenos 3 resoluciones diferentes. 
- Siemre muestrame una lista de los test ejecutados y el resultado.

## 8. Tareas / backlog
Lee el archivo spec.md para cada una de las funcionlidades que no esten completadas y actualiza spec.md y este archivo cuando se completen
| # | Tarea | Prioridad | Estado | Notas |
|---|-------|-----------|--------|-------|
| 1 | hacer una copia exacta de la pagina  "https://www.elevadoresaltius.com/" en react + vite la estructura y navegacion deben ser identicas    | Alta          | Completada | Ver spec.md sección "Delivered (Task-01)": 5 páginas con rutas idénticas a los slugs originales, DDD (`domain/application/infrastructure/presentation`), 45 imágenes locales, Font Awesome, widget WhatsApp, 66 tests en verde, E2E chrome-devtools en 1920/768/375 px sin overflow ni errores de consola. |
|
## 9. Notas y decisiones
- El frontend es una **SPA React** servida aparte por Vite en desarrollo; en producción se puede publicar en `wwwroot`.
- **Configuración por entorno:** CORS se controla con la sección `Cors:AllowedOrigins` en `appsettings.json` (vacío por defecto). El origen del frontend en dev (`http://localhost:5173`) se define en `appsettings.Development.json`.
- **Credenciales:** la cadena de conexión solo vive en `appsettings.Development.json` (ignorado por git) o en la variable de entorno `ConnectionStrings`. Nunca en el código ni en `appsettings.json`.

