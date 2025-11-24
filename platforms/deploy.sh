#!/bin/bash

set -a
source .env
set +a

# ----------------------------
# Docker network
# ----------------------------
echo "==> Creating Docker network..."
docker network create app_network 2>/dev/null || true

# ----------------------------
# Build and run Postgres
# ----------------------------
echo "==> Starting PostgreSQL..."
docker rm -f postgres_db 2>/dev/null || true
docker run -d \
  --name postgres_db \
  --network app_network \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -p 127.0.0.1:$POSTGRES_PORT:5432 \
  -v pgdata:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:15

# ----------------------------
# Build and run Redis
# ----------------------------
echo "==> Starting Redis..."
docker rm -f redis_server 2>/dev/null || true
docker run -d \
  --name redis_server \
  --network app_network \
  -p 127.0.0.1:$REDIS_PORT:6379 \
  --restart unless-stopped \
  redis:7

# ----------------------------
# Build and run FastAPI apps
# ----------------------------
for app in backend-admin backend-client; do
  echo "==> Building and running $app..."
  docker rm -f $app 2>/dev/null || true
  docker build -t $app-prod ./apps/$app
  port_var=$(echo ${app^^}_PORT)  # convert to uppercase + _PORT
  port=${!port_var}
  docker run -d \
    --name $app \
    --network app_network \
    -p $port:$(docker inspect $app-prod --format='{{(index (json (index .Config.ExposedPorts 0) "0"))}}' 2>/dev/null || echo $port) \
    --restart unless-stopped \
    $app-prod
done

# ----------------------------
# Build and run Next.js apps
# ----------------------------
for app in web-client web-admin; do
  echo "==> Building and running $app..."
  docker rm -f $app 2>/dev/null || true
  docker build --build-arg APP_NAME=$app -t $app-prod ./apps/$app
  port_var=$(echo ${app^^}_PORT)  # uppercase variable
  port=${!port_var}
  docker run -d \
    --name $app \
    --network app_network \
    -p $port:3000 \
    --restart unless-stopped
