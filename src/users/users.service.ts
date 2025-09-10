import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { eq, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database.module";
import { User } from "src/users/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as schemas from "./schemas";

@Injectable()
export class UsersService {
	constructor(
		@Inject(DATABASE_CONNECTION) private readonly usersRepo: NodePgDatabase<typeof schemas>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		const [user] = await this.usersRepo
			.insert(schemas.users)
			.values({
				email: createUserDto.email,
				password: hashedPassword,
			})
			.returning();

		return user;
	}

	async findAll() {
		const { users, userRoles, roles, rolePermissions, permissions } = schemas;
		return await this.usersRepo
			.select({
				id: users.id,
				email: users.email,
				roles: sql`
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', ${roles.id},
                            'name', ${roles.name},
                            'permissions', COALESCE((
                                SELECT JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                        'id', p.id,
                                        'name', p.name
                                    )
                                )
                                FROM ${permissions} p
                                INNER JOIN ${rolePermissions} rp ON p.id = rp.permission_id
                                WHERE rp.role_id = ${roles.id}
                            ), '[]')
                        )
                    ) FILTER (WHERE ${roles.id} IS NOT NULL)
                `,
			})
			.from(users)
			.leftJoin(userRoles, eq(userRoles.userID, users.id))
			.leftJoin(roles, eq(roles.id, userRoles.roleID))
			.groupBy(users.id, users.email);
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		// TODO: Implement user update logic
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
