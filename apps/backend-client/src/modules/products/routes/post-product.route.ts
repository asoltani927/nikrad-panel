import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateProductBodySchema, CreateProductResponseSchema } from '../schema/create-product.schema'

export const createProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['products'],
      summary: 'Create new product',
      body: CreateProductBodySchema,
      response: {
        201: CreateProductResponseSchema,
      },
    },

    handler: async (req, reply) => {
      const data = req.body

      const product = await app.dokamerce.products.create({
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        barcode: data.barcode,
        price: data.price,
        stock: data.stock,
        status: data.status,
        type: data.type,
        shortDescription: data.shortDescription,
        description: data.description,
        categoryId: data.categoryId,
        brandId: data.brandId,
      })

      return reply.status(201).send(
        CreateProductResponseSchema.parse({ product })
      )
    },
  })
}
