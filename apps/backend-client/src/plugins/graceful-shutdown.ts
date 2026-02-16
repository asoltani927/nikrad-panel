import { FastifyInstance } from 'fastify'
import gracefulShutdown from 'fastify-graceful-shutdown'

export async function setup(app: FastifyInstance) {
  await app.register(gracefulShutdown, {})

  app.gracefulShutdown(async (signal) => {
    app.log.info(`Shutting down due to ${signal}`)
    if (app.prisma) {
      app.prisma.$disconnect()
    }
    if (app.redis && app.redis.status === 'ready') {
      app.redis.quit()
    }
    await app.close()
  })
}
