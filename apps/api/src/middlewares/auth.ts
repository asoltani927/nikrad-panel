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
    // Example with Privy (if you have privy property on server):
    // const privyUser = await request.server.privy.getUser({ idToken: token });
    
    // For now, you can validate token and fetch user by email or ID
    // This is a placeholder - implement your actual auth logic here
    
    // Example: Find user by email from decoded token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await request.server.prisma.user.findUnique({
    //   where: { email: decoded.email }
    // });
    
    // Temporary example - replace with your logic
    const user = await request.server.prisma.user.findFirst({
      where: { email: "example@example.com" }
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
