import { FastifyInstance } from 'fastify'
import Swagger from './swagger'
import Prisma from './prisma'
import Zod from './zod'
import Logger from './logger'

export async function initialPlugins(app: FastifyInstance) {
  await Logger.setup(app)
  await Zod.setup(app)
  await Prisma.setup(app)
  await Swagger.setup(app)
  // other plugins....
}
