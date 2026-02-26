import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'
import { createPaginationMeta } from '@/utils/pagination'

const needSchema = z.object({
  cuid: z.string().cuid(),
  title: z.string(),
  categoryId: z.number(),
  product: z.number(),
  provinceCode: z.string(),
  city: z.string(),
  priority: z.number(),
  deliveryDate: z.date(),
})

const NeedsResponseSchema = z.object({
  needs: z.array(needSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    links: z.record(z.string(), z.string().nullable()).optional(),
  }),
})

const GetUserNeedsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export const getUserNeedsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/user-needs',
    preHandler: [authMiddleware],
    schema: {
      tags: ['needs'],
      summary: 'Get paginated needs created by the logged-in user',
      querystring: GetUserNeedsQuery,
      response: {
        200: NeedsResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const userId = request.authenticatedUser.user?.id
      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const { page, limit } = request.query as z.infer<typeof GetUserNeedsQuery>
      const skip = (page - 1) * limit

      const total = await app.prisma.need.count({
        where: { createdById: userId, deleted: false },
      })

      const needs = await app.prisma.need.findMany({
        where: { createdById: userId, deleted: false },
        select: {
          cuid: true,
          title: true,
          categoryId: true,
          product: true,
          provinceCode: true,
          city: true,
          priority: true,
          deliveryDate: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      })

      const pagination = createPaginationMeta(total, page, limit, request)

      return reply.status(200).send(NeedsResponseSchema.parse({ needs, pagination }))
    },
  })
}
