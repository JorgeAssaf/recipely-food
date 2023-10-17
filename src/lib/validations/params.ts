import { z } from 'zod'

export const recipesParamsSchema = z.object({
  page: z.string().optional(),
  per_page: z.string().optional(),
  sort: z.string().optional(),
  categories: z.string().optional(),
  prepTime: z.string().optional(),
  difficulty: z.string().optional(),
  author: z.string().optional().default('created_at.desc'),
})
