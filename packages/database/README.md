# @nikrad/database

Shared database package for the Nikrad monorepo.

## Setup

1. Copy `.env.example` to `.env` and update the `DATABASE_URL`:

```bash
cp .env.example .env
```

2. Generate Prisma Client:

```bash
yarn db:generate
# or from the root: yarn workspace @nikrad/database db:generate
```

3. Run migrations:

```bash
yarn db:migrate
# or from the root: yarn workspace @nikrad/database db:migrate
```

4. Seed the database:

```bash
yarn db:seed
# or from the root: yarn workspace @nikrad/database db:seed
```

## Available Scripts

- `db:generate` - Generate Prisma Client
- `db:push` - Push schema changes to database without migrations
- `db:migrate` - Create and run migrations
- `db:studio` - Open Prisma Studio
- `db:seed` - Seed the database with mock data
- `db:reset` - Reset database and re-run migrations and seeds

## Usage in Apps

Import Prisma Client from this package:

```typescript
import { PrismaClient } from '@nikrad/database'

const prisma = new PrismaClient()
```

Or import types:

```typescript
import type { User, Category } from '@nikrad/database'
```

## Schema

The Prisma schema is located at `prisma/schema.prisma`.

## Seeds

Seed functions are located in `prisma/seed/` directory.

