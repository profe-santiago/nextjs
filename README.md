# Scaffolding: Next.js + Prisma + JWT + PostgreSQL
### Full-Stack · App Router · DSD-2303

> **¿Cuándo usar este enfoque?**  
> Proyectos donde el backend y el frontend viven en el mismo repositorio y se despliegan como una sola unidad. Next.js con App Router permite definir Route Handlers como endpoints REST junto a los componentes React que los consumen, sin necesidad de un servidor separado.

---

## Diferencia clave vs. los otros stacks

| | Next.js Full-Stack | Express + Prisma | React + Vite |
|---|---|---|---|
| Arquitectura | Monorepo full-stack | Backend independiente | Frontend puro (SPA) |
| Backend | Route Handlers (`app/api/`) | Express routers (`src/`) | No aplica |
| Frontend | Server + Client Components | React externo | React externo |
| Rendering | SSR / SSG / SPA híbrido | No aplica | Solo CSR |
| ORM | Prisma 7 | Prisma 7 | No aplica |
| JWT | `jose` (Edge-compatible) | `jsonwebtoken` | No aplica |
| Documentación | swagger-jsdoc + swagger-ui-react | swagger-jsdoc + swagger-ui-express | No aplica |
| Servidor dev | `next dev` | `tsx watch` | `vite dev` |

---

## Stack

### Backend (Route Handlers)

| Librería | Versión | Propósito |
|---|---|---|
| `next` | 15.x | Framework: routing, SSR, API handlers |
| `@prisma/client` | 7.x | ORM — cliente generado con tipos automáticos |
| `@prisma/adapter-pg` | 7.x | Adaptador PostgreSQL para PrismaClient |
| `zod` | 3.x | Validación de requests en runtime |
| `jose` | 5.x | JWT compatible con Edge Runtime de Next.js |
| `bcryptjs` | 3.x | Hash de contraseñas |
| `swagger-jsdoc` | 6.x | Genera spec OpenAPI desde comentarios JSDoc |

### Frontend (App Router)

| Librería | Versión | Propósito |
|---|---|---|
| `react` | 19.x | Librería de UI |
| `react-dom` | 19.x | Renderizado en el DOM |
| `@tanstack/react-query` | 5.x | Caché y sincronización de server state |
| `zustand` | 5.x | Estado global del cliente (auth, UI) |
| `react-hook-form` | 7.x | Manejo de formularios con validación |
| `@hookform/resolvers` | 3.x | Puente entre React Hook Form y Zod |
| `swagger-ui` | CDN | Swagger UI servido como HTML estático (sin dependencia npm) |

### Desarrollo

| Librería | Propósito |
|---|---|
| `prisma` | CLI: migraciones y generación del cliente |
| `typescript` | 5.x — compilador TypeScript |
| `@types/bcryptjs` | Tipos para bcryptjs |
| `@types/swagger-jsdoc` | Tipos para swagger-jsdoc |
| `tailwindcss` | Framework CSS utility-first |
| `@tailwindcss/postcss` | Plugin PostCSS para Tailwind CSS 4.x |

> **¿Por qué no `swagger-ui-react`?**  
> `swagger-ui-react@5.x` declara peer dependencies con React `^18`, pero `create-next-app` instala React 19. Esto genera conflictos de dependencias en la instalación. La solución es servir Swagger UI directamente desde CDN a través de un Route Handler que devuelve HTML — sin dependencia npm, sin conflictos, y con la misma UI que los estudiantes ya conocen de los otros stacks.

---

## Estructura de Carpetas

