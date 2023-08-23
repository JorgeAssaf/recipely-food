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
	varchar,
} from 'drizzle-orm/mysql-core'

export const ingredients = mysqlTable(
	'ingredients',
	{
		id: serial('id').notNull(),
		title: varchar('title', { length: 256 }),
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
	},
	(table) => {
		return {
			ingredientsId: primaryKey(table.id),
		}
	},
)

export const recipes = mysqlTable(
	'recipes',
	{
		id: serial('id').notNull(),
		name: varchar('name', { length: 256 }),
		description: varchar('description', { length: 1024 }),
		difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard']),
		rating: int('rating').default(0),
		ingredients: json('ingredients'),
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
		updatedAt: timestamp('updatedAt', { mode: 'string' }),
		createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
	},
	(table) => {
		return {
			recipesId: primaryKey(table.id),
		}
	},
)
