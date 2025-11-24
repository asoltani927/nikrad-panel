# -------------------------
# 1. Builder
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable

# Copy Yarn v3 files
COPY package.json yarn.lock turbo.json ./
COPY .yarn/ .yarn/
COPY .yarnrc.yml ./

# Copy workspace package.json and packages for caching
COPY apps/backend-admin/package.json ./apps/backend-admin/
COPY packages ./packages

# Install dependencies
RUN yarn install --immutable

# Copy full repo
COPY . .

# Build the backend-admin workspace
RUN yarn workspace @nikrad/backend-admin build

# -------------------------
# 2. Runner
# -------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy built dist folder
COPY --from=builder /app/apps/backend-admin/dist ./dist

# Copy only necessary package files to install production deps
COPY package.json yarn.lock ./
COPY apps/backend-admin/package.json ./apps/backend-admin/package.json
COPY packages ./packages

# Install production dependencies
RUN corepack enable && yarn install --production --immutable

EXPOSE 8000

# Run the app
CMD ["node", "dist/server.js"]
