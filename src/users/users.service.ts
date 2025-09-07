import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database.module";
import { User } from "src/users/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as usersSchema from "./schemas/users.schema";

@Injectable()
export class UsersService {
	constructor(
		@Inject(DATABASE_CONNECTION) private readonly usersRepo: NodePgDatabase<typeof usersSchema>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		const [user] = await this.usersRepo
			.insert(usersSchema.users)
			.values({
				email: createUserDto.email,
				password: hashedPassword,
			})
			.returning();

		return user;
	}

	findAll() {
		return ``;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
