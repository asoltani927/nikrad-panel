import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { ProductSchema } from '../schema/get-products.schema'

export const GetProductParamsSchema = z.object({
  id: z.string(),
})

export const GetProductResponseSchema = z.object({
  product: ProductSchema,
})

export const getProductByIdRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['products'],
      summary: 'Get product by id',
      params: GetProductParamsSchema,
      response: {
        200: GetProductResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { id } = request.params as { id: string }
      const product = await app.dokamerce.products.find({id: id})
      if (!product) {
        return reply.status(404).send({
          message: 'Product not found',
        })
      }

      return reply.status(200).send(GetProductResponseSchema.parse({ product }))
    },
  })
}
