import { Messages } from '@/constants/messages'
import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { RegionCodeEnum } from '@nikrad/database'

const paramsSchema = z.object({
  cuid: z.string().cuid(),
})

const needSchema = z.object({
  title: z.string(),
  categoryId: z.coerce.number(),
  product: z.coerce.number(),
  provinceCode: z.string(),
  city: z.string(),
  priority: z.coerce.number(),
  deliveryDate: z.coerce.date(),
})

const NeedResponseSchema = z.object({
  need: needSchema.extend({
    cuid: z.string().cuid(),
  }),
})

export const putNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:cuid',
    preHandler: [authMiddleware],
    schema: {
      tags: ['needs'],
      summary: 'Update a need by CUID (owner only)',
      params: paramsSchema,
      body: needSchema,
      response: {
        200: NeedResponseSchema,
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { cuid } = request.params
      const data = request.body
      const userId = request.user?.id

      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const existingNeed = await app.prisma.need.findUnique({
        where: { cuid },
        select: { createdById: true },
      })

      if (!existingNeed) {
        return reply.status(404).send({ message: Messages.needs.NOT_FOUND })
      }

      if (existingNeed.createdById !== userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const updatedNeed = await app.prisma.need.update({
        where: { cuid },
        data: {
          ...data,
          provinceCode: data.provinceCode as RegionCodeEnum,
        },
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
      })

      return reply.status(200).send(NeedResponseSchema.parse({ need: updatedNeed }))
    },
  })
}
