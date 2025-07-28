DROP INDEX "recipes_userId_idx";--> statement-breakpoint
DROP INDEX "saved_recipes_userId_idx";--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "slug" varchar(256) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_slug_unique" UNIQUE("slug");