import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { Messages } from '@/constants/messages'
import { GetShopParams, ShopDetailSchema } from '../schema/shop.schema'

export const getShopByCuidRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/shops/:cuid',
    schema: {
      tags: ['shops'],
      summary: 'Get shop details by cuid',
      params: GetShopParams,
      response: {
        200: ShopDetailSchema,
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { cuid } = request.params as z.infer<typeof GetShopParams>

      const shop = await app.prisma.shop.findFirst({
        where: {
          cuid,
          deleted: false,
        },
        select: {
          cuid: true,
          name: true,
          aboutShop: true,
          aboutSeller: true,
          successDeals: true,
          failedDeals: true,
          thumbnailImage: true,

          owner: {
            select: {
              id: true,
              name: true,
              firstName: true,
              lastName: true,
            },
          },

          category: {
            select: {
              id: true,
              name: true,
            },
          },

          galleryImages: {
            select: {
              imageUrl: true,
            },
          },

          reviews: {
            orderBy: { createdAt: 'desc' },
            select: {
              rating: true,
              comment: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      })

      if (!shop) {
        return reply.status(404).send({
          message: Messages.shops.NOT_FOUND,
        })
      }

      const response = {
        ...shop,
        owner: {
          id: shop.owner.id,
          name: shop.owner.name,
          fullName: `${shop.owner.firstName} ${shop.owner.lastName}`,
        },
        reviews: shop.reviews.map((review) => ({
          ...review,
          user: {
            fullName: `${review.user.firstName} ${review.user.lastName}`,
          },
        })),
      }

      return reply.status(200).send(ShopDetailSchema.parse(response))
    },
  })
}
