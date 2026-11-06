# Elevadores Altius

Monorepositorio con el sitio público en React/Vite y la API de administración y cotizaciones en ASP.NET Core 10.

## Requisitos

- .NET 10 SDK.
- Node.js y npm compatibles con la versión de Vite declarada en `web/package.json`.
- MySQL 8 o posterior para ejecutar la API.

## Base de datos

La API usa MySQL mediante Dapper. Configura estos valores en el entorno local de la terminal que ejecutará la API, o en `Backend/Altius.Api/appsettings.Development.json` (archivo ignorado por Git):

- `ConnectionStrings__Altius`: cadena de conexión MySQL a la base `Altius`.
- `AdminApiKey`: clave para los endpoints administrativos y de cotizaciones.
- `Cors__AllowedOrigins__0`: origen permitido del frontend; para desarrollo usa `http://localhost:5173`.

No escribas credenciales en este README ni en archivos versionados. En una terminal PowerShell puedes pedirlas interactivamente:

```powershell
$env:ConnectionStrings__Altius = Read-Host "Cadena de conexión MySQL"
$env:AdminApiKey = Read-Host "Clave administrativa"
$env:Cors__AllowedOrigins__0 = "http://localhost:5173"
```

El esquema está en [schema.sql](Backend/Altius.Api/Infrastructure/Database/schema.sql). Ya fue aplicado a la base de desarrollo `Altius`; en una base nueva debe revisarse y ejecutarse manualmente. La API no ejecuta DDL al arrancar. La base actual contiene datos de prueba marcados con `TEST`.

## Ejecutar frontend y API

Abre dos terminales en la raíz del repositorio.

### Terminal 1: API

Configura las variables anteriores en esta terminal y ejecuta:

```powershell
dotnet run --project Backend/Altius.Api --launch-profile http
```

La API escucha en `http://localhost:5077`.

### Terminal 2: sitio web

```powershell
Set-Location web
npm install
npm run dev
```

Vite muestra la URL local al iniciar; normalmente es `http://localhost:5173`. Si ese puerto está ocupado, usa la URL que indique la terminal.

Actualmente el sitio público sigue obteniendo su contenido de datos estáticos y todavía no consume esta API. Ejecutar ambos procesos a la vez permite desarrollar y probar cada aplicación, pero no implica que el sitio ya esté conectado al catálogo o a las cotizaciones.

## Pruebas y verificaciones

Desde la raíz, para el backend:

```powershell
dotnet build ElevadoresAltius.slnx
dotnet test ElevadoresAltius.slnx
```

Para el frontend:

```powershell
Set-Location web
npm test
npm run lint
npm run build
```

## Endpoints iniciales

- `GET http://localhost:5077/api/catalog/categories`
- `GET http://localhost:5077/api/catalog/products`
- Las operaciones de escritura del catálogo y todas las rutas de cotización requieren el header `X-Admin-Api-Key` con el valor local de `AdminApiKey`.

Más detalle de la API y su configuración está en [Backend/README.md](Backend/README.md).
