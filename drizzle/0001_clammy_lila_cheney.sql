ALTER TABLE `ingredients` DROP FOREIGN KEY `ingredients_ingredients_id_recipes_id_fk`;
--> statement-breakpoint
ALTER TABLE `recipes` RENAME COLUMN `ingredients_id` TO `ingredientsId`;--> statement-breakpoint
ALTER TABLE `ingredients` DROP COLUMN `ingredients_id`;