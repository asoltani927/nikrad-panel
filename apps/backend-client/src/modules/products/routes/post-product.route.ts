import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authMiddleware } from '@/middlewares'
import {
  CreateProductBodySchema,
  CreateProductResponseSchema,
} from '../schema/create-product.schema'
import { Messages } from '@/constants/messages'

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
      if (!request.user?.id) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const body = request.body

      const { createProduct } = await app.dokamerce.products.create({
        data: {
          ...body,
        },
      })

      return reply.status(201).send(
        CreateProductResponseSchema.parse({
          ...createProduct,
          message: 'Product created successfully',
        }),
      )
    },
  })
}
