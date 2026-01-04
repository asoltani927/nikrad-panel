import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const VerifyOtpBodySchema = z.object({
  phone: z.string().min(8).max(20),
  type: z.enum(['login', 'verify', 'reset']),
  code: z.string().length(6),
})

const VerifyOtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
})

export const postAuthVerifyOtpRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/otp/verify',
    schema: {
      tags: ['auth'],
      summary: 'Verify OTP code',
      body: VerifyOtpBodySchema,
      response: {
        200: VerifyOtpResponseSchema,
      },
    },

    handler: async (request, reply) => {
      const { phone, type, code } = request.body

      const otp = await app.prisma.otp.findFirst({
        where: {
          phone,
          type,
          code,
          usedAt: null,
        },
      })

      if (!otp) {
        return reply.status(200).send({
          success: false,
          message: 'Invalid OTP',
        })
      }

      if (otp.expiresAt < new Date()) {
        return reply.status(200).send({
          success: false,
          message: 'OTP expired',
        })
      }

      // Mark OTP as used
      await app.prisma.otp.update({
        where: { id: otp.id },
        data: { usedAt: new Date() },
      })

      // find customer by username (phone)
      let customer = await app.dokamerce.customers.find({
        username: otp.phone,
      })

      // If customer does not exist, create one
      if (!customer) {
        customer = await app.dokamerce.customers.create({
          username: otp.phone,
          phone: otp.phone,
        })
      }

      // Generate JWT token
      const token = app.jwt.sign(
        {
          sub: customer.id,
          phone: customer.phone,
        },
        {
          expiresIn: '7d',
        },
      )

      return reply.status(200).send({
        success: true,
        message: 'OTP verified successfully',
        token,
      })
    },
  })
}
