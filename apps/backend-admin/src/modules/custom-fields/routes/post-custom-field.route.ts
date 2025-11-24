import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CustomFieldTarget, CustomFieldType } from '@nikrad/database'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

const CreateCustomFieldSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(Object.values(CustomFieldType) as [string, ...string[]]),
  required: z.boolean().default(false),
  order: z.number().nullable().optional(),
  step: z.number().nullable().optional(),
  categoryId: z.number().nullable().optional(),
  target: z.nativeEnum(CustomFieldTarget), // ✅ enforce valid target
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

export const postCustomFieldRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: authMiddleware, // ✅ ensures request.user is set
    schema: {
      tags: ['customFields'],
      summary: 'Create a new custom field',
      body: CreateCustomFieldSchema,
      response: {
        201: CustomFieldResponseSchema,
        401: UnauthorizedResponseSchema, // ✅ proper schema for unauthorized
      },
    },
    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id: userId } = request.user
      const body = request.body

      const customField = await app.prisma.customField.create({
        data: {
          name: body.name,
          title: body.title,
          type: body.type,
          required: body.required,
          order: body.order ?? null,
          step: body.step ?? null,
          categoryId: body.categoryId ?? null,
          target: body.target,
          createdById: userId,
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

      return reply.status(201).send({
        customField,
      })
    },
  })
}
