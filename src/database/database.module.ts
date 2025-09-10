import { Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as categoriesSchema from "@/categories/schemas/categories.schema";
import { DatabaseConfig } from "@/database/database.config";
import * as subscriptionsSchema from "@/subscriptions/schemas/subscriptions.schema";
import * as usersSchema from "@/users/schemas";

export const DATABASE_CONNECTION = "DATABASE_CONNECTION";

@Module({
	providers: [
		{
			provide: DATABASE_CONNECTION,
			useFactory(dbCfg: DatabaseConfig) {
				const pool = new Pool({ connectionString: dbCfg.connectionString });

				return drizzle(pool, {
					schema: { ...usersSchema, ...categoriesSchema, ...subscriptionsSchema },
					casing: "snake_case",
					logger: true,
				});
			},
			inject: [DatabaseConfig],
		},
	],
	exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
