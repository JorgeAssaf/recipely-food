import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

import type { FileUpload, IngredientsType } from '@/types/recipes'

export const categoryEnum = pgEnum('category', [
  'breakfast',
  'lunch',
  'dinner',
  'meal',
  'dessert',
  'snack',
  'appetizer',
  'drinks',
])

export type CategoryEnum = (typeof categoryEnum.enumValues)[number]

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])

export const recipes = pgTable(
  'recipes',
  {
    id: serial('id').primaryKey(),
    userId: varchar('userId', { length: 256 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    author: varchar('author', { length: 256 }).notNull(),
    description: varchar('description', { length: 1024 }).notNull(),
    difficulty: difficultyEnum().notNull().default('easy'),
    rating: integer('rating').default(0),
    ingredients: json().$type<IngredientsType[]>().notNull(),
    category: categoryEnum().notNull().default('breakfast'),
    prepTime: integer('prepTime').notNull().default(0),
    steps: varchar('steps', { length: 1024 }),
    images: json('images').$type<FileUpload[] | null>(),
    likes: integer('likes').default(0),
    dislikes: integer('dislikes').default(0),
    updatedAt: timestamp('updatedAt'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('recipes_userId_idx').on(table.userId),
    index('recipes_category_idx').on(table.category),
    index('recipes_rating_idx').on(table.rating),
  ],
)

export type Recipe = typeof recipes.$inferSelect
export type NewRecipe = typeof recipes.$inferInsert

export const savedRecipes = pgTable(
  'saved_recipes',
  {
    id: serial('id').primaryKey(),
    userId: varchar('userId', { length: 191 }).notNull(),
    recipeId: integer('recipeId').notNull(),
    closed: boolean('closed').notNull().default(false),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('saved_recipes_userId_idx').on(table.userId),
    index('saved_recipes_recipeId_idx').on(table.recipeId),
  ],
)

export type SavedRecipe = typeof savedRecipes.$inferSelect
export type NewSavedRecipe = typeof savedRecipes.$inferInsert
