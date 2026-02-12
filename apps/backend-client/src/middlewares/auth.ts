import { FastifyRequest, FastifyReply } from 'fastify'
import { UnauthorizedError } from '../_errors/unauthorized'
import { AuthenticatedPayload } from '@/types/auth'

/**
 * Auth Middleware
 * Protects routes by requiring authentication
 *
 * Usage in routes:
 * app.get('/protected', { preHandler: authMiddleware }, async (request, reply) => {
 *   // request.user will be available here
 *   return { user: request.user };
 * });
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    throw new UnauthorizedError('Authorization header is required.')
  }

  try {
    // 1. Verify JWT
    const decoded = (await request.server.jwt.verify(token)) as { sub: string }
    if (!decoded?.sub) {
      throw new UnauthorizedError('Invalid token payload.')
    }

    const customer = await request.server.dokamerce.customers.find({
      id: decoded.sub,
      withTelephoneNumbers: true,
      withImage: true,
      withAddresses: true,
    })
    if (!customer) {
      throw new UnauthorizedError('User not found.')
    }
    // if (!customer.active) {
    //   throw new UnauthorizedError('Your account has been deactived.')
    // }

    const sellers = request.server.dokamerce.sellers.all({
      user: {
        username: customer.username,
      },
    })

    // TODO: make a global interface named AuthenitactedPayload @reza (Done)
    request.user = {
      id: customer.id,
      customer: customer,
      sellers: sellers ?? [],
    } as AuthenticatedPayload
  } catch (error) {
    console.error(error)
    throw new UnauthorizedError('Invalid token.')
  }
}