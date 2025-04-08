import { sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  int,
  json,
  mysqlEnum,
  mysqlSchema,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  tinyint,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'

export const recipes = mysqlTable(
  'recipes',
  {
    id: serial('id').notNull(),
    userId: varchar('userId', { length: 256 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    author: varchar('author', { length: 256 }).notNull(),
    description: varchar('description', { length: 1024 }).notNull(),
    difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard'])
      .default('easy')
      .notNull(),
    rating: int('rating').default(0),
    ingredients: json('ingredients').notNull(),
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
      .default('breakfast')
      .notNull(),
    prepTime: int('prepTime').default(0).notNull(),
    steps: varchar('steps', { length: 1024 }),
    images: json('images'),
    likes: int('likes').default(0),
    dislikes: int('dislikes').default(0),
    updatedAt: timestamp('updatedAt', { mode: 'string' }),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      recipesId: primaryKey({ columns: [table.id], name: 'recipes_id' }),
      id: unique('id').on(table.id),
    }
  },
)

export const savedRecipes = mysqlTable(
  'saved_recipes',
  {
    id: serial('id').notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    recipeId: int('recipeId').notNull(),
    closed: tinyint('closed').default(0).notNull(),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      savedRecipesId: primaryKey({
        columns: [table.id],
        name: 'saved_recipes_id',
      }),
      id: unique('id').on(table.id),
    }
  },
)