```
mi_proyecto/
├── app/
│   ├── layout.tsx                        ← Layout raíz: HTML, proveedores globales
│   ├── page.tsx                          ← Página principal (redirecciona a /users)
│   │
│   ├── api/                              ← Route Handlers (backend)
│   │   └── v1/
│   │       ├── users/
│   │       │   ├── route.ts              ← GET /api/v1/users · POST /api/v1/users
│   │       │   └── [id]/
│   │       │       ├── route.ts          ← GET /api/v1/users/:id
│   │       │       └── deactivate/
│   │       │           └── route.ts      ← POST /api/v1/users/:id/deactivate
│   │       └── docs/
│   │           └── route.ts              ← GET /api/v1/docs (spec OpenAPI JSON)
│   │
│   └── api/
│       └── v1/
│           └── docs/
│               └── ui/
│                   └── route.ts          ← GET /api/v1/docs/ui (Swagger UI HTML)  ⚠️ crear manualmente
│
├── src/
│   │
│   ├── lib/                              ← Infraestructura compartida
│   │   ├── prisma.ts                     ← Singleton de PrismaClient               ⚠️ crear manualmente
│   │   ├── jwt.ts                        ← Helpers sign/verify con jose             ⚠️ crear manualmente
│   │   ├── swagger.ts                    ← Configuración de swagger-jsdoc           ⚠️ crear manualmente
│   │   └── axios.ts                      ← Instancia Axios para el frontend         ⚠️ crear manualmente
│   │
│   ├── store/
│   │   └── auth.store.ts                 ← Estado global de auth (Zustand)          ⚠️ crear manualmente
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx                ← Navbar + contenido + footer              ⚠️ crear manualmente
│   │   └── AuthLayout.tsx                ← Contenedor centrado para auth            ⚠️ crear manualmente
│   │
│   ├── components/
│   │   └── Button.tsx                    ← Componente UI reutilizable               ⚠️ crear manualmente
│   │
│   ├── hooks/
│   │   └── useDebounce.ts                ← Hook genérico reutilizable               ⚠️ crear manualmente
│   │
│   ├── constants/
│   │   └── app.constants.ts              ← Valores fijos reutilizables              ⚠️ crear manualmente
│   │
│   ├── utils/
│   │   └── formatDate.ts                 ← Funciones puras de utilidad              ⚠️ crear manualmente
│   │
│   └── features/
│       └── users/
│           ├── users.types.ts            ← Interfaces TypeScript del dominio        ⚠️ crear manualmente
│           ├── users.schema.ts           ← Schemas Zod compartidos (API + forms)    ⚠️ crear manualmente
│           ├── users.repository.ts       ← Acceso a datos, abstrae Prisma           ⚠️ crear manualmente
│           ├── users.service.ts          ← Lógica de negocio del backend            ⚠️ crear manualmente
│           ├── users.api.ts              ← Llamadas HTTP desde el frontend          ⚠️ crear manualmente
│           ├── users.queries.ts          ← Hooks TanStack Query                     ⚠️ crear manualmente
│           └── UserList.tsx              ← Componente del dominio (Client)          ⚠️ crear manualmente
│
├── prisma/
│   ├── schema.prisma                     ← Definición del modelo de BD
│   └── migrations/                       ← Generado por Prisma
│
├── prisma.config.ts                      ← Configuración de conexión Prisma 7
├── .env
├── .env.example
├── .gitignore
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

> **¿Por qué `src/` para el código compartido si el routing vive en `app/`?**  
> Next.js soporta ambas convenciones. `app/` pertenece al framework (routing, layouts, pages, Route Handlers). `src/` agrupa la lógica propia: features, lib, store, components. Esta separación evita mezclar archivos de routing con archivos de lógica de negocio dentro de la misma carpeta `app/`.

---

## Arquitectura Multicapa

### Backend (Route Handlers)

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Route Handler | `app/api/v1/users/route.ts` | Endpoint HTTP, valida con Zod, delega al servicio |
| Schema | `src/features/users/users.schema.ts` | Validación Zod compartida (API + formularios) |
| Servicio | `src/features/users/users.service.ts` | Lógica de negocio |
| Repositorio | `src/features/users/users.repository.ts` | Acceso a datos, abstrae Prisma |
| Infraestructura | `src/lib/prisma.ts`, `src/lib/jwt.ts` | Singleton Prisma, helpers JWT |

### Frontend (App Router)

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Tipos | `src/features/users/users.types.ts` | Interfaces TypeScript del dominio |
| API Client | `src/features/users/users.api.ts` | Llamadas HTTP, abstrae Axios |
| Queries | `src/features/users/users.queries.ts` | Caché con TanStack Query |
| Store | `src/store/auth.store.ts` | Estado global del cliente (Zustand) |
| Vista | `src/features/users/UserList.tsx` | Client Component del dominio |
| Página | `app/(routes)/users/page.tsx` | Server Component: renderiza el Client Component |

> **¿`users.schema.ts` sirve para los dos lados?**  
> Sí — y esa es una ventaja única del full-stack en un solo proyecto. El schema Zod de `CreateUserInput` se usa en el Route Handler (para validar el body del request) **y** en el formulario de React (como resolver de React Hook Form), garantizando que ambos lados apliquen exactamente las mismas reglas.

---

## Paso a Paso

### 1. Crear el proyecto con Next.js

```bash
npx create-next-app@latest mi_proyecto \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --no-eslint \
  --import-alias "@/*"

