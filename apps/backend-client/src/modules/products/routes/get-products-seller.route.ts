import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { ProductSchema } from '../schema/get-products.schema'
import { authMiddleware } from '@/middlewares'

export const GetProductParamsSchema = z.object({
  id: z.string(),
})

export const GetProductResponseSchema = z.object({
  product: z.array(ProductSchema),
})

export const getProductsBySellerIdRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/seller/:id',
    schema: {
      tags: ['products'],
      preHandler: [authMiddleware],
      summary: 'Get product by seller id',
      params: GetProductParamsSchema,
      response: {
        200: GetProductResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { id } = request.params as { id: string }

      // TODO: Remove this when dokamerce is ready
      const product = await app.dokamerce.products.paginated({ filter: {
        // seller: {
        //   in: [ id ]
        // }
      } })

      if (!product) {
        return reply.status(404).send({
          message: 'Product not found',
        })
      }

      return reply
        .status(200)
        .send(GetProductResponseSchema.parse({ product: product.edges }))
    },
  })
}
