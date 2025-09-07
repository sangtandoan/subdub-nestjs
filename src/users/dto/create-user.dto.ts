import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	@IsStrongPassword(
		{
			minLength: 6,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		},
		{
			message:
				"Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
		},
	)
	password: string;
}
