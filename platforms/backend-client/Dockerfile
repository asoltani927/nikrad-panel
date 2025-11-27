# -------------------------
# 1. Builder
# -------------------------
FROM node:22-alpine AS builder

WORKDIR /app
RUN corepack enable

# Copy root metadata first
COPY package.json yarn.lock turbo.json .yarnrc.yml ./
COPY .yarn/ .yarn/

# Copy only the workspaces you need
COPY apps/backend-client ./apps/backend-client
COPY packages/database ./packages/database

RUN yarn workspaces focus --all 

# Generate Prisma client in database workspace
RUN yarn workspace @nikrad/database prisma generate

# Build backend-client workspace
RUN yarn workspace @nikrad/backend-client build

# -------------------------
# 2. Runner
# -------------------------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Enable corepack
RUN corepack enable

# Copy only the built backend-client code
COPY --from=builder /app/apps/backend-client/dist ./apps/backend-client/dist
COPY --from=builder /app/packages/database ./packages/database

# Copy only package files needed for production install
COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/backend-client/package.json ./apps/backend-client/package.json
COPY packages ./packages
COPY .yarn ./.yarn

RUN yarn workspaces focus --production --all

# Generate Prisma client in database workspace
RUN yarn workspace @nikrad/database prisma generate

# Expose the backend port
EXPOSE 8000

# Run the app
CMD ["sh", "-c", "yarn workspace @nikrad/backend-client start"]

# CMD ["sh", "-c", "yarn workspace @nikrad/database prisma migrate deploy && node dist/server.js"]
