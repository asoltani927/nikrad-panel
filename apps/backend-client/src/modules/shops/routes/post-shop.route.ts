import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'
import { CreateShopBodySchema, CreateShopResponseSchema } from '../schema/create-shop.schema'

export const postShopRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['shops'],
      summary: 'Create a new shop (only owner)',
      body: CreateShopBodySchema,
      response: {
        201: CreateShopResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const userId = request.user.id === 'cml95anwd0004qo017o15jgko' ? 4 : request.user.id
      // const userId = request.user.id
      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const body = request.body as z.infer<typeof CreateShopBodySchema>

      const shop = await app.prisma.shop.create({
        data: {
          name: body.name,
          about: body.about,
          aboutSeller: body.aboutSeller,

          daysOfActivity: body.daysOfActivity,
          workingHours: body.workingHours,
          responseHours: body.responseHours,
          socialMedia: body.socialMedia,

          thumbnailImage: body.thumbnailImage,
          ownerId: userId,

          galleryImages: body.galleryImages
            ? {
                createMany: {
                  data: body.galleryImages,
                },
              }
            : undefined,
        },
        select: {
          cuid: true,
          name: true,
        },
      })

      return reply.status(201).send(
        CreateShopResponseSchema.parse({
          cuid: shop.cuid,
          name: shop.name,
          message: Messages.shops.CREATED_SUCCESSFULLY,
        }),
      )
    },
  })
}
