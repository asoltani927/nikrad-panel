import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authMiddleware } from '@/middlewares'
import { DeleteShopParamsSchema, DeleteShopResponseSchema } from '../schema/delete-shop.schema'
import { z } from 'zod'
import { Messages } from '@/constants/messages'

export const deleteShopRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:cuid',
    preHandler: [authMiddleware],
    schema: {
      tags: ['shops'],
      summary: 'Soft delete shop (only owner)',
      params: DeleteShopParamsSchema,
      response: {
        200: DeleteShopResponseSchema,
        404: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { cuid } = request.params
      const userId = request.user!.id

      const shop = await app.prisma.shop.findFirst({
        where: {
          cuid,
          deleted: false,
        },
        select: {
          id: true,
          ownerId: true,
        },
      })

      if (!shop) {
        return reply.status(404).send({
          message: Messages.shops.NOT_FOUND,
        })
      }

      if (shop.ownerId !== userId) {
        return reply.status(403).send({
          message: Messages.auth.ACCESS_DENIED,
        })
      }

      await app.prisma.shop.update({
        where: { id: shop.id },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      })

      return reply.send({
        message: Messages.shops.DELETED_SUCCESS,
        cuid,
      })
    },
  })
}
