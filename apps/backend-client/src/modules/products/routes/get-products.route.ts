import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const ProductSchema = z.object({
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
})

const ProductResponseSchema = z.object({
  Products: z.array(ProductSchema),
})

export const getProductsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['products'],
      summary: 'Get all Products',
      response: {
        200: ProductResponseSchema,
      },
    },
    handler: async (request, reply) => {
    //   const Products = await app.prisma.region.findMany({
    //     select: { code: true, name: true, countryCode: true },
    //   })

    const products = await app.dokamerce.products.paginated()
    console.log(products);
    

      return reply.status(200).send(
        ProductResponseSchema.parse({ products }), 
      )
    },
  })
}
