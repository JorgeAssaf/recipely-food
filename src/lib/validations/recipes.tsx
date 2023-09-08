import { ingredients, recipes } from '@/db/schema'
import z from 'zod'

export const recipesSchema = z.object({
  name: z.string().min(1, {
    message: 'Missing valid recipe name',
  }),
  description: z.string().min(1, {
    message: 'Missing valid description',
  }),
  difficulty: z
    .enum(recipes.difficulty.enumValues, {
      required_error: 'Must be a valid difficulty',
    })
    .default(recipes.difficulty.enumValues[0]),
  ingredients: z.array(
    z.object({
      ingredient: z.string().min(1, {
        message: 'Must be at least 1 character',
      }),

      unit: z
        .enum(ingredients.unit.enumValues, {
          required_error: 'Must be a valid unit',
        })
        .default(ingredients.unit.enumValues[0]),
      quantity: z.string({
        required_error: 'Missing quantity',
      }),
    }),
    {
      required_error: 'Missing ingredients',
    },
  ),
  category: z
    .enum(recipes.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(recipes.category.enumValues[0]),
  prepTime: z
    .number({
      required_error: 'Missing prep time',
    })
    .positive({
      message: 'Must be a positive number',
    })
    .int({
      message: 'Must be an integer',
    }),

  steps: z
    .string({
      required_error: 'Missing steps',
    })
    .nonempty({
      message: 'Missing steps',
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

  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  author: z.string().optional().nullable(),
  prepTime: z.number().optional(),
  difficulty: z.string().optional().nullable(),
  category: z.enum(recipes.category.enumValues).optional().nullable(),
})
