import "fastify";
import { PrismaClient, User } from "@prisma/client";

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
