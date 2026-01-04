import { FastifyRequest, FastifyReply } from 'fastify'
import { UnauthorizedError } from '../_errors/unauthorized'

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
    // 1. Verify JWT c
    const decoded = (await request.server.jwt.verify(token)) as { sub: string }
    if (!decoded?.sub) {
      throw new UnauthorizedError('Invalid token payload.')
    }

    const customer = request.server.dokamerce.customers.find({
      id: decoded.sub,
    })

    if (!customer) {
      throw new UnauthorizedError('User not found.')
    }

    const seller = request.server.dokamerce.sellers.find({
      user: {
        username: customer.username,
      },
    })

    request.user = {
      customer: customer,
      seller: seller ?? null,
    }
  } catch (error) {
    console.error(error)
    throw new UnauthorizedError('Invalid token.')
  }
}
