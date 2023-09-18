import { ingredients, recipes } from '@/db/schema'
import z from 'zod'

export const recipesSchema = z.object({
  name: z.string().min(1, {
    message: 'Missing valid recipe name',
  }),
  description: z
    .string({
      required_error: 'Missing description',
    })
    .min(10, {
      message: 'Must be at least 10 characters',
    })
    .nonempty({
      message: 'Missing description',
    }),
  image: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string().url(),
      // }, {
      //   required_error: 'Missing image',
      // }),
    })
    .optional()
    .nullable(),

  difficulty: z
    .enum(recipes.difficulty.enumValues, {
      required_error: 'Must be a valid difficulty',
    })
    .default(recipes.difficulty.enumValues[0]),
  ingredients: z.array(
    z.object({
      ingredient: z.string().min(5, {
        message: 'Must be at least 5 characters',
      }),

      unit: z
        .enum(ingredients.unit.enumValues, {
          required_error: 'Must be a valid unit',
        })
        .default(ingredients.unit.enumValues[0]),
      quantity: z.number().positive().int().default(0),
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
  prepTime: z.number().positive().int().default(0),
  steps: z
    .string({
      required_error: 'Missing steps',
    })
    .min(10, {
      message: 'Must be at least 10 characters',
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
