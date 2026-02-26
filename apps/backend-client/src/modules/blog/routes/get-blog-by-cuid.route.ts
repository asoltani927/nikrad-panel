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

      const post = await app.dokamerce.posts.find({
        id: cuid,
        withAuthor: true,
        withCategory: true,
        withComments: false,
        withImage: true,
        withTags: true,
      })

      if (!post) {
        return reply.status(404).send({
          message: 'Blog not found',
        })
      }

      await app.dokamerce.posts.updatePostImpression({
        id: post.id
      })

      const response = {
        cuid: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image?.thumbnails.thumbnail450Url, // TODO: make a default 
        views: 0, // post.node.impression, // TODO
        readingTime: 0, // TODO: make a function to calculate this regardeing content of the post @reza
        publishedAt: post.publishedAt,

        author: post.author
          ? {
            id: post.author.id,
            fullName: `${post.author.name}`,
          }
          : null,

        categories: post.category ? [{
          id: post.category!.id,
          name: post.category!.name,
        }] : [],

        tags: post.tags?.map((t) => ({ id: t.id, name: t.name })) || [],

        comments: post.comments?.map((c) => ({
          comment: c.content,
          createdAt: c.createdAt,
          user: c.author
            ? {
              fullName: `${c.author.fullName}`,
            }
            : null,
        })),
      }

      return reply.status(200).send(BlogDetailSchema.parse(response))
    },
  })
}
