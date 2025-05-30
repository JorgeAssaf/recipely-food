'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { recipes, savedRecipes, type Recipe } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import {
  and,
  asc,
  desc,
  eq,
  gte,
  inArray,
  like,
  lte,
  not,
  sql,
} from 'drizzle-orm'
import { type z } from 'zod'

import type { FileUpload } from '@/types/recipes'
import {
  getRecipeSchema,
  type getRecipesSchema,
  type recipesSchema,
} from '@/lib/validations/recipes'

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
  const [column, order] = (input.sort?.split('.') as [
    keyof Recipe | undefined,
    'asc' | 'desc' | undefined,
  ]) ?? ['createdAt', 'desc']
  const difficulty =
    (input.difficulty?.split('.') as Recipe['difficulty'][]) ?? []
  const [minPrepTime, maxPrepTime] = input.prepTime?.split('-') ?? []
  const categories =
    (input.categories?.split('.') as Recipe['category'][]) ?? []
  const category = (input.category as Recipe['category']) ?? undefined
  const author = (input.author?.split('.') as Recipe['author'][]) ?? []

  const items = await db
    .select()
    .from(recipes)
    .limit(input.limit)
    .offset(input.offset)
    .where(
      and(
        author.length ? inArray(recipes.author, author) : undefined,
        category ? eq(recipes.category, category) : undefined,
        categories.length ? inArray(recipes.category, categories) : undefined,
        difficulty.length ? inArray(recipes.difficulty, difficulty) : undefined,
        minPrepTime ? gte(recipes.prepTime, parseInt(minPrepTime)) : undefined,
        maxPrepTime ? lte(recipes.prepTime, parseInt(maxPrepTime)) : undefined,
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

  const count = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(recipes)
    .where(
      and(
        author.length ? inArray(recipes.author, author) : undefined,
        category ? eq(recipes.category, category) : undefined,
        categories.length ? inArray(recipes.category, categories) : undefined,
        difficulty.length ? inArray(recipes.difficulty, difficulty) : undefined,
        minPrepTime ? gte(recipes.prepTime, parseInt(minPrepTime)) : undefined,
        maxPrepTime ? lte(recipes.prepTime, parseInt(maxPrepTime)) : undefined,
      ),
    )
    .execute()
    .then((res) => res[0]?.count ?? 0)

  return {
    items,
    count,
  }
}

export async function AddRecipeAction(
  values: z.infer<typeof recipesSchema> & {
    images: FileUpload[] | null
  },
) {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to add a recipe.')
  }

  const existingRecipes = await db
    .select({ name: recipes.name })
    .from(recipes)
    .where(eq(recipes.name, values.name))
    .limit(1)
    .execute()

  if (existingRecipes.length > 0) {
    throw new Error('Recipe name already taken.')
  }

  const authorName = [user.firstName ?? user.username, user.lastName ?? '']
    .filter(Boolean)
    .join(' ')

  await db.insert(recipes).values({
    ...values,
    userId: user.id,
    author: authorName,
  })

  revalidatePath(`/dashboard/recipes`)
}

// export async function dislikeRecipeAction(
//   id: number,
//   dislikes: number,
//   userId: string,
// ) {
//   const user = await currentUser()
//   if (!user) {
//     throw new Error('You must be logged in to like a recipe.')
//   }

//   const recipe = await db.query.recipes.findFirst({
//     where: eq(recipes.id, id),
//   })

//   if (!recipe) {
//     throw new Error('Recipe not found.')
//   }
//   if (userId === user.id) {
//     throw new Error('You cannot dislike your own recipe.')
//   }

//   await db
//     .update(recipes)
//     .set({
//       dislikes,
//     })
//     .where(eq(recipes.id, id))

//   revalidatePath(`/recipe/${id}`)
//   return
// }

// export async function likeRecipeAction(id: number, likes: number) {
//   const user = await currentUser()
//   if (!user) {
//     throw new Error('You must be logged in to like a recipe.')
//   }

//   const recipe = await db.query.recipes.findFirst({
//     where: eq(recipes.id, id),
//   })

//   if (!recipe) {
//     throw new Error('Recipe not found.')
//   }

//   await db
//     .update(recipes)
//     .set({
//       likes,
//     })
//     .where(eq(recipes.id, id))

//   revalidatePath(`/recipe/${id}`)
//   return
// }

export async function UpdateRecipeAction(
  values: z.infer<typeof recipesSchema> & {
    id: number
    images: FileUpload[] | null
  },
) {
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, values.id),
  })
  const recipeWithSameName = await db.query.recipes.findFirst({
    where: values.id
      ? and(eq(recipes.name, values.name), not(eq(recipes.id, values.id)))
      : eq(recipes.name, values.name),
  })

  if (recipeWithSameName) {
    throw new Error('Product name already taken.')
  }
  if (!recipe) {
    throw new Error('Recipe not found.')
  }

  await db
    .update(recipes)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(recipes.id, values.id))

  revalidatePath(`/dashboard/recipes`)
}

export async function DeleteRecipeAction(
  rawInput: z.infer<typeof getRecipeSchema>,
) {
  const input = getRecipeSchema.parse(rawInput)

  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, input.id),
  })
  if (!recipe) {
    throw new Error('Recipe not found.')
  }
  await db.delete(recipes).where(eq(recipes.id, input.id))

  revalidatePath(`/dashboard/recipes/my-recipes`)
}

export async function DeleteRecipesAction() {
  return await db.delete(savedRecipes)
}
export const generateRecipes = async () => {}
