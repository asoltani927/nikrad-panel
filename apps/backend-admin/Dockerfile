FROM node:20-alpine AS builder

WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

COPY package.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
# COPY package.json yarn.lock ./

COPY package.json ./

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/server.js"]
