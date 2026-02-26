import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createPaginationMeta } from '@/utils/pagination'
import { ShopsResponseSchema } from '../schema/shops.schema'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

const GetShopsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export const getShopsByOwnerRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/owner',
    preHandler: [authMiddleware],
    schema: {
      tags: ['shops'],
      summary: 'Get list of shops (only owner)',
      querystring: GetShopsQuery,
      response: {
        200: ShopsResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const userId = request.authenticatedUser.user?.id
      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      // const userId = request.user.id
      const { page, limit } = request.query
      const skip = (page - 1) * limit

      const total = await app.prisma.shop.count({
        where: { ownerId: userId, deleted: false },
      })

      const shops = await app.prisma.shop.findMany({
        where: { ownerId: userId, deleted: false },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          cuid: true,
          name: true,
          about: true,
          aboutSeller: true,
          successDeals: true,
          failedDeals: true,
          thumbnailImage: true,

          daysOfActivity: true,
          workingHours: true,
          responseHours: true,
          socialMedia: true,

          owner: {
            select: {
              id: true,
              name: true,
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
          shopReviews: {
            select: {
              rating: true,
              comment: true,
              user: {
                select: {
                  name: true
                },
              },
            },
          },
        },
      })

      const normalized = shops.map((shop) => ({
        cuid: shop.cuid,
        name: shop.name,
        about: shop.about,
        aboutSeller: shop.aboutSeller,
        successDeals: shop.successDeals,
        failedDeals: shop.failedDeals,
        thumbnailImage: shop.thumbnailImage,

        daysOfActivity: shop.daysOfActivity,
        workingHours: shop.workingHours,
        responseHours: shop.responseHours,
        socialMedia: shop.socialMedia,

        owner: shop.owner
          ? {
            id: shop.owner.id,
            name: shop.owner.name,
            fullName: shop.owner.name,
          }
          : null,

        category: shop.category,
        galleryImages: shop.galleryImages.map((g) => g.imageUrl),

        shopReviews: shop.shopReviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          user: {
            fullName: review.user.name,
          },
        })),
      }))

      const pagination = createPaginationMeta(total, page, limit, request)

      return reply.status(200).send(
        ShopsResponseSchema.parse({
          shops: normalized,
          pagination,
        }),
      )
    },
  })
}
