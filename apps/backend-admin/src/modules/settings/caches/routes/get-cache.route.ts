import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CacheService } from '../cache.service'
import { authMiddleware } from '@/middlewares'

const CacheTTLResponseSchema = z.object({
  ttl: z.number(),
})

export const getCacheTTLRoute = async (app: FastifyInstance) => {
  const service = new CacheService(app.redis)

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    // preHandler: [authMiddleware],
    schema: {
      tags: ['cache'],
      summary: 'Get cache TTL',
      response: {
        200: CacheTTLResponseSchema,
      },
    },
    handler: async (_, reply) => {
      const ttl = await service.getTTL()
      return reply.send(CacheTTLResponseSchema.parse({ ttl }))
    },
  })
}
