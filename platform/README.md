# 🚀 Monorepo Deployment Guide

This guide explains how to **deploy backend (FastAPI) and frontend (Next.js/Nuxt) apps** using Docker in this monorepo. It covers environment setup, filtering deployments, health checks, and cleanup.

---

## 1. Prerequisites

* Docker ≥ 20.x
* Docker Compose (optional)
* Yarn ≥ 3.x
* `.env` file at project root with app-specific environment variables:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
POSTGRES_PORT=5432

REDIS_PORT=6379

BACKEND_ADMIN_PORT=8000
BACKEND_CLIENT_PORT=8001
WEB_CLIENT_PORT=3000
WEB_ADMIN_PORT=3001
```

---

## 2. Deploy Script

The deploy script `deploy.sh` supports:

### Basic usage

Deploy all apps:

```bash
yarn deploy
# or
./.deploy
```

### Filter apps

Deploy specific apps only:

```bash
# Single app
yarn deploy --filter=backend-admin

# Multiple apps
yarn deploy --filter=backend-client,web-client
```

* `--filter=APP1,APP2` → Deploy only the specified apps.
* Without `--filter`, all apps are deployed.

---

## 3. How Deployment Works

1. **Create Docker network** (if not exists).
2. **Start Postgres & Redis** as Docker containers.
3. **Build and deploy backend apps** (`backend-admin`, `backend-client`) with Prisma migrations.
4. **Build and deploy frontend apps** (`web-client`, `web-admin`) using Dockerfiles with `APP_NAME` argument.
5. **Cleanup old Docker images/containers/volumes**.
6. **Health checks** ensure each container is running and ready.

---

## 4. Health Checks

* Each app exposes a **health endpoint**:

| App             | Endpoint      |
| --------------- | ------------- |
| FastAPI backend | `/health`     |
| Next.js / Nuxt  | `/api/health` |

* Docker marks containers as `healthy` or `unhealthy`.
* Check container health:

```bash
docker ps
docker inspect <container_name> | grep Health
```

---

## 5. Docker Cleanup

To free disk space after deploy:

```bash
docker system prune -a --volumes -f
```

> Removes unused containers, images, networks, and dangling volumes. Be careful with persistent volumes (like Postgres).

---

## 6. Add a New App

1. Add your app to the monorepo under `apps/<app-name>`.
2. Create a **Dockerfile** similar to existing backend or frontend apps.
3. Add the app port to `.env`:

```env
NEW_APP_PORT=XXXX
```

4. Add the app to the deploy script loops:

```bash
for app in backend-admin backend-client NEW_APP; do
    deploy_app "$app"
done
```

---

## 7. `.deploy` Shortcut

You can run the deploy script directly with:

```bash
./.deploy
```

* It works like `yarn deploy` and forwards all arguments, e.g.:

```bash
./.deploy --filter=web-client
```

* Make sure `.deploy` is executable:

```bash
chmod +x .deploy
```

---

## 8. Notes & Best Practices

* Use persistent volumes for **Postgres** to avoid data loss.
* Use `--filter` to deploy only specific apps during development.
* Always check **health endpoints** to verify readiness.
* Clean Docker resources regularly to avoid disk overflow.

---

## 9. Quick Commands Cheat Sheet

| Command                               | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `yarn deploy`                         | Deploy all apps                             |
| `yarn deploy --filter=backend-admin`  | Deploy specific apps                        |
| `docker ps`                           | List running containers                     |
| `docker inspect <container>`          | Check health & configuration                |
| `docker system prune -a --volumes -f` | Cleanup old images, containers, and volumes |
| `./.deploy`                           | Shortcut to `yarn deploy`                   |
