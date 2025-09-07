import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "@/auth/configs/jwt.config";
import { JwtPayload } from "@/auth/types";
import { CurrentUser } from "@/common/types/index";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(jwtConfig: JwtConfig) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.jwtSecretKey,
			ignoreExpiration: false,
		});
	}

	validate(payload: JwtPayload): CurrentUser {
		return { email: payload.email };
	}
}
