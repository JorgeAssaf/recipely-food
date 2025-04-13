import { z } from 'zod'

export const searchParamsSchema = z.object({
  page: z.string().default('1'),
  per_page: z.string().default('8'),
})

export const recipesParamsSchema = searchParamsSchema.extend({
  sort: z.string().default('createdAt.desc').optional(),
  categories: z.string().optional(),
  prepTime: z.string().optional(),
  difficulty: z.string().optional(),
  author: z.string().optional(),
})
