import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const DeleteCategorySchema  = z.object({
  id: z.coerce.number(),
})

export const deleteCategoryRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['categories'],
      summary: 'Delete a category by ID',
      params: DeleteCategorySchema,
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params

      const isExisted = await app.prisma.category.findUnique({ where: { id } })
      if (!isExisted) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      await app.prisma.need.delete({ where: { id } })

      return reply.status(200).send({ message: 'Need deleted successfully' })
    },
  })
}
