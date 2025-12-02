#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

FILTER_APPS=()

# -------------------------
# Parse CLI arguments
# -------------------------
for arg in "$@"; do
  case $arg in
    --filter=*)
      IFS=',' read -ra FILTER_APPS <<< "${arg#*=}"
      ;;
    *)
      echo "❌ Unknown argument: $arg"
      exit 1
      ;;
  esac
done

# -------------------------
# Function to check if an app should deploy
# -------------------------
should_deploy() {
  local app=$1
  if [ ${#FILTER_APPS[@]} -eq 0 ]; then
    return 0  # No filter → deploy everything
  fi
  for f in "${FILTER_APPS[@]}"; do
    if [ "$f" == "$app" ]; then
      return 0
    fi
  done
  return 1
}

# ---------------------------------
# Load environment variables
# ---------------------------------
if [ -f .env ]; then
  dos2unix .env 2>/dev/null || true
  echo "==> Loading environment variables from .env..."
  export $(grep -v '^#' .env | xargs)
  echo "✔ Environment variables loaded"
else
  echo "❌ .env file not found"
  exit 1
fi

# ---------------------------------
# Docker network
# ---------------------------------
echo "==> Creating Docker network..."
docker network create app_network 2>/dev/null || true

# ---------------------------------
# Build and run Postgres
# ---------------------------------
echo "==> Starting PostgreSQL..."
docker rm -f postgres_db 2>/dev/null || true
docker run -d \
  --name postgres_db \
  --network app_network \
  -e POSTGRES_USER=${POSTGRES_USER:-postgres} \
  -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres} \
  -e POSTGRES_DB=${POSTGRES_DB:-postgres} \
  -p 127.0.0.1:${POSTGRES_PORT:-5432}:5432 \
  -v pgdata:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:15

# ---------------------------------
# Build and run Redis
# ---------------------------------
echo "==> Starting Redis..."
docker rm -f redis_server 2>/dev/null || true
docker run -d \
  --name redis_server \
  --network app_network \
  -p 127.0.0.1:${REDIS_PORT:-6379}:6379 \
  --restart unless-stopped \
  redis:7

# ---------------------------------
# Deploy backend
# ---------------------------------
deploy_backend() {
  local app=$1

  echo "-------------------------------------------"
  echo "==> Building $app..."

  # Build image
  docker build -t "$app" -f "platforms/$app/Dockerfile" . || {
    echo "❌ Build failed for $app"
    return 1
  }
  echo "✔ Build succeeded for $app"

  # Prisma migration
  echo "==> Running Prisma migrate deploy for $app..."
  docker run --rm \
    --env-file .env \
    --network app_network \
    -e DATABASE_URL="$DATABASE_URL" \
    "$app" sh -c "yarn workspace @nikrad/database prisma migrate deploy" || {
      echo "❌ Prisma migrate deploy failed"
      exit 1
    }

  # Remove old container
  docker rm -f "$app" 2>/dev/null || true

  # Ports
  normalized_app="${app//-/_}"
  port_var="${normalized_app^^}_PORT"
  port="${!port_var:-8000}"  # default port fallback

  # Exposed port
  exposed_port=$(docker inspect "$app" \
    --format '{{range $k,$v := .Config.ExposedPorts}}{{println $k}}{{end}}' \
    | cut -d'/' -f1 || echo "$port")

  echo "✔ Ports → host:$port → container:$exposed_port"

  # Run container
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
# Deploy frontend
# ---------------------------------
deploy_frontend() {
  local app=$1

  echo "-------------------------------------------"
  echo "==> Building frontend $app..."

  docker rm -f "$app" 2>/dev/null || true

  docker build \
    --build-arg APP_NAME="$app" \
    -t "$app" \
    -f "platforms/$app/Dockerfile" . || {
      echo "❌ Build failed for $app"
      return 1
    }

  normalized_app="${app//-/_}"
  port_var="${normalized_app^^}_PORT"
  port="${!port_var:-3000}"

  exposed_port=$(docker inspect "$app" \
    --format '{{range $k,$v := .Config.ExposedPorts}}{{println $k}}{{end}}' \
    | cut -d'/' -f1 || echo "$port")

  docker run -d \
    --env-file .env \
    --name "$app" \
    --network app_network \
    -p "$port:$exposed_port" \
    --restart unless-stopped \
    "$app"

  echo "✔ Frontend $app is running"
  echo "-------------------------------------------"
}

# -------------------------
# Deploy apps
# -------------------------
for app in backend-admin backend-client; do
  if should_deploy "$app"; then
    deploy_backend "$app"
  else
    echo "Skipping $app due to filter"
  fi
done

for app in web-client web-admin; do
  if should_deploy "$app"; then
    deploy_frontend "$app"
  else
    echo "Skipping $app due to filter"
  fi
done

# ---------------------------------
# Docker cleanup
# ---------------------------------
echo "==> Cleaning up unused Docker resources..."
docker system prune -a --volumes -f
echo "✔ Docker cleanup completed"
