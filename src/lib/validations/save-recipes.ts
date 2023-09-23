import { z } from "zod";

export const getSavedRecipeSchema = z.object({
  userId: z.string().min(1, {
    message: 'Missing valid user id',
  }),

})

export const addSaveRecipeSchema = z.object({
  userId: z.string().min(1, {
    message: "Missing valid user id",
  }),
  recipeId: z.number().positive().int().default(0),
  closed: z.boolean().default(false),
});
