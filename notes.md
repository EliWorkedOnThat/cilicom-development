# Project notes

## Overview

This is a Next.js App Router application using TypeScript, React, and Tailwind CSS. The current app routes and shared UI are under `app/`; static assets are in `public/`.

## Current structure

- `app/` — Next.js routes, root layout, and global styles.
- `public/` — Static assets served directly by Next.js.
- `src/prisma/contract.prisma` — Prisma 8 data contract. Add or edit database models here.
- `src/prisma/contract.json` and `src/prisma/contract.d.ts` — Generated contract data and TypeScript types. Regenerate them after contract edits; keep them in version control.
- `src/prisma/db.ts` — Postgres ORM client, configured from `LOCAL_DATABASE_URL`.
- `prisma.config.ts` — Prisma CLI configuration and contract path.
- `docker-compose.yml` — Local PostgreSQL 17 service, exposed on `localhost:5422`, with a persistent Docker volume.
- `.env` — Local connection settings; ignored by Git. `.env.example` is safe to commit and documents the local setup.
- `prisma-8.md` — Prisma usage reference.
- `AGENTS.md` — Repository instructions for coding agents, including the Next.js documentation requirement.

## Local development

1. Install dependencies with `npm install`.
2. Start PostgreSQL with `docker compose up -d`.
3. Create `.env` from `.env.example` if needed and set `LOCAL_DATABASE_URL`.
4. Run `npm run dev` to start Next.js.

After editing the Prisma contract, regenerate its artifacts with:

```sh
npm run contract:emit
```

To check database connectivity and inspect its schema without changing it:

```sh
npx prisma db schema
npx prisma db verify --schema-only
```

For a new local database, preview bootstrap changes with `npx prisma db init --dry-run` before applying them.

## Prisma version note

This project uses Prisma ORM 8 PostgreSQL release-candidate packages, currently pinned to CLI `8.0.0-rc.29` and `@prisma/orm-postgres` `8.0.0-rc.21`. The matching toolchain versions are intentional; changing one package should be followed by checking the resolved Prisma toolchain and regenerating the contract.
