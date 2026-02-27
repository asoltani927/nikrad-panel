import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'
import {
  UpdateProductBodySchema,
  UpdateProductResponseSchema,
} from '../schema/update-product.schema'

export const putProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Update an existing product',
      params: z.object({ id: z.string() }),
      body: UpdateProductBodySchema,
      response: {
        200: UpdateProductResponseSchema,
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const userId = request.authenticatedUser!.user!.id

      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const { id } = request.params as { id: string }
      const body = request.body as z.infer<typeof UpdateProductBodySchema>

      const existingProduct = await app.dokamerce.products.find({ id })
      if (!existingProduct) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      const updatedProduct = await app.dokamerce.products.update({
        data: {
          ...body,
          businessRules: body.businessRules ? JSON.stringify(body.businessRules) : undefined,

        },
        id,
      })

      return reply.status(200).send(
        UpdateProductResponseSchema.parse({
          ...updatedProduct,
          message: 'Product updated successfully',
        }),
      )
    },
  })
}
