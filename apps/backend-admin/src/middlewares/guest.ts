import { FastifyRequest, FastifyReply } from "fastify";
import { UnauthorizedError } from "../_errors/unauthorized";

/**
 * Guest Middleware
 * Ensures user is NOT authenticated
 * Use for routes like login/register that should only be accessible to guests
 * 
 * Usage in routes:
 * app.post('/login', { preHandler: guestMiddleware }, async (request, reply) => {
 *   // Only accessible if user is not authenticated
 *   return { message: 'Login endpoint' };
 * });
 */
export async function guestMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  
  if (token) {
    try {
      // TODO: Replace with your actual token validation logic
      // Example with JWT:
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if (decoded) {
      //   throw new UnauthorizedError("Already authenticated. This route is for guests only.");
      // }
      
      // Example with Privy:
      // const privyUser = await request.server.privy.getUser({ idToken: token });
      // if (privyUser) {
      //   throw new UnauthorizedError("Already authenticated. This route is for guests only.");
      // }
      
      // For now, if there's a token, consider user authenticated
      // Replace with proper validation
      throw new UnauthorizedError("Already authenticated. This route is for guests only.");
    } catch (error) {
      // If token is invalid, allow access (user is effectively a guest)
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      // Invalid token = guest access granted
      return;
    }
  }
  
  // No token = guest access granted
}

