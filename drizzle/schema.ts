import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, serial, varchar, int, mysqlEnum, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const ingredients = mysqlTable("ingredients", {
	id: serial("id").notNull(),
	title: varchar("title", { length: 256 }),
	description: varchar("description", { length: 1024 }),
	quantity: int("quantity"),
	unit: varchar("unit", { length: 256 }),
	recipesId: int("recipes_id").notNull(),
},
(table) => {
	return {
		ingredientsId: primaryKey(table.id)
	}
});

export const recipes = mysqlTable("recipes", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 256 }),
	description: varchar("description", { length: 1024 }),
	difficulty: mysqlEnum("difficulty", ['easy','medium','hard']),
	rating: int("rating").default(0),
	time: int("time"),
	steps: varchar("steps", { length: 1024 }),
	image: varchar("image", { length: 1024 }),
	likes: int("likes").default(0),
	dislikes: int("dislikes").default(0),
	updatedAt: timestamp("updatedAt", { mode: 'string' }),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	category: mysqlEnum("category", ['breakfast','lunch','dinner','dessert','snack','drink','other']),
},
(table) => {
	return {
		recipesId: primaryKey(table.id)
	}
});