// src/utils/pagination.ts
import { FastifyRequest } from 'fastify'

interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  links?: Record<string, string | null>
}

export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number,
  request?: FastifyRequest,
): PaginationMeta => {
  const totalPages = Math.max(Math.ceil(total / limit), 1)

  const baseUrl = request ? request.url.split('?')[0] : ''
  const makeLink = (p: number) => `${baseUrl}?page=${p}&limit=${limit}`

  const links =
    request && totalPages > 1
      ? {
          first: makeLink(1),
          last: makeLink(totalPages),
          prev: page > 1 ? makeLink(page - 1) : null,
          next: page < totalPages ? makeLink(page + 1) : null,
        }
      : undefined

  return { total, page, limit, totalPages, links }
}
