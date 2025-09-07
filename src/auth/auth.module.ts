import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "@/auth/configs/jwt.config";
import { GoogleAuthGuard } from "@/auth/guards/google.guard";
import { LocalAuthGuard } from "@/auth/guards/local.guard";
import { GoogleStrategy } from "@/auth/strategies/google.strategy";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { LocalStrategy } from "@/auth/strategies/local.strategy";
import { DatabaseModule } from "@/database/database.module";
import { UsersModule } from "@/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		JwtModule.registerAsync({
			inject: [JwtConfig],
			useFactory(jwtConfig: JwtConfig) {
				return {
					secret: jwtConfig.jwtSecretKey,
					signOptions: { algorithm: "HS256", expiresIn: jwtConfig.jwtExpiresIn },
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		LocalAuthGuard,
		JwtStrategy,
		GoogleStrategy,
		GoogleAuthGuard,
	],
})
export class AuthModule {}
