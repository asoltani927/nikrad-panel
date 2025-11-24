# -------------------------
# 1. Base dependencies
# -------------------------
FROM node:20-alpine AS deps

WORKDIR /app

# Install libc6 to prevent Next.js crashes in Alpine
RUN apk add --no-cache libc6-compat
RUN corepack enable

# Copy monorepo files
COPY package.json ./
COPY yarn.lock ./
COPY turbo.json ./
COPY .yarn/ .yarn/
COPY .yarnrc.yml ./

# Install workspace root dependencies
RUN yarn install --frozen-lockfile


# -------------------------
# 2. Build App
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable

# Copy entire monorepo
COPY . .

# Use turbo to build only this project
ARG APP_NAME=web-client
RUN yarn turbo run build --filter=${APP_NAME}


# -------------------------
# 3. Production Runner
# -------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

# Copy standalone Next build
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

EXPOSE 3000

CMD ["node", "apps/web-client/server.js"]