cd mi_proyecto
```

> El flag `--app` activa el App Router. `--src-dir` crea la carpeta `src/` para el código propio. `--import-alias "@/*"` configura el alias `@/` apuntando a `src/`.

Durante la instalación, el CLI hace dos preguntas adicionales:

| Pregunta | Respuesta | Motivo |
|---|---|---|
| Would you like to use React Compiler? | **No** | Está en fase beta y puede generar comportamientos inesperados con Zustand y React Hook Form. No aporta valor en un proyecto académico donde la claridad importa más que la optimización automática. |
| Would you like to include AGENTS.md? | **No** | Es un archivo de instrucciones para herramientas de IA (Copilot, Cursor). No es relevante para el scaffolding y solo agrega un archivo que los estudiantes no van a usar. |

### 2. Instalar dependencias

```bash
# Producción
npm install \
  @prisma/client @prisma/adapter-pg \
  zod jose bcryptjs \
  swagger-jsdoc \
  @tanstack/react-query \
  zustand \
  react-hook-form @hookform/resolvers \
  axios

# Desarrollo
npm install -D \
  prisma \
  @types/bcryptjs \
  @types/swagger-jsdoc
```

### 3. Inicializar Prisma

```bash
npx prisma init
```

### 4. Scaffolding de carpetas y archivos

```bash
# Backend — Route Handlers
mkdir -p app/api/v1/users/\[id\]/deactivate
mkdir -p app/api/v1/docs/ui

touch app/api/v1/users/route.ts
touch app/api/v1/users/\[id\]/route.ts
touch app/api/v1/users/\[id\]/deactivate/route.ts
touch app/api/v1/docs/route.ts
touch app/api/v1/docs/ui/route.ts

# Infraestructura compartida
mkdir -p src/lib src/store src/layouts src/components \
         src/hooks src/constants src/utils

touch src/lib/prisma.ts
touch src/lib/jwt.ts
touch src/lib/swagger.ts
touch src/lib/axios.ts
touch src/store/auth.store.ts
touch src/layouts/MainLayout.tsx
touch src/layouts/AuthLayout.tsx
touch src/components/Button.tsx
touch src/hooks/useDebounce.ts
touch src/constants/app.constants.ts
touch src/utils/formatDate.ts

# Feature users
mkdir -p src/features/users

touch src/features/users/users.types.ts
touch src/features/users/users.schema.ts
touch src/features/users/users.repository.ts
touch src/features/users/users.service.ts
touch src/features/users/users.api.ts
touch src/features/users/users.queries.ts
touch src/features/users/UserList.tsx

