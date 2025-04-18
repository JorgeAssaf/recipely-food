CREATE TYPE "public"."category" AS ENUM('breakfast', 'lunch', 'dinner', 'meal', 'dessert', 'snack', 'appetizer', 'drinks');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"author" varchar(256) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"difficulty" "difficulty" DEFAULT 'easy' NOT NULL,
	"rating" integer DEFAULT 0,
	"ingredients" json NOT NULL,
	"category" "category" DEFAULT 'breakfast' NOT NULL,
	"prepTime" integer DEFAULT 0 NOT NULL,
	"steps" varchar(1024),
	"images" json,
	"likes" integer DEFAULT 0,
	"dislikes" integer DEFAULT 0,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"recipeId" integer NOT NULL,
	"closed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "recipes_userId_idx" ON "recipes" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "recipes_category_idx" ON "recipes" USING btree ("category");--> statement-breakpoint
CREATE INDEX "recipes_rating_idx" ON "recipes" USING btree ("rating");--> statement-breakpoint
CREATE UNIQUE INDEX "saved_recipes_userId_idx" ON "saved_recipes" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "saved_recipes_recipeId_idx" ON "saved_recipes" USING btree ("recipeId");