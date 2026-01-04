import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const CreateOtpBodySchema = z.object({
  phone: z.string().min(8).max(20),
  type: z.enum(['login', 'verify', 'reset']),
})

const OtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

export const postAuthSendOtpRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/otp',
    schema: {
      tags: ['auth'],
      summary: 'Generate OTP and send to user',
      body: CreateOtpBodySchema,
      response: {
        200: OtpResponseSchema,
      },
    },

    handler: async (request, reply) => {
      const { phone, type } = request.body

      const customer = await app.dokamerce.customers.find({
        username: phone,
      })

      if (!customer) {
        const customer = await app.dokamerce.customers.create({
          data: { fullName: phone, username: phone },
        })
      }

      // Generate OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      // Store OTP in DB
      await app.prisma.otp.create({
        data: {
          phone,
          type,
          code: otp,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes
        },
      })

      // TODO: integrate SMS provider
      // await app.sms.send(phone, `Your OTP is ${otp}`)

      return reply.status(200).send({
        success: true,
        message: 'OTP generated and sent',
      })
    },
  })
}
