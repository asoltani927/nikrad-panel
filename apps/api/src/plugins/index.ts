import { FastifyInstance } from 'fastify'
import { setup as setupSwagger } from './swagger'
import { setup as setupPrisma } from './prisma'

export async function initialPlugins(app: FastifyInstance) {
  await setupPrisma(app)
  await setupSwagger(app)
  // other plugins....
}
