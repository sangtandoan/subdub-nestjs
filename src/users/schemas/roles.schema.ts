import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rolePermissions } from "@/users/schemas/role_permissions.schema";
import { userRoles } from "@/users/schemas/user_roles.schema";

export const roles = pgTable("roles", {
	id: uuid().primaryKey().default(sql`gen_random_uuid`),
	name: text().unique().notNull(),
	description: text(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
	rolePermissions: many(rolePermissions),
	userRoles: many(userRoles),
}));
