import { ingredients, recipes } from '@/db/schema'
import { z } from 'zod'

export const recipesSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters.',
    })
    .optional(),
  category: z
    .enum(recipes.category.enumValues, {
      required_error: 'Must select a valid category.',
    })
    .default(recipes.category.enumValues[0]),

  ingredients: z.object({
    title: z.string().min(2, {
      message: 'Title must be at least 2 characters.',

    }),
    unit: z.enum(ingredients.unit.enumValues, {
      required_error: 'Must select a valid unit.',
    }).default(ingredients.unit.enumValues[0]),

    description: z.string().min(2, {
      message: 'Description must be at least 2 characters.',
    }),
    quantity: z.string().min(2, {
      message: 'Quantity must be at least 2 characters.',
    }),

  }),

  steps: z.string().min(2, {
    message: 'Steps must be at least 2 characters.',
  }),
  // image: z.string().min(2, {
  //   message: "Image must be at least 2 characters.",
  // }),
})
