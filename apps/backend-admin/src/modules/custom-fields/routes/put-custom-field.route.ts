import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CustomFieldTarget, CustomFieldType } from '@nikrad/database'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

const UpdateCustomFieldParamsSchema = z.object({
  id: z.coerce.number().min(1),
})

const UpdateCustomFieldBodySchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  type: z.enum(Object.values(CustomFieldType) as [string, ...string[]]),
  required: z.boolean().optional(),
  order: z.number().nullable().optional(),
  step: z.number().nullable().optional(),
  categoryId: z.number().nullable().optional(),
  target: z.nativeEnum(CustomFieldTarget).optional(),
})

const CustomFieldResponseSchema = z.object({
  customField: z.object({
    id: z.number(),
    cuid: z.string(),
    name: z.string(),
    title: z.string(),
    type: z.string(),
    required: z.boolean(),
    order: z.number().nullable(),
    step: z.number().nullable(),
    categoryId: z.number().nullable(),
    target: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
})

export const putCustomFieldRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:id',
    preHandler: authMiddleware, // ensures request.user is set
    schema: {
      tags: ['customFields'],
      summary: 'Update an existing custom field',
      params: UpdateCustomFieldParamsSchema,
      body: UpdateCustomFieldBodySchema,
      response: {
        200: CustomFieldResponseSchema,
        401: UnauthorizedResponseSchema,
        404: z.object({ error: z.literal('CustomField not found') }),
      },
    },
    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id } = request.params
      const body = request.body
      const { id: userId } = request.user

      // Check if the custom field exists
      const existing = await app.prisma.customField.findUnique({
        where: { id, deleted: false },
      })
      if (!existing) {
        return reply.status(404).send({ error: 'CustomField not found' })
      }

      // Update the record
      const updated = await app.prisma.customField.update({
        where: { id },
        data: {
          ...body,
          updatedById: userId,
        },
        select: {
          id: true,
          cuid: true,
          name: true,
          title: true,
          type: true,
          required: true,
          order: true,
          step: true,
          categoryId: true,
          target: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return reply.status(200).send({ customField: updated })
    },
  })
}
