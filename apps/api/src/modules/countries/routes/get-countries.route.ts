import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const CountrySchema = z.object({
  code: z.string(),
  name: z.string(),
});

const CountriesResponseSchema = z.object({
  countries: z.array(CountrySchema),
});

export const getCountriesRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["countries"],
      summary: "Get all countries",
      response: {
        200: CountriesResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const countries = await app.prisma.country.findMany({
        select: { code: true, name: true },
      });

      return reply.status(200).send(
        CountriesResponseSchema.parse({ countries }) // ✅ ensures validation
      );
    },
  });
};
