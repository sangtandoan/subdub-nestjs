import { Configuration, Value } from "@itgorillaz/configify";
import { IsNotEmpty, IsString } from "class-validator";

@Configuration()
export class JwtConfig {
	@Value("JWT_SECRET_KEY")
	@IsNotEmpty()
	@IsString()
	jwtSecretKey: string;

	@Value("JWT_EXPIRES_IN")
	@IsNotEmpty()
	@IsString()
	jwtExpiresIn: string;
}
