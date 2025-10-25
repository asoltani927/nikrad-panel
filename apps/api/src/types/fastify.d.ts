import "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
  
  interface FastifyInstance {
    logger: Logger;
  }

  interface FastifyRequest {
    id?: string;
  }
}
