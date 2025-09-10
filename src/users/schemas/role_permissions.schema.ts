import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { permissions, roles } from "@/users/schemas";

export const rolePermissions = pgTable(
	"role_permissions",
	{
		id: uuid().primaryKey().default(sql`gen_random_uuid`),
		roleID: uuid()
			.notNull()
			.references(() => roles.id),
		permissionID: uuid()
			.notNull()
			.references(() => permissions.id),
		createdAt: timestamp().notNull().defaultNow(),
	},
	(table) => [uniqueIndex("role_permission_idx").on(table.roleID, table.permissionID)],
);

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
	role: one(roles, {
		fields: [rolePermissions.roleID],
		references: [roles.id],
	}),
	permission: one(permissions, {
		fields: [rolePermissions.permissionID],
		references: [permissions.id],
	}),
}));
