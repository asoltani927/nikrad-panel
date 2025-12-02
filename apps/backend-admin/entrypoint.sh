#!/bin/sh
set -e

echo "🚀 Starting entrypoint script..."

# Run Prisma migrations for the API package
echo "🏗️  Running Prisma migrations..."
pnpm --filter @nikrad/api migrate:deploy

# Start the Fastify API server
echo "✅ Starting Fastify server..."
pnpm --filter @nikrad/api start
