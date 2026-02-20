# Pickfolio

Monorepo with two Next.js apps sharing a common `packages` folder.

## Structure

```
pickfolio-monorepo/
├── apps/
│   ├── pickfolio/      # Main web app (port 3000)
│   └── pickfolio-admin/    # Admin app (port 3001)
├── packages/
│   └── shared/       # @pickfolio/shared — code shared by both apps
├── package.json      # Root workspace config
└── .env.example
```

## Getting started

From the repo root:

```bash
npm install
```

Run both apps (in separate terminals):

```bash
npm run dev:web     # http://localhost:3000
npm run dev:admin   # http://localhost:3001
```

Or build everything:

```bash
npm run build
npm run build:web
npm run build:admin
```

## Shared package

Both apps depend on `@pickfolio-monorepo/shared`. Add shared utilities, types, or components in `packages/shared/src` and export them from `packages/shared/src/index.ts`, then import in either app:

```ts
import { APP_NAME, greet } from '@pickfolio-monorepo/shared';
```

Next.js is configured to transpile `@pickfolio-monorepo/shared` in both apps.

## Environment

Copy `.env.example` to `.env` in the root (or in each app if you prefer app-specific env). MongoDB and other vars are documented in `.env.example`.
