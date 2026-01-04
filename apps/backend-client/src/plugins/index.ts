import { FastifyInstance } from 'fastify'
import { setup as setupSwagger } from './swagger'
import { setup as setupPrisma } from './prisma'
import { setup as setupZod } from './zod'
import { setup as setupLogger } from './logger'
import { setup as setupJwt } from './jwt'
import { setup as setupDokamerce } from './dokamerc'
import { setup as setupRedis } from './redis'
import { setup as setupTexting } from './texting'
import { setup as setupRateLimit } from './rate-limit'

export async function initialPlugins(app: FastifyInstance) {
  await setupLogger(app)
  await setupZod(app)
  await setupPrisma(app)
  await setupSwagger(app)
  await setupDokamerce(app)
  await setupJwt(app)
  await setupRedis(app)
  await setupTexting(app)
  await setupRateLimit(app, app.redis)
}
