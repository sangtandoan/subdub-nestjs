import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { roles, users } from "@/users/schemas";

export const userRoles = pgTable(
	"user_roles",
	{
		id: uuid().primaryKey().default(sql`gen_random_uuid`),
		userID: uuid()
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		roleID: uuid()
			.notNull()
			.references(() => roles.id, { onDelete: "cascade" }),
		createdAt: timestamp().notNull().defaultNow(),
	},
	(table) => [uniqueIndex("user_role_idx").on(table.userID, table.roleID)],
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(users, {
		fields: [userRoles.userID],
		references: [users.id],
	}),
	role: one(roles, {
		fields: [userRoles.roleID],
		references: [roles.id],
	}),
}));
