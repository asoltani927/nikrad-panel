// src/plugins/prisma.ts
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export async function setup(app: FastifyInstance) {
  const prismaPlugin = fp(async (app: FastifyInstance) => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    app.decorate("prisma", prisma);

    app.addHook("onClose", async (app) => {
      await app.prisma.$disconnect();
    });
  });

  await app.register(prismaPlugin);
}
