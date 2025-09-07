import { Expose } from "class-transformer";

export class UserDto {
	@Expose()
	id: string;
	@Expose()
	email: string;
	@Expose({ name: "created_at" })
	createdAt: Date;
	@Expose({ name: "updated_at" })
	updatedAt: Date;
}
