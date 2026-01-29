import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createPaginationMeta } from '@/utils/pagination'
import { ShopsResponseSchema } from '../schema/shops.schema'

// query schema
const GetShopsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  ownerId: z.coerce.number().optional(),
})

export const getShopsByOwnerRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['shops'],
      summary: 'Get list of shops, optionally filtered by ownerId',
      querystring: GetShopsQuery,
      response: {
        200: ShopsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { page, limit, ownerId } = request.query
      const skip = (page - 1) * limit

      // filter dynamic
      const where: any = { deleted: false }
      if (ownerId) where.ownerId = ownerId

      // total count
      const total = await app.prisma.shop.count({ where })

      // fetch shops
      const shops = await app.prisma.shop.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
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
            select: { imageUrl: true },
          },
          shopReviews: {
            orderBy: { createdAt: 'desc' },
            select: {
              rating: true,
              comment: true,
              user: {
                select: { firstName: true, lastName: true },
              },
            },
          },
        },
      })

      // normalize data like before
      const normalized = shops.map((shop) => ({
        ...shop,
        galleryImages: shop.galleryImages.map((g) => g.imageUrl),
        shopReviews: shop.shopReviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          user: {
            fullName: `${review.user.firstName} ${review.user.lastName}`,
          },
        })),
        owner: shop.owner
          ? {
              id: shop.owner.id,
              name: null,
              fullName: `${shop.owner.firstName} ${shop.owner.lastName}`,
            }
          : null,
      }))

      const pagination = createPaginationMeta(total, page, limit, request)

      return reply.send(
        ShopsResponseSchema.parse({
          shops: normalized,
          pagination,
        }),
      )
    },
  })
}
