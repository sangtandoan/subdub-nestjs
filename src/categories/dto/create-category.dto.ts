import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@Expose({ name: "user_id" })
	@IsNotEmpty()
	@IsUUID()
	userID: string;

	@IsString()
	description?: string;

	@IsString()
	color?: string;
}
