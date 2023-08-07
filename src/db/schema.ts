import { InferModel, relations } from 'drizzle-orm'
import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

// declaring enum in database
export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  // userId: int('user_id').notNull(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 1024 }),
  difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard']),
  rating: int('rating').default(0),
  category: mysqlEnum('category', ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drinks']),
  subcategory: varchar("subcategory", { length: 191 }),
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

export type recipes = InferModel<typeof recipes>

export const ingredients = mysqlTable('ingredients', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 1024 }),
  quantity: int('quantity'),
  unit: varchar('unit', { length: 256 }),
  recipesId: int('recipes_id').notNull(),
})

export type ingredients = InferModel<typeof ingredients>

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  ingredient: one(recipes, {
    fields: [ingredients.recipesId],
    references: [recipes.id],
  }),
}))
