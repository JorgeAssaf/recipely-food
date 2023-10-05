import { recipes } from '@/db/schema'
import { z } from 'zod'

import { Units } from '@/types/recipes'

export const recipesSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Missing valid recipe name',
    })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/g, {
      message: 'Recipe name must be alphanumeric no - or _',
    }),
  description: z
    .string({
      required_error: 'Missing description',
    })
    .min(10, {
      message: 'Must be at least 10 characters',
    }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Must be an array of File')
    .optional()
    .nullable()
    .default(null),
  difficulty: z
    .enum(recipes.difficulty.enumValues, {
      required_error: 'Must be a valid difficulty',
    })
    .default(recipes.difficulty.enumValues[0]),
  ingredients: z
    .array(
      z.object({
        ingredient: z.string().min(2, {
          message: 'Must be at least 2 characters',
        }),

        units: z.nativeEnum(Units).default(Units.kilogram),

        quantity: z.number().positive().default(0),
      }),
      {
        required_error: 'Missing ingredients',
      },
    )
    .nonempty({
      message: 'Missing ingredients',
    }),
  category: z
    .enum(recipes.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(recipes.category.enumValues[0]),
  prepTime: z.number().positive().int().default(0),
  steps: z
    .string({
      required_error: 'Missing steps',
    })
    .min(10, {
      message: 'Must be at least 10 characters',
    }),
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
