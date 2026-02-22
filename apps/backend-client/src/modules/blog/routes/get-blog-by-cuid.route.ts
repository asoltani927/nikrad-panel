import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { GetBlogParams, BlogDetailSchema } from '../schema/blog-detail.schema'

export const getBlogByCuidRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:cuid',

    schema: {
      tags: ['blogs'],
      summary: 'Get blog details by cuid',
      params: GetBlogParams,
      response: {
        200: BlogDetailSchema,
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { cuid } = request.params as z.infer<typeof GetBlogParams>

      const blog = await app.prisma.blog.findFirst({
        where: {
          cuid,
          deleted: false,
          status: 'PUBLISHED',
        },

        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },

          categories: {
            select: {
              id: true,
              name: true,
            },
          },

          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          comments: {
            where: {
              approved: true,
              parentId: null,
            },
            orderBy: { createdAt: 'desc' },
            select: {
              content: true,
              createdAt: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      })

      if (!blog) {
        return reply.status(404).send({
          message: 'Blog not found',
        })
      }

      await app.prisma.blog.update({
        where: { id: blog.id },
        data: {
          views: { increment: 1 },
        },
      })

      const response = {
        cuid: blog.cuid,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image,
        views: blog.views + 1,
        readingTime: blog.readingTime,
        publishedAt: blog.publishedAt,

        author: blog.user
          ? {
              id: blog.user.id,
              fullName: `${blog.user.firstName} ${blog.user.lastName}`,
            }
          : null,

        categories: blog.categories,
        tags: blog.tags,

        comments: blog.comments.map((c) => ({
          comment: c.content,
          createdAt: c.createdAt,
          user: c.user
            ? {
                fullName: `${c.user.firstName} ${c.user.lastName}`,
              }
            : null,
        })),
      }

      return reply.status(200).send(BlogDetailSchema.parse(response))
    },
  })
}
