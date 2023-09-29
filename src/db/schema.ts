import { InferSelectModel, relations } from 'drizzle-orm'
import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

import type { FileUpload, IngredientsType } from '@/types/recipes'

export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  author: varchar('author', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard'])
    .notNull()
    .default('easy'),
  rating: int('rating').default(0).notNull(),
  ingredients: json('ingredients').$type<IngredientsType[]>().notNull(),
  category: mysqlEnum('category', [
    'breakfast',
    'lunch',
    'dinner',
    'meal',
    'dessert',
    'snack',
    'appetizer',
    'drinks',
  ])
    .notNull()
    .default('breakfast'),
  prepTime: int('prepTime').notNull().default(0),
  steps: varchar('steps', { length: 1024 }),
  images: json('images').$type<FileUpload[] | null>(),
  likes: int('likes').default(0),
  dislikes: int('dislikes').default(0),
  updatedAt: timestamp('updatedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
}))

export type Recipes = typeof recipes.$inferSelect
export type NewRecipes = typeof recipes.$inferInsert

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

export type Ingredients = InferSelectModel<typeof ingredients>

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  ingredient: one(recipes, {
    fields: [ingredients.recipesId],
    references: [recipes.id],
  }),
}))

export const savedRecipes = mysqlTable('saved_recipes', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull(),
  recipeId: int('recipeId').notNull(),
  closed: boolean('closed').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow(),
})

export type SavedRecipes = typeof savedRecipes.$inferSelect
