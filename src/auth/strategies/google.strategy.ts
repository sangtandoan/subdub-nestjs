import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleConfig } from "@/auth/configs/google.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(googleConfig: GoogleConfig) {
		super({
			clientID: googleConfig.clientId,
			clientSecret: googleConfig.clientSecret,
			callbackURL: googleConfig.callbackURL,
			scope: googleConfig.scope,
		});
	}

	validate(_accessToken: string, _refreshToken: string, profile, _done: VerifyCallback) {
		return {
			email: profile.emails[0].value,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			picture: profile.photos[0].value,
		};
	}
}