# Entorno
touch .env.example
```

---

## Archivos de Configuración

### `.env`
```ini
DATABASE_URL=postgresql://testuser:testuser@localhost:5432/nextjs_db
JWT_SECRET=MySecretKeyForNextJSAppThatIsAtLeast256BitsLong
JWT_EXPIRES_IN=30m
PORT=3000
NODE_ENV=development
APP_NAME=My Next.js App
APP_DESCRIPTION=A simple Next.js full-stack app
APP_VERSION=1.0.0
```

> ⚠️ La contraseña en `DATABASE_URL` **no debe contener caracteres especiales**. Usa solo letras, números, guiones y guiones bajos.  
> ⚠️ `JWT_SECRET` debe tener **al menos 32 caracteres** para el algoritmo HS256 de `jose`.  
> ⚠️ En Next.js, las variables del servidor (sin prefijo `NEXT_PUBLIC_`) **nunca se exponen al cliente**. Las variables de Prisma y JWT deben quedarse sin ese prefijo.

### `.env.example`
```ini
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=
NODE_ENV=
APP_NAME=
APP_DESCRIPTION=
APP_VERSION=
```

### `.gitignore`
```
node_modules/
.next/
dist/
.env
.DS_Store
```

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(255)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  @@map("users")
}
```

> ⚠️ A partir de **Prisma 7**, la propiedad `url` ya no se define en `schema.prisma`. La URL de conexión se mueve a `prisma.config.ts`.

### `prisma.config.ts`

```typescript
// A partir de Prisma 7, este archivo centraliza la configuración de conexión.
// Debe estar en la raíz del proyecto (junto a package.json).

import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

### `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
```

### `postcss.config.mjs`

`create-next-app` genera este archivo automáticamente al usar `--tailwind`. Verificar que el contenido sea:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

### `src/app/globals.css`

Reemplazar el contenido generado con:

```css
@import "tailwindcss";
```

---

## Infraestructura — `src/lib/`

### `src/lib/prisma.ts`

```typescript
// Singleton de PrismaClient para Next.js.
// En desarrollo, Next.js recarga módulos en hot-reload. Sin el singleton,
// cada recarga crearía una nueva conexión a la BD hasta agotar el pool.
// La variable global persiste entre recargas en desarrollo.

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const createPrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

> **¿Por qué `globalThis` y no simplemente `new PrismaClient()`?**  
> Next.js en desarrollo recarga módulos con cada cambio. Sin el patrón del singleton, cada recarga abre una nueva conexión a PostgreSQL. Con `globalThis`, la instancia sobrevive entre recargas del hot-reload y evita el agotamiento del pool de conexiones.

### `src/lib/jwt.ts`

```typescript
// Helpers para firmar y verificar JWT con jose.
// jose usa la Web Crypto API — funciona en Node.js y en el Edge Runtime
// de Next.js (Middleware, Edge API Routes), a diferencia de jsonwebtoken.

import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface JwtPayload {
  sub: string;
  email: string;
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? '30m')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as JwtPayload;
}
```

> **`jose` vs `jsonwebtoken`**: `jsonwebtoken` depende del módulo `crypto` de Node.js y no puede ejecutarse en el Edge Runtime de Next.js. `jose` está construida sobre la Web Crypto API estándar, que funciona en ambos entornos sin configuración adicional.

### `src/lib/swagger.ts`

```typescript
// Configuración de swagger-jsdoc.
// Lee los comentarios @swagger de los Route Handlers y genera la spec OpenAPI.
// Se importa desde el Route Handler GET /api/v1/docs.

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       process.env.APP_NAME        ?? 'Next.js API',
      description: process.env.APP_DESCRIPTION ?? 'API documentation',
      version:     process.env.APP_VERSION     ?? '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type:         'http',
          scheme:       'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // swagger-jsdoc lee los comentarios JSDoc de los route handlers
  apis: ['./app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
```

### `src/lib/axios.ts`

```typescript
// Instancia configurada de Axios para el frontend.
// Centraliza la baseURL y agrega el token JWT a cada request.

import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de request: adjunta el token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response: manejo centralizado de errores HTTP
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

> **`baseURL: '/api/v1'`** — En un proyecto full-stack Next.js, el frontend y el backend comparten el mismo origen, por lo que la URL base es relativa. No se necesita `NEXT_PUBLIC_API_URL` para apuntar a un servidor externo.

---

## Route Handlers para Swagger UI

### `app/api/v1/docs/route.ts`

```typescript
// Sirve la spec OpenAPI generada por swagger-jsdoc como JSON.
// El Route Handler de la UI la consume desde /api/v1/docs.

import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

