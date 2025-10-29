import "fastify";
import { PrismaClient, User } from "@nikrad/database";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
  
  interface FastifyInstance {
    logger: Logger;
  }

  interface FastifyRequest {
    id?: string;
    user?: User;
  }
}
