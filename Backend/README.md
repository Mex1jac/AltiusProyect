# Backend Altius

API ASP.NET Core 10 con capas `Domain`, `Application`, `Infrastructure` y `Controllers`. Dapper y MySqlConnector conectan con MySQL.

## Configuración local

No se guardan secretos en `appsettings.json`. Define estos valores en el entorno de ejecución:

- `ConnectionStrings__Altius`: cadena de conexión MySQL.
- `AdminApiKey`: clave para operaciones administrativas y rutas de cotización.
- `Cors__AllowedOrigins__0`: origen permitido del frontend, por ejemplo `http://localhost:5173`.

En PowerShell, define las variables en la terminal que ejecutará la API; no las agregues a archivos versionados.

## Esquema

El script inicial está en `Altius.Api/Infrastructure/Database/schema.sql`. Ya se aplicó a la BD `Altius` (7 tablas y 6 relaciones FK, sin datos iniciales). La API no ejecuta DDL al arrancar; cualquier cambio posterior al esquema debe aplicarse de forma controlada.

La BD de desarrollo contiene datos identificados con `TEST`, lote `20261105-86b16d`: 6 categorías, 6 productos, 6 cotizaciones y 12 líneas. Las cotizaciones cubren estados borrador, enviada, aceptada, rechazada y expirada. No usar estos registros como datos reales.

## Ejecución y pruebas

Desde la raíz del repositorio:

```powershell
dotnet run --project Backend/Altius.Api
dotnet test ElevadoresAltius.slnx
```

Las pruebas existentes son unitarias; todavía no hay pruebas de integración que escriban en MySQL.

## API inicial

- `GET /api/catalog/categories`
- `POST`, `PUT` y `PATCH .../active` para administrar categorías; requieren `X-Admin-Api-Key`.
- `GET /api/catalog/products` con filtro opcional `categoryId`.
- `POST`, `PUT` y `PATCH .../active` para administrar productos; requieren `X-Admin-Api-Key`.
- Las rutas `/api/quotes` permiten crear, consultar, versionar y cambiar estado; todas requieren `X-Admin-Api-Key`.

La clave compartida es una protección temporal de la API inicial. Antes de exponerla a Internet debe sustituirse por autenticación y autorización con usuarios/roles, y agregarse limitación de solicitudes al ingreso público de cotizaciones.