export function GET() {
  return NextResponse.json(swaggerSpec);
}
```

### `app/api/v1/docs/ui/route.ts`

```typescript
// Sirve Swagger UI como una página HTML que carga la librería desde CDN.
// Evita instalar swagger-ui-react, que tiene conflictos de peer deps con React 19.
// La spec se carga dinámicamente desde /api/v1/docs.

import { NextResponse } from 'next/server';

export function GET() {
  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js"></script>
    <script>
      SwaggerUIBundle({
        url: '/api/v1/docs',
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        layout: 'BaseLayout',
      });
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

> **¿Por qué este enfoque en lugar de `swagger-ui-react`?**  
> `swagger-ui-react@5.x` declara peer dependencies con React `^18`, generando conflictos al instalar con React 19. Servir la UI como HTML desde un Route Handler elimina la dependencia npm completamente — Swagger UI se carga desde CDN, funciona con cualquier versión de React, y la experiencia para el usuario final es idéntica.

---

## Esqueleto de Capas — Feature `users`

### `src/features/users/users.types.ts`

```typescript
// Interfaces TypeScript del dominio User.
// Reflejan la forma de los datos que devuelve la API.

export interface User {
  id:        number;
  name:      string;
  email:     string;
  isActive:  boolean;
  createdAt: string;
}

export interface CreateUserPayload {
  name:  string;
  email: string;
}
```

### `src/features/users/users.schema.ts`

```typescript
// Schemas Zod del dominio User.
// Compartido entre Route Handlers (validación del body) y formularios React
// (resolver de React Hook Form). Una sola fuente de verdad para las reglas.

import { z } from 'zod';

export const createUserSchema = z.object({
  name:  z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Formato de email inválido'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### `src/features/users/users.repository.ts`

```typescript
// Repositorio: única capa que accede a Prisma directamente.
// El servicio nunca importa prisma — solo llama métodos de este módulo.

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { CreateUserInput } from './users.schema';

export const userRepository = {
  findAll: (): Promise<User[]> =>
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),

  findById: (id: number): Promise<User | null> =>
    prisma.user.findUnique({ where: { id } }),

  findByEmail: (email: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { email } }),

  create: (data: CreateUserInput): Promise<User> =>
    prisma.user.create({ data }),

  deactivate: (id: number): Promise<User> =>
    prisma.user.update({
      where: { id },
      data:  { isActive: false },
    }),
};
```

### `src/features/users/users.service.ts`

```typescript
// Servicio: lógica de negocio del dominio User.
// Orquesta el repositorio y lanza errores que los Route Handlers convierten en HTTP.

import { userRepository } from './users.repository';
import { CreateUserInput } from './users.schema';
import { User } from '@prisma/client';

export class ServiceError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export const userService = {
  getAll: (): Promise<User[]> =>
    userRepository.findAll(),

  getById: async (id: number): Promise<User> => {
    const user = await userRepository.findById(id);
    if (!user) throw new ServiceError('Usuario no encontrado', 404);
    return user;
  },

