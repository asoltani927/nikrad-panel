# -------------------------
# 1. Base dependencies and Build App
# -------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Install libc6 to prevent crashes in Alpine
RUN apk add --no-cache libc6-compat
RUN corepack enable

# Copy monorepo package files
COPY package.json ./
COPY yarn.lock ./
COPY turbo.json ./
COPY .yarn/ .yarn/
COPY .yarnrc.yml ./

COPY apps/web-admin ./apps/web-admin
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
COPY packages/ui ./packages/ui

# Install workspace root dependencies
RUN yarn workspaces focus --all

# Build only the target Nuxt app using turbo
RUN yarn turbo run build --filter=@nikrad/web-admin


# -------------------------
# 2. Production Runner
# -------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

# Copy Nuxt build output
COPY --from=builder /app/apps/web-admin/.output ./
COPY --from=builder /app/apps/web-admin/public ./public

EXPOSE 3000

# Start Nuxt server
CMD ["node", "server/index.mjs"]
