import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createPaginationMeta } from '@/utils/pagination'
import { ShopsResponseSchema } from '../schema/shops.schema'
import { authMiddleware } from '@/middlewares'

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
      },
    },
    handler: async (request, reply) => {
      const userId = request.user.id === 'cml95anwd0004qo017o15jgko' ? 4 : request.user.id
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
          shopReviews: {
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
              name: null,
              fullName: `${shop.owner.firstName} ${shop.owner.lastName}`,
            }
          : null,

        category: shop.category,
        galleryImages: shop.galleryImages.map((g) => g.imageUrl),

        shopReviews: shop.shopReviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          user: {
            fullName: `${review.user.firstName} ${review.user.lastName}`,
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
