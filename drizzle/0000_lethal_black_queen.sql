-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `ingredients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(256),
	`quantity` int,
	`unit` enum('g','kg','ml','l','tsp','tbsp','cup','pinch'),
	`recipes_id` int,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`description` varchar(1024),
	`difficulty` enum('easy','medium','hard'),
	`rating` int DEFAULT 0,
	`ingredients` json,
	`category` enum('breakfast','lunch','dinner','dessert','snack','appetizer','drinks'),
	`prepTime` int,
	`steps` varchar(1024),
	`image` varchar(1024),
	`likes` int DEFAULT 0,
	`dislikes` int DEFAULT 0,
	`updatedAt` timestamp,
	`createdAt` timestamp DEFAULT now(),
	CONSTRAINT `recipes_id` PRIMARY KEY(`id`)
);

*/