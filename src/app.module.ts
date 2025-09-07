import { ConfigifyModule } from "@itgorillaz/configify";
import { Module } from "@nestjs/common";
import { CategoriesModule } from "@/categories/categories.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		AuthModule,
		SubscriptionsModule,
		CategoriesModule,
		ConfigifyModule.forRootAsync(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
