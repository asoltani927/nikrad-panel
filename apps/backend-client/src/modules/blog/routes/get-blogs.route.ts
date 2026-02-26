import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createPaginationMeta } from '@/utils/pagination'
import { BlogsResponseSchema, GetBlogsQuerySchema } from '../schema/blogs.schema'
import { PostFieldsEnum, SortOrderEnum } from '@dokamerce/web-sdk'

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

      let sortField = PostFieldsEnum.CreatedAt // TODO: should be published at
      if (sort === 'mostViewed') sortField = PostFieldsEnum.Impression

      const posts = await app.dokamerce.posts.paginated({
        filter: {
          published: {
            equals: true,
          },
        },
        sort: {
          field: sortField,
          order: SortOrderEnum.Desc
        },
        page,
        limit,
        withAuthor: true,
        withCategory: true,
        withComments: false,
        withImage: true,
        withTags: true,
      })


      const normalized = posts?.edges.map((post) => ({
        id: post.node.id,
        title: post.node.title,
        slug: post.node.slug,
        excerpt: post.node.excerpt,
        image: post.node.image?.thumbnails.thumbnail450Url, // TODO: set a default uri for image
        views: 0, // post.node.impression, // TODO
        readingTime: 0, // TODO: make a function to calculate this regardeing content of the post  @reza
        publishedAt: post.node.publishedAt,

        author: post.node.author
          ? { id: post.node.author.id, fullName: `${post.node.author.name}` }
          : null,

        categories: post.node.category ? [{
          id: post.node.category!.id,
          name: post.node.category!.name,
        }] : [],

        tags: post.node.tags?.map((t) => ({ id: t.id, name: t.name })) || [],
      }))

      const total = posts?.pageInfo.totalEdges ?? 0
      const pagination = createPaginationMeta(total, page, limit, request)

      return reply.send(BlogsResponseSchema.parse({ blogs: normalized, pagination }))
    },
  })
}
