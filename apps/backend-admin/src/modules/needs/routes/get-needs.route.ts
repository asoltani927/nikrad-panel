import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const NeedResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  product: z.number(),
  region: z.object({
    code: z.string(),
    name: z.string().optional(),
  }),
  city: z.string(),
  priority: z.number(),
  createdBy: z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string().nullable(),
  }),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deliveryDate: z.date(),
  deleted: z.boolean(),
})

const NeedsResponseSchema = z.object({
  needs: z.array(NeedResponseSchema),
})

export const getNeedsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['needs'],
      summary: 'Get all needs with basic user info',
      response: {
        200: NeedsResponseSchema,
      },
    },

    handler: async (_req, reply) => {
      try {
        const needs = await app.prisma.need.findMany({
          where: { deleted: false },
          select: {
            id: true,
            title: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            product: true,
            city: true,
            priority: true,
            deliveryDate: true,
            createdBy: {
              select: {
                id: true,
                name: true,
                phone: true,
              },
            },
            region: {
              select: {
                code: true,
                name: true,
              },
            },
            status: true,
            createdAt: true,
            updatedAt: true,
            deleted: true,
          },
        })

        return reply.status(200).send({ needs: needs.map(n => {
          return {
            ...n,
            region: {
              code: n.region.code.toString(),
              name: n.region.name?.toString()
            }
          }
        }) })
      } catch (error) {
        app.log.error(error)
      }
    },
  })
}
