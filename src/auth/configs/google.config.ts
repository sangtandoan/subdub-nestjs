import { Configuration, Value } from "@itgorillaz/configify";

@Configuration()
export class GoogleConfig {
	@Value("GOOGLE_CLIENT_ID")
	clientId: string;
	@Value("GOOGLE_CLIENT_SECRET")
	clientSecret: string;
	@Value("GOOGLE_CALLBACK_URL")
	callbackURL: string;
	@Value("GOOGLE_SCOPE", { parse: (val: string) => val.split(",") })
	scope: string[];
}
