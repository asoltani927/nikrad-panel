import { FastifyInstance } from "fastify";

export const userRoutes = async (app: FastifyInstance) => {
  app.register(createUserRoute);
};
