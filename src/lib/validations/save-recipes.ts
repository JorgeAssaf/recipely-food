import { z } from 'zod'

export const getSavedRecipeSchema = z.object({
  userId: z.string().optional(),
  recipeId: z.number().positive().int().optional(),
})

export const addSaveRecipeSchema = z.object({
  userId: z.string().optional(),
  recipeId: z.number().positive().int().default(0),
})
