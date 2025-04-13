import { recipes } from '@/db/schema'
import { z } from 'zod'

import { Units } from '@/types/recipes'

export const recipesSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    message: 'Difficulty is required',
  }),
  category: z.enum(recipes.category.enumValues, {
    required_error: 'Must be a valid category',
  }),
  prepTime: z.number().min(1, 'Prep time is required'),
  steps: z.string().min(1, 'Steps are required'),
  ingredients: z
    .array(
      z.object({
        ingredient: z.string().min(1, 'Ingredient is required'),
        units: z.nativeEnum(Units),
        quantity: z.number(),
      }),
    )
    .min(1, 'At least one ingredient is required'),
  images: z.any().optional(),
})
export const getRecipeSchema = z.object({
  id: z.number(),
})
export const getRecipesSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  category: z.string().optional().nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  author: z.string().optional().nullable(),
  prepTime: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  difficulty: z.string().optional().nullable(),
})
