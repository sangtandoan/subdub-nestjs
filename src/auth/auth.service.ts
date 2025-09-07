import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database.module";
import { User } from "src/users/entities/user.entity";
import * as usersSchema from "src/users/schemas/users.schema";

@Injectable()
export class AuthService {
	constructor(
		@Inject(DATABASE_CONNECTION) private readonly usersRepo: NodePgDatabase<typeof usersSchema>,
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersRepo.query.users.findFirst({
			where: eq(usersSchema.users.email, email),
		});

		// If user not found or password is not set, throw an error
		if (!user || !user.password) {
			throw new UnauthorizedException("Invalid credentials");
			// TODO: hash a dummy password to prevent timing attacks
		}

		// Here you should verify the password with a hashing function
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return user;
	}
}
