'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { ingredients, Recipes, recipes } from '@/db/schema'
import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm'
import { z } from 'zod'

import { getRecipesSchema, recipesSchema } from '@/lib/validations/recipes'

export async function filterProductsAction(query: string) {
  if (query.length === 0) return null
  const filteredRecipes = await db
    .select({
      category: recipes.category,
      name: recipes.name,
      id: recipes.id,
    })
    .from(recipes)
    .where(like(recipes.name, `%${query}%`))
    .orderBy(recipes.createdAt)
    .limit(10)
  const data = Object.values(recipes.category.enumValues).map((category) => ({
    category,
    recipes: filteredRecipes.filter((recipe) => recipe.category === category),
  }))
  return data
}
export async function getRecipesAction(
  input: z.infer<typeof getRecipesSchema>,
) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof Recipes | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const difficulty =
    (input.difficulty?.split('.') as Recipes['difficulty'][]) ?? []
  const prepTime = input.prepTime
  const categories =
    (input.categories?.split('.') as Recipes['category'][]) ?? []
  const limit = input.limit ?? 2
  const offset = input.offset ?? 0

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(recipes)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          categories.length ? inArray(recipes.category, categories) : undefined,
          difficulty.length
            ? inArray(recipes.difficulty, difficulty)
            : undefined,
          prepTime ? eq(recipes.prepTime, prepTime) : undefined,
        ),
      )
      .groupBy(recipes.id)
      .orderBy(
        column && column in recipes
          ? order === 'asc'
            ? asc(recipes[column])
            : desc(recipes[column])
          : desc(recipes.createdAt),
      )
    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(recipes)
      .where(
        and(
          categories.length ? inArray(recipes.category, categories) : undefined,
          difficulty.length
            ? inArray(recipes.difficulty, difficulty)
            : undefined,
          prepTime ? eq(recipes.prepTime, prepTime) : undefined,
        ),
      )
      .groupBy(recipes.id)
      .execute()
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
    }
  })

  return {
    items,
    count,
  }
}

export async function AddRecipeAction(
  values: z.infer<typeof recipesSchema> & { userId: string; author: string },
) {
  const productWithSameName = await db.query.recipes.findFirst({
    where: eq(recipes.name, values.name),
  })

  if (productWithSameName) {
    throw new Error('Product name already taken.')
  }

  await db.insert(recipes).values(values)

  revalidatePath(`/dashboard/recipes`)
}

export async function AddIngredientsAction(values: any) {
  const recipe = await db.select().from(recipes)

  await db.insert(ingredients).values(values)
}
export async function DeleteRecipesAction() {
  return await db.delete(recipes)
}
