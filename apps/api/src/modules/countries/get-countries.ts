import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { faker } from "@faker-js/faker";

export const acceptTermsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["users"],
      description: "Accept the terms of the app.",
      body: z.object({
        terms: z.boolean(),
      }),
      response: {
        200: z.object({
          user: z.object({
            id: z.string(),
            terms: z.boolean(),
          }),
        }),
      },
    },
    handler: async (request, reply) => {
      const { terms } = request.body;

      return reply.status(200).send({
        user: {
          id: faker.string.uuid(),
          terms,
        },
      });
    },
  });
};
