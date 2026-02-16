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
        // 500: GetProductsResponseSchema.pick({ message: true }),
      },
    },
    handler: async (_request, reply) => {
      let products
      try {
        products = await app.dokamerce.products.paginated({
          filter: {},
          // limit?: ,
          // page?: ;
          // sort?: ;
          withCategory: true,
          withBrand: true,
          withVariant: true,
          withThumbnail: true,
          withFiles: true,
          withSellers: true,
        })
      } catch (error) {
        console.error('Error fetching products:', error)
        // return reply.status(500).send({ message: 'Internal Server Error' })
      }
      return reply.status(200).send(
        GetProductsResponseSchema.parse({
          products: products?.edges.map((edge: any) => edge.node),
        }),
      )
    },
  })
}
