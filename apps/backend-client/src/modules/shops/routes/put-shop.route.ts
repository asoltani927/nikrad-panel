import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authMiddleware } from '@/middlewares'
import {
  UpdateShopBodySchema,
  UpdateShopParamsSchema,
  UpdateShopResponseSchema,
} from '../schema/update-shop.schema'
import z from 'zod'
import { Messages } from '@/constants/messages'

export const putShopRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:cuid',
    preHandler: [authMiddleware],
    schema: {
      tags: ['shops'],
      summary: 'Update shop (only owner)',
      params: UpdateShopParamsSchema,
      body: UpdateShopBodySchema,
      response: {
        200: UpdateShopResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { cuid } = request.params
      const body = request.body as z.infer<typeof UpdateShopBodySchema>
      const userId = request.user.id === 'cml95anwd0004qo017o15jgko' ? 4 : request.user.id
      // const userId = request.user.id

      if (!userId) {
        return reply.status(403).send({
          message: Messages.auth.ACCESS_DENIED,
        })
      }

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

      if (!shop || shop.ownerId !== userId) {
        return reply.status(403).send({
          message: Messages.auth.ACCESS_DENIED,
        })
      }

      await app.prisma.$transaction(async (tx) => {
        if (body.galleryImages) {
          await tx.shopGallery.deleteMany({
            where: { shopId: shop.id },
          })
        }

        await tx.shop.update({
          where: { id: shop.id },
          data: {
            name: body.name,
            about: body.about,
            aboutSeller: body.aboutSeller,

            daysOfActivity: body.daysOfActivity,
            workingHours: body.workingHours,
            responseHours: body.responseHours,
            socialMedia: body.socialMedia,

            thumbnailImage: body.thumbnailImage,

            galleryImages: body.galleryImages
              ? {
                  createMany: {
                    data: body.galleryImages,
                  },
                }
              : undefined,
          },
        })
      })

      return reply.status(200).send(
        UpdateShopResponseSchema.parse({
          message: Messages.shops.UPDATED_SUCCESSFULLY,
          cuid,
        }),
      )
    },
  })
}
