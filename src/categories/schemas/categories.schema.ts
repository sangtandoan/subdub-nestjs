import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "@/users/schemas/users.schema";

export const categories = pgTable("categories", {
	id: uuid().primaryKey().default(sql`gen_random_uuid()`),
	userID: uuid()
		.notNull()
		.references(() => users.id),
	name: text().notNull(),
	description: text(),
	color: text(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});
