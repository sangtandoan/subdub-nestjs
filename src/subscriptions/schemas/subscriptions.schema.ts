import { sql } from "drizzle-orm";
import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { categories } from "@/categories/schemas/categories.schema";
import { users } from "@/users/schemas/users.schema";

export const billingCycleEnum = pgEnum("billing_cycle", ["monthly", "yearly", "weekly", "daily"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
	"active",
	"paused",
	"canceled",
	"expired",
]);

export const subscriptions = pgTable("subscriptions", {
	id: uuid().primaryKey().default(sql`gen_random_uuid()`),
	userID: uuid()
		.notNull()
		.references(() => users.id),
	name: text().notNull(),
	description: text(),
	cost: text().notNull(),
	currency: text().notNull(),
	billingCycle: billingCycleEnum().notNull(),
	startDate: date().notNull(),
	endDate: date(),
	status: subscriptionStatusEnum().notNull().default("active"),
	categoryID: uuid().references(() => categories.id),
	createdAt: date().notNull().defaultNow(),
	updatedAt: date().notNull().defaultNow(),
});
