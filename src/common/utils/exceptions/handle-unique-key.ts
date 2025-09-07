import { ConflictException } from "@nestjs/common";
import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";

export function handleUniqueKeyError(error: unknown, message?: string) {
	if (error instanceof DrizzleQueryError) {
		if (error.cause instanceof DatabaseError && error.cause.code === "23505") {
			throw new ConflictException(message || "Resource with this unique key already exists.");
		}
	}
	throw error;
}
