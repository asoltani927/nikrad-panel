import fp from 'fastify-plugin'
import Redis from 'ioredis'

export default fp(async (app) => {
  const redis = new Redis({
    host: process.env.REDIS_HOST ?? '127.0.0.1',
    port: Number(process.env.REDIS_PORT) ?? 59399,
  })

  app.decorate('redis', redis)
})

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
}
