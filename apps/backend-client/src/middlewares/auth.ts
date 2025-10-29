import { FastifyRequest, FastifyReply } from "fastify";
import { UnauthorizedError } from "../_errors/unauthorized";

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
  const token = request.headers.authorization?.replace("Bearer ", "");
  
  if (!token) {
    throw new UnauthorizedError("Authorization header is required.");
  }

  try {
    // TODO: Replace this with your actual authentication logic
    // Example with JWT:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    // const user = await request.server.prisma.user.findUnique({
    //   where: { id: decoded.userId }
    // });
    
    // Example with Privy:
    // const privyUser = await request.server.privy.getUser({ idToken: token });
    // const user = await request.server.prisma.user.findUnique({
    //   where: { phone: privyUser.phone }
    // });
    
    // TEMPORARY: For development, find admin user by phone
    const user = await request.server.prisma.user.findUnique({
      where: { phone: "+989123456789" } // Admin phone from seeds
    });
    
    if (!user) {
      throw new UnauthorizedError("User not found.");
    }
    
    request.user = user;
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError("Invalid token.");
  }
}
