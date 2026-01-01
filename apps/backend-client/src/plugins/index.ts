import { FastifyInstance } from 'fastify'
import { setup as setupSwagger } from './swagger'
import { setup as setupPrisma } from './prisma'
import { setup as setupZod } from './zod'
import { setup as setupLogger} from './logger'
import { setup as setupDokamerce} from './dokamerc'

export async function initialPlugins(app: FastifyInstance) {
  await setupLogger(app)
  await setupZod(app)
  await setupPrisma(app)
  await setupSwagger(app)
  await setupDokamerce(app)
  // other plugins....
}
