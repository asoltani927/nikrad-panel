import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'
import { CreateProductBodySchema, ProductResponseSchema } from '../schema/create-product.schema'
import { CREATE_PRODUCT_MUTATION } from '@/graphql/mutations/create-product.gql'

export const postProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/products',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Create new product',
      body: CreateProductBodySchema,
      response: {
        201: ProductResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const userId = request.user?.id
      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const body = request.body as z.infer<typeof CreateProductBodySchema>

      const { createProduct } = await app.dokamerce.client.request(
        CREATE_PRODUCT_MUTATION,
        {
          data: {
            name: body.name,
            slug: body.slug,
            price: body.price,
            stock: body.stock,
            type: body.type,

            active: body.active,
            featured: body.featured,
            todayDeal: body.todayDeal,

            category: body.categoryId,
            brand: body.brandId,
            seller: body.sellerId,

            sku: body.sku,
            barcode: body.barcode,
            shortDescription: body.shortDescription,
            description: body.description,
          },
        },
      )

      return reply.status(201).send(
        ProductResponseSchema.parse({
          ...createProduct,
          message: 'Create Success',
        }),
      )
    },
  })
}
