import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authMiddleware } from '@/middlewares'
import {
  CreateProductBodySchema,
  CreateProductResponseSchema,
} from '../schema/create-product.schema'
import { ProductStatus, ProductType } from '@dokamerce/web-sdk'

export const postProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Create new product',
      body: CreateProductBodySchema,
      response: {
        201: CreateProductResponseSchema,
        403: CreateProductResponseSchema.pick({ message: true }),
      },
    },

    handler: async (request, reply) => {
      const body = request.body

      // TODO: Remove this when dokamerce is ready
      const createdProduct = await app.dokamerce.products.create({
        data: {
          brandId: body.brandId,
          categoryId: body.categoryId,
          content: body.content,
          name: body.name,
          price: 0,
          condition: body.condition,
          status: ProductStatus.Draft,
          type: ProductType.Physical,
          customerId: request.authenticatedUser.customer!.id,
        },
      })

      return reply.status(201).send(
        CreateProductResponseSchema.parse({
          ...createdProduct,
          message: 'Product created successfully',
        }),
      )
    },
  })
}
