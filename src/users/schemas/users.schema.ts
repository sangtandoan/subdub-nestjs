import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { subscriptions } from "@/subscriptions/schemas/subscriptions.schema";
import { userRoles } from "@/users/schemas/user_roles.schema";

export const users = pgTable("users", {
	id: uuid().primaryKey().default(sql`gen_random_uuid()`),
	email: text().unique().notNull(),
	password: text(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	userRoles: many(userRoles),
	subscriptions: many(subscriptions),
}));
