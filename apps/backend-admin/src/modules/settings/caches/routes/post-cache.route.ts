import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CacheService } from '../cache.service'
import { authMiddleware } from '@/middlewares'

const SetCacheTTLBodySchema = z.object({
  ttl: z.number().min(5).max(86400),
})

const SetCacheTTLResponseSchema = z.object({
  ttl: z.number(),
  message: z.string(),
})

export const postCacheTTLRoute = async (app: FastifyInstance) => {
  const service = new CacheService(app.redis)

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['cache'],
      summary: 'Set cache TTL',
      body: SetCacheTTLBodySchema,
      response: {
        200: SetCacheTTLResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const newTTL = await service.setTTL(req.body.ttl)
      return reply.send(
        SetCacheTTLResponseSchema.parse({
          ttl: newTTL,
          message: 'Cache TTL updated successfully',
        }),
      )
    },
  })
}
