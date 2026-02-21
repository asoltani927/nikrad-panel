import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createPaginationMeta } from '@/utils/pagination'
import { BlogsResponseSchema, GetBlogsQuerySchema } from '../schema/blogs.schema'

export const getBlogsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',

    schema: {
      tags: ['blogs'],
      summary: 'Get list of blogs',
      querystring: GetBlogsQuerySchema,
      response: {
        200: BlogsResponseSchema,
      },
    },

    handler: async (request, reply) => {
      const { page, limit, authorId, sort } = request.query
      const skip = (page - 1) * limit

      const where: any = {
        deleted: false,
        status: 'PUBLISHED',
        ...(authorId !== undefined && { userId: authorId }),
      }

      let orderBy: any = { createdAt: 'desc' }
      if (sort === 'mostViewed') orderBy = { views: 'desc' }
      if (sort === 'published') orderBy = { publishedAt: 'desc' }

      const total = await app.prisma.blog.count({ where })

      const blogs = await app.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: { select: { id: true, firstName: true, lastName: true } },
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
          tags: { select: { id: true, name: true, slug: true } },
        },
      })

      const normalized = blogs.map((blog) => ({
        id: blog.id,
        cuid: blog.cuid,
        title: blog.title,
        slug: blog.slug,
        status: blog.status,
        excerpt: blog.excerpt,
        image: blog.image,
        views: blog.views,
        readingTime: blog.readingTime,
        publishedAt: blog.publishedAt,

        author: blog.user
          ? { id: blog.user.id, fullName: `${blog.user.firstName} ${blog.user.lastName}` }
          : null,

        categories: blog.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })),

        tags: blog.tags?.map((t) => ({ id: t.id, name: t.name, slug: t.slug })) || [],
      }))

      const pagination = createPaginationMeta(total, page, limit, request)

      return reply.send(BlogsResponseSchema.parse({ blogs: normalized, pagination }))
    },
  })
}
