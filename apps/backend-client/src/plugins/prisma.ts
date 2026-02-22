// src/plugins/prisma.ts
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@nikrad/database'

export async function setup(app: FastifyInstance) {
  const prismaPlugin = fp(async (app: FastifyInstance) => {
    const prisma = new PrismaClient({
      log: ['warn', 'error'],
    })
    await prisma.$connect()
    app.decorate('prisma', prisma)
    app.addHook('onClose', async (app) => {
      await app.prisma.$disconnect()
      app.log.info('Prisma disconnected')
    })
  })

  await app.register(prismaPlugin)
}
