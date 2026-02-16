import 'fastify'
import { PrismaClient, User } from '@nikrad/database'
import { DokamerceSDK } from '@dokamerce/web-sdk'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    logger: Logger
    dokamerce: DokamerceSDK
  }

  interface FastifyRequest {
    id?: string
    user?: {
      id: string
      customer: { id?: string }
      sellers?: { id?: string }[]
    }
  }
}
