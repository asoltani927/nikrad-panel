import 'fastify'
import { PrismaClient, User, Shop } from '@nikrad/database'
import { DokamerceSDK } from '@dokamerce/web-sdk'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    logger: Logger
    dokamerce: DokamerceSDK
  }

  interface FastifyRequest {
    id?: string
    authenticatedUser: {
      id: string // it is customer id that comes from dokamerce sdk
      user?: User
      customer?: { id?: string }
      sellers?: Shop[]
      identified: boolean,
      identifiedAt: Date | null,
    }
  }
}
