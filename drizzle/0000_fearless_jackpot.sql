CREATE TABLE `ingredients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(256),
	`description` varchar(1024),
	`quantity` int,
	`unit` varchar(256),
	`ingredients_id` int,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`description` varchar(1024),
	`difficulty` enum('easy','medium','hard'),
	`rating` int DEFAULT 0,
	`time` int,
	`steps` varchar(1024),
	`ingredients_id` int NOT NULL,
	`image` varchar(1024),
	`likes` int DEFAULT 0,
	`dislikes` int DEFAULT 0,
	`updatedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_ingredients_id_recipes_id_fk` FOREIGN KEY (`ingredients_id`) REFERENCES `recipes`(`id`) ON DELETE no action ON UPDATE no action;