  create: async (data: CreateUserInput): Promise<User> => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ServiceError('El email ya está registrado', 400);
    return userRepository.create(data);
  },

  deactivate: async (id: number): Promise<User> => {
    const user = await userRepository.findById(id);
    if (!user) throw new ServiceError('Usuario no encontrado', 404);
    return userRepository.deactivate(id);
  },
};
```

---

## Route Handlers

### `app/api/v1/users/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { userService, ServiceError } from '@/features/users/users.service';
import { createUserSchema } from '@/features/users/users.schema';

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
export async function GET() {
  try {
    const users = await userService.getAll();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos o email duplicado
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const user = await userService.create(parsed.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
```

### `app/api/v1/users/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { userService, ServiceError } from '@/features/users/users.service';

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await userService.getById(Number(id));
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
```

> **¿Por qué `params` es una `Promise`?**  
> A partir de Next.js 15, los parámetros de ruta dinámica se resuelven de forma asíncrona. Es necesario hacer `await params` antes de acceder a sus propiedades.

### `app/api/v1/users/[id]/deactivate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { userService, ServiceError } from '@/features/users/users.service';

/**
 * @swagger
 * /api/v1/users/{id}/deactivate:
 *   post:
 *     summary: Desactivar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario desactivado
 *       404:
 *         description: Usuario no encontrado
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await userService.deactivate(Number(id));
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
```

---

## Frontend — Feature `users`

### `src/features/users/users.api.ts`

```typescript
// Funciones HTTP del dominio User para el frontend.
// Solo esta capa conoce Axios — los componentes nunca lo importan directamente.

import { api } from '@/lib/axios';
import type { User, CreateUserPayload } from './users.types';

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  deactivate: async (id: number): Promise<User> => {
    const { data } = await api.post<User>(`/users/${id}/deactivate`);
    return data;
  },
};
```

### `src/features/users/users.queries.ts`

```typescript
// Hooks TanStack Query del dominio User.
// Envuelven usersApi con caché, estados de carga y sincronización automática.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from './users.api';
import type { CreateUserPayload } from './users.types';

export const userKeys = {
  all:    ['users']               as const,
  detail: (id: number) => ['users', id] as const,
};

export const useUsers = () =>
  useQuery({ queryKey: userKeys.all, queryFn: usersApi.getAll });

export const useUser = (id: number) =>
  useQuery({ queryKey: userKeys.detail(id), queryFn: () => usersApi.getById(id) });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => usersApi.create(payload),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersApi.deactivate(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};
```

### `src/features/users/UserList.tsx`

```tsx
// Client Component del dominio User.
// 'use client' es obligatorio para usar hooks de estado y TanStack Query.

'use client';

import { useUsers, useCreateUser } from './users.queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, type CreateUserInput } from './users.schema';
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/formatDate';

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();
  const { mutate: createUser, isPending } = useCreateUser();

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = (values: CreateUserInput) => {
    createUser(values, { onSuccess: () => reset() });
  };

  if (isLoading) return <p className="p-4">Cargando...</p>;
  if (isError)   return <p className="p-4 text-red-500">Error al cargar usuarios.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-2">
        <input
          {...register('name')}
          placeholder="Nombre"
          className="border rounded px-3 py-2"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

        <input
          {...register('email')}
          placeholder="Email"
          className="border rounded px-3 py-2"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creando...' : 'Crear usuario'}
        </Button>
      </form>

      <ul className="flex flex-col gap-2">
        {users?.map((u) => (
          <li key={u.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">{formatDate(u.createdAt)}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {u.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Estado Global — Zustand

### `src/store/auth.store.ts`

```typescript
import { create } from 'zustand';

interface AuthState {
  accessToken:     string | null;
  isAuthenticated: boolean;
  login:  (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:     typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false,

  login: (accessToken) => {
    localStorage.setItem('access_token', accessToken);
    set({ accessToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ accessToken: null, isAuthenticated: false });
  },
}));
```

> **¿Por qué `typeof window !== 'undefined'`?**  
> Zustand se inicializa tanto en el servidor (SSR) como en el cliente. `localStorage` no existe en el servidor, por lo que el guard evita el error `ReferenceError: localStorage is not defined` durante el SSR.

---

## Layouts y Proveedores

### `src/layouts/MainLayout.tsx`

```tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Mi App</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/users"   className="hover:underline">Usuarios</Link>
          <Link href="/docs"    className="hover:underline">API Docs</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4">
        DSD-2303 · Instituto Tecnológico de Oaxaca
      </footer>
    </div>
  );
}
```

### `app/layout.tsx`

Reemplazar el contenido generado con:

```tsx
// Layout raíz de Next.js.
// Registra los proveedores globales: QueryClientProvider para TanStack Query.
// 'use client' no aplica aquí — Next.js permite Providers en Server Components
// envolviendo componentes con la directiva 'use client' en un archivo separado.

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: process.env.APP_NAME ?? 'Next.js App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### `app/providers.tsx`

Crear este archivo junto a `layout.tsx`:

```tsx
// Proveedores globales del cliente.
// Se separa de layout.tsx para mantener layout.tsx como Server Component.

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // useState garantiza que cada instancia del servidor tenga su propio QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## Skeletons de Utilidades

### `src/components/Button.tsx`

```tsx
'use client';

import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const base   = 'rounded px-4 py-2 font-medium disabled:opacity-50';
  const styles = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
```

### `src/hooks/useDebounce.ts`

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```

### `src/constants/app.constants.ts`

```typescript
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Mi App';

export const ROLES = {
  ADMIN: 'admin',
  USER:  'user',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE:     1,
  DEFAULT_PER_PAGE: 10,
} as const;
```

### `src/utils/formatDate.ts`

```typescript
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateString));
}
```

---

## Configurar y ejecutar Prisma

```bash
# Asegurarse de que la BD exista antes de migrar
# En psql:
# CREATE DATABASE nextjs_db;

# Crear la primera migración
npx prisma migrate dev --name create_users_table

# Generar el cliente con los tipos actualizados
npx prisma generate
```

---

## Verificación Final

```bash
npm run dev
```

- `http://localhost:3000/users` → Lista de usuarios con navbar ✅
- `http://localhost:3000/api/v1/docs/ui` → Swagger UI carga correctamente ✅
- `http://localhost:3000/api/v1/users` → `[]` (lista vacía) ✅
- `http://localhost:3000/api/v1/docs` → Spec OpenAPI en JSON ✅

> ⚠️ Si el backend tiene CORS restringido al conectarse con un cliente externo, no aplica aquí: frontend y backend comparten el mismo origen en un proyecto full-stack Next.js.

---

## Endpoints disponibles tras el scaffolding

| Método | URL | Acción | Auth |
|--------|-----|--------|------|
| GET | `/api/v1/users` | Listar usuarios | JWT |
| POST | `/api/v1/users` | Crear usuario | JWT |
| GET | `/api/v1/users/:id` | Ver usuario | JWT |
| POST | `/api/v1/users/:id/deactivate` | Desactivar usuario | JWT |
| GET | `/api/v1/docs` | Spec OpenAPI (JSON) | No |
| GET | `/api/v1/docs/ui` | Swagger UI interactivo | No |

> Cuando el proyecto crezca y necesite una `v2`, basta con crear la carpeta `app/api/v2/` con sus Route Handlers sin romper los clientes que usan `v1`.

---

## Errores frecuentes y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `ReferenceError: window is not defined` | Código de cliente ejecutándose en SSR | Agregar `'use client'` al componente o usar `typeof window !== 'undefined'` |
| `ReferenceError: localStorage is not defined` | Zustand inicializándose en el servidor | Usar el guard `typeof window !== 'undefined'` al leer `localStorage` |
| `Error: swagger-ui-react not found` | Paquete no instalado o no transpilado | Verificar `transpilePackages: ['swagger-ui-react']` en `next.config.ts` |
| `Can't reach database server` | BD no creada o `DATABASE_URL` incorrecta | Crear la BD con `CREATE DATABASE nextjs_db;` y verificar `.env` |
| `Prisma Client is not generated` | Cliente desactualizado | Ejecutar `npx prisma generate` |
| `The datasource property url is no longer supported` | Prisma 7 — URL no va en `schema.prisma` | Crear `prisma.config.ts` en la raíz con `datasource.url` |
| `ERROR: permiso denegado al esquema public` | Usuario de BD sin permisos | Ejecutar `GRANT ALL ON SCHEMA public TO testuser;` como superusuario |
| `params should be awaited` | Next.js 15 — params es una Promise | Usar `const { id } = await params` en los Route Handlers |
| `Module not found: 'swagger-jsdoc'` | Dependencia no instalada | Ejecutar `npm install swagger-jsdoc @types/swagger-jsdoc` |
| `ERESOLVE overriding peer dependency` al instalar | `swagger-ui-react@5.x` declara peer deps con React 18 | Este conflicto se evita usando el enfoque CDN — no instalar `swagger-ui-react` |

---

*DSD-2303 · Desarrollo de Servicios Web · Instituto Tecnológico de Oaxaca*
