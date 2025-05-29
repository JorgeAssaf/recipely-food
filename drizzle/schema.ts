import { sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'

export const category = pgEnum('category', [
  'breakfast',
  'lunch',
  'dinner',
  'meal',
  'dessert',
  'snack',
  'appetizer',
  'drinks',
])
export const difficulty = pgEnum('difficulty', ['easy', 'medium', 'hard'])

export const savedRecipes = pgTable(
  'saved_recipes',
  {
    id: serial().primaryKey().notNull(),
    userId: varchar({ length: 191 }).notNull(),
    recipeId: integer().notNull(),
    closed: boolean().default(false).notNull(),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('saved_recipes_recipeId_idx').using(
      'btree',
      table.recipeId.asc().nullsLast().op('int4_ops'),
    ),
  ],
)

export const recipes = pgTable(
  'recipes',
  {
    id: serial().primaryKey().notNull(),
    userId: varchar({ length: 256 }).notNull(),
    name: varchar({ length: 256 }).notNull(),
    author: varchar({ length: 256 }).notNull(),
    description: varchar({ length: 1024 }).notNull(),
    difficulty: difficulty().default('easy').notNull(),
    rating: integer().default(0),
    ingredients: json().notNull(),
    category: category().default('breakfast').notNull(),
    prepTime: integer().default(0).notNull(),
    steps: varchar({ length: 1024 }),
    images: json(),
    likes: integer().default(0),
    dislikes: integer().default(0),
    updatedAt: timestamp({ mode: 'string' }),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    slug: varchar({ length: 256 }).default('').notNull(),
  },
  (table) => [
    index('recipes_category_idx').using(
      'btree',
      table.category.asc().nullsLast().op('enum_ops'),
    ),
    index('recipes_rating_idx').using(
      'btree',
      table.rating.asc().nullsLast().op('int4_ops'),
    ),
    unique('recipes_slug_unique').on(table.slug),
  ],
)
