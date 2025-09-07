import { Configuration, Value } from "@itgorillaz/configify";
import { IsNotEmpty, IsString } from "class-validator";

@Configuration()
export class DatabaseConfig {
	@Value("DATABASE_URL")
	@IsNotEmpty()
	@IsString()
	connectionString: string;
}
