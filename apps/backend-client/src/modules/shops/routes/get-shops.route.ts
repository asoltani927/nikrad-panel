import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createPaginationMeta } from '@/utils/pagination'
import { ShopsResponseSchema } from '../schema/shops.schema'

const GetShopsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export const getShopsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['shops'],
      summary: 'Get list of shops',
      querystring: GetShopsQuery,
      response: {
        200: ShopsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { page, limit } = request.query
      const skip = (page - 1) * limit

      const total = await app.prisma.shop.count({
        where: { deleted: false },
      })

      const shops = await app.prisma.shop.findMany({
        where: { deleted: false },
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
        ...shop,
        galleryImages: shop.galleryImages.map((g) => g.imageUrl),
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
