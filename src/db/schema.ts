import { InferModel, relations } from 'drizzle-orm'
import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

import { IngredientsType } from '@/types/recipes'

// declaring enum in database
export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  // userId: int('user_id').notNull(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 1024 }),
  difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard']),
  rating: int('rating').default(0),
  ingredients: json('ingredients').$type<IngredientsType[]>().default([]),
  category: mysqlEnum('category', [
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'snack',
    'appetizer',
    'drinks',
  ]),

  prepTime: int('prepTime'),
  steps: varchar('steps', { length: 1024 }),
  image: varchar('image', { length: 1024 }),
  likes: int('likes').default(0),
  dislikes: int('dislikes').default(0),
  updatedAt: timestamp('updatedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
}))

export type Recipes = InferModel<typeof recipes>

export const ingredients = mysqlTable('ingredients', {
  id: serial('id').primaryKey(),
  ingredient: varchar('ingredient', { length: 256 }),
  quantity: int('quantity'),
  unit: mysqlEnum('unit', [
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'pinch',
  ]),
  recipesId: int('recipes_id'),
})

export type Ingredients = InferModel<typeof ingredients>

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  ingredient: one(recipes, {
    fields: [ingredients.recipesId],
    references: [recipes.id],
  }),
}))
