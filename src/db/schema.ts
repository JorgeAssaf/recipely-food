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
  rating: int('rating').default(0),
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

export type Recipe = typeof recipes.$inferSelect
export type NewRecipe = typeof recipes.$inferInsert

export const savedRecipes = mysqlTable('saved_recipes', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull(),
  recipeId: int('recipeId').notNull(),
  closed: boolean('closed').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow(),
})

export type SavedRecipe = typeof savedRecipes.$inferSelect
export type NewSavedRecipe = typeof savedRecipes.$inferInsert
