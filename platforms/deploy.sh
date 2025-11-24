#!/bin/bash

# ---------------------------------
# Load environment variables
# ---------------------------------
sed -i 's/\r$//' .env

echo "==> Loading environment variables from .env..."
export $(grep -v '^#' .env | xargs)
echo "✔ Environment variables loaded"

# ---------------------------------
# Docker network
# ---------------------------------
echo "==> Creating Docker network..."
# docker network create app_network 2>/dev/null || true

# ---------------------------------
# Build and run Postgres
# ---------------------------------
echo "==> Starting PostgreSQL..."
docker rm -f postgres_db 2>/dev/null || true
# Uncomment to run Postgres
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

# ---------------------------------
# Build and run Redis
# ---------------------------------
echo "==> Starting Redis..."
docker rm -f redis_server 2>/dev/null || true
# Uncomment to run Redis
docker run -d \
  --name redis_server \
  --network app_network \
  -p 127.0.0.1:$REDIS_PORT:6379 \
  --restart unless-stopped \
  redis:7

# ---------------------------------
# Function to deploy a Docker app
# ---------------------------------
deploy_app() {
  local app=$1

  echo "-------------------------------------------"
  echo "==> Building $app..."

  # 1️⃣ Build image first
  if ! docker build -t "$app" -f "platforms/$app/Dockerfile" .; then
    echo "❌ Build failed for $app — keeping existing container running"
    return 1
  fi
  echo "✔ Build succeeded for $app"

    echo "==> Running Prisma migrate deploy for $app..."
    if ! docker run --rm \
      --env-file .env \
      --network app_network \
      -e DATABASE_URL="$DATABASE_URL" \
      "$app" sh -c "yarn workspace @nikrad/database prisma migrate deploy"; then
      echo "❌ Prisma migrate deploy failed — aborting deploy"
      exit 1
  fi

  # 3️⃣ Remove old container safely
  echo "==> Removing old container..."
  docker rm -f "$app" 2>/dev/null || true

  # 4️⃣ Determine ports
  normalized_app="${app//-/_}"
  port_var="${normalized_app^^}_PORT"
  port="${!port_var:-}"

  if [ -z "$port" ]; then
    echo "❌ ERROR: Environment variable $port_var is not set"
    exit 1
  fi

  # Extract exposed port from Dockerfile
  exposed_port=$(docker inspect "$app" \
    --format '{{range $k,$v := .Config.ExposedPorts}}{{println $k}}{{end}}' \
    | cut -d'/' -f1)

  if [ -z "$exposed_port" ]; then
    echo "❌ ERROR: No EXPOSE found in Dockerfile for $app"
    exit 1
  fi

  echo "✔ Ports resolved → host:$port → container:$exposed_port"

  # 5️⃣ Run container
  echo "==> Starting container $app..."
  docker run -d \
    --env-file .env \
    -e DATABASE_URL="$DATABASE_URL" \
    --name "$app" \
    --network app_network \
    -p "$port:$exposed_port" \
    --restart unless-stopped \
    "$app"

  echo "✔ $app is running"
  echo "-------------------------------------------"
}

# ---------------------------------
# Deploy FastAPI apps
# ---------------------------------
for app in backend-admin; do
  deploy_app "$app"
done

# ---------------------------------
# Deploy Next.js apps
# ---------------------------------
# for app in web-client web-admin; do
#   echo "-------------------------------------------"
#   echo "==> Building and running $app..."

#   docker rm -f "$app" 2>/dev/null || true
#   docker build --build-arg APP_NAME="$app" -t "$app" "./apps/$app"

#   port_var="${app^^}_PORT"
#   port="${!port_var:-}"

#   if [ -z "$port" ]; then
#     echo "❌ ERROR: Environment variable $port_var is not set"
#     exit 1
#   fi

#   docker run -d \
#     --name "$app" \
#     --network app_network \
#     -p "$port:3000" \
#     --restart unless-stopped \
#     "$app"

#   echo "✔ $app is running"
#   echo "-------------------------------------------"
# done
