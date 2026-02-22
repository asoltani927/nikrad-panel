import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const VerifyOtpBodySchema = z.object({
  phone: z.string().min(8).max(20),
  type: z.enum(['login', 'verify', 'reset']),
  code: z.string().length(6),
})

const VerifyOtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errorCode: z.string(),
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
          errorCode: 'OTP_INVALID',
          message: 'Invalid OTP',
        })
      }

      if (otp.expiresAt < new Date()) {
        return reply.status(200).send({
          success: false,
          errorCode: 'OTP_EXPIRED',
          message: 'کد تایید منقضی شده است',
        })
      }

      // Mark OTP as used
      await app.prisma.otp.update({
        where: { id: otp.id },
        data: { usedAt: new Date() },
      })

      // 1. Find customer or create
      const { edges: customers } = await app.dokamerce.customers.paginated({
        filter: {
          username: {
            equals: phone,
          },
        },
      })

      console.log(customers)
      let customer = null
      if (!customers || customers.length !== 1) {
        const created = await app.dokamerce.customers.create({
          data: {
            fullName: phone,
            active: true,
            username: phone,
            telephoneNumbers: [{ targets: ['OWNER'], value: phone }],
          },
        })
        customer = created
      } else {
        customer = customers[0].node
      }

      if (!customer || !customer.id) {
        return reply.status(200).send({
          success: false,
          errorCode: 'USER_NOT_FOUND',
          message: 'Customer Not Found',
        })
      }

      // Generate JWT token
      const token = app.jwt.sign(
        {
          sub: customer.id,
          ...customer,
        },
        {
          expiresIn: '7d',
        },
      )

      return reply.status(200).send({
        success: true,
        errorCode: 'OTP_VALID',
        message: 'OTP verified successfully',
        token,
      })
    },
  })
}
