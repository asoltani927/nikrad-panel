import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetProductsResponseSchema } from '../schema/get-products.schema'

export const getProductsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['products'],
      summary: 'Get all Products',
      response: {
        200: GetProductsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const products = await app.dokamerce.products.paginated()
      return reply
        .status(200)
        .send(GetProductsResponseSchema.parse({ products: products.paginatedProducts.edges }))
    },
  })
}
