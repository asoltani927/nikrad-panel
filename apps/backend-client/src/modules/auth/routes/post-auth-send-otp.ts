import { normalizeMobile } from '@/utils/phone'
import { TelephoneNumberTarget } from '@dokamerce/web-sdk'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const CreateOtpBodySchema = z.object({
  phone: z.string().min(10).max(15),
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
      const rawPhone = request.body.phone
      const phone = normalizeMobile(rawPhone) // TODO: all phones should map to 989134241882 @reza (Done)
      // 1. Find customer or create
      const customers = await app.dokamerce.customers.paginated({
        filter: {
          username: {
            equals: phone,
          },
        },
      })

      let customer = null
      if (!customers || !customers.edges || customers.edges.length <= 0) {
        const created = await app.dokamerce.customers.create({
          data: {
            fullName: phone,
            username: phone,
            active: true,
            telephoneNumbers: [{ targets: [TelephoneNumberTarget.Owner], value: phone }],
          },
        })
        customer = created
      } else {
        customer = customers.edges[0]
      }

      console.log(customer)

      // 2. Check if an active OTP already exists
      const existingOtp = await app.prisma.otp.findFirst({
        where: {
          phone,
          type: 'login',
          expiresAt: { gt: new Date() }, // not expired
          usedAt: null,
        },
        orderBy: { createdAt: 'desc' },
      })

      if (existingOtp) {
        // Already has a valid OTP → don't resend SMS
        return reply.status(200).send({
          success: true,
          message: 'OTP generated and sent',
        })
      }

      // 3. Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      // 4. Store OTP in DB
      await app.prisma.otp.create({
        data: {
          phone,
          type: 'login',
          code: otp,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes
        },
      })

      // 5. Send SMS
      await app.texting.sendOtp(phone, otp)

      return reply.status(200).send({
        success: true,
        message: 'OTP generated and sent',
      })
    },
  })
}
