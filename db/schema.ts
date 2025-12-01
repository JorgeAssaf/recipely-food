import { relations, sql, type SQL } from 'drizzle-orm'
import {
  boolean,
  check,
  customType,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])
export const visibilityEnum = pgEnum('visibility', [
  'public',
  'private',
  'unlisted',
])
const tsvector = customType<{ data: string }>({ dataType: () => 'tsvector' })

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}

export const usersTable = pgTable(
  'users',
  {
    clerkId: varchar('clerk_id', { length: 128 }).primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    ...timestamps,
  },
  (t) => [index('users_email_idx').on(t.email)],
)

export const recipesTable = pgTable(
  'recipes',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 1024 }).notNull(),
    userId: varchar('user_id', { length: 128 })
      .notNull()
      .references(() => usersTable.clerkId, { onDelete: 'cascade' }),
    slug: varchar('slug', { length: 255 }).notNull(),
    imageUrl: varchar('image_url', { length: 512 }),
    isPublished: boolean('is_published').default(false).notNull(),
    visibility: visibilityEnum().default('public').notNull(),
    difficulty: difficultyEnum().notNull(),
    servings: integer('servings').default(1).notNull(),
    prepTimeMin: integer('prep_time_min').default(0).notNull(),
    cookTimeMin: integer('cook_time_min').default(0).notNull(),
    totalTimeMin: integer('total_time_min').generatedAlwaysAs(
      sql`(COALESCE(prep_time_min,0) + COALESCE(cook_time_min,0))`,
    ),
    tags: jsonb('tags').$type<string[]>().default([]).notNull(),
    language: varchar('language', { length: 8 }),
    ratingSum: integer('rating_sum').default(0).notNull(),
    ratingCount: integer('rating_count').default(0).notNull(),
    favoritesCount: integer('favorites_count').default(0).notNull(),
    search: tsvector('search')
      .notNull()
      .generatedAlwaysAs(
        (): SQL =>
          sql`setweight(to_tsvector('english', title), 'A') ||
             setweight(to_tsvector('english', description), 'B')`,
      ),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('recipes_user_slug_unique_idx').on(t.userId, t.slug),
    index('recipes_user_idx').on(t.userId),
    index('recipes_title_idx').on(t.title),
    index('recipes_difficulty_idx').on(t.difficulty),
    index('recipes_visibility_idx').on(t.visibility),
    index('recipes_user_published_idx')
      .on(t.userId)
      .where(sql`${t.isPublished} = true`),
    index('recipes_search_idx').using('gin', t.search),
    check('recipes_servings_positive', sql`${t.servings} > 0`),
    check(
      'recipes_times_non_negative',
      sql`${t.prepTimeMin} >= 0 AND ${t.cookTimeMin} >= 0`,
    ),
    check(
      'recipes_rating_non_negative',
      sql`${t.ratingSum} >= 0 AND ${t.ratingCount} >= 0 AND ${t.favoritesCount} >= 0`,
    ),
  ],
)

export const categoriesTable = pgTable(
  'categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    icon: varchar('icon', { length: 128 }),
    description: varchar('description', { length: 255 }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('categories_slug_unique_idx').on(t.slug),
    index('categories_name_idx').on(t.name),
  ],
)

export const recipeCategoriesTable = pgTable(
  'recipe_categories',
  {
    recipeId: integer('recipe_id')
      .notNull()
      .references(() => recipesTable.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categoriesTable.id, { onDelete: 'cascade' }),
  },
  (t) => [
    uniqueIndex('recipe_categories_unique_idx').on(t.recipeId, t.categoryId),
    index('recipe_categories_recipe_idx').on(t.recipeId),
    index('recipe_categories_category_idx').on(t.categoryId),
  ],
)

export const usersRelations = relations(usersTable, ({ many }) => ({
  recipes: many(recipesTable),
}))

export const recipesRelations = relations(recipesTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [recipesTable.userId],
    references: [usersTable.clerkId],
  }),
  categories: many(recipeCategoriesTable),
}))

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  recipes: many(recipeCategoriesTable),
}))

export const recipeCategoriesRelations = relations(
  recipeCategoriesTable,
  ({ one }) => ({
    recipe: one(recipesTable, {
      fields: [recipeCategoriesTable.recipeId],
      references: [recipesTable.id],
    }),
    category: one(categoriesTable, {
      fields: [recipeCategoriesTable.categoryId],
      references: [categoriesTable.id],
    }),
  }),
)

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
export type Recipe = typeof recipesTable.$inferSelect
export type NewRecipe = typeof recipesTable.$inferInsert
export type Category = typeof categoriesTable.$inferSelect
export type NewCategory = typeof categoriesTable.$inferInsert
