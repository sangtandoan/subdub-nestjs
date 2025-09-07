import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";
import { SnakeCaseInterceptor } from "@/common/interceptors/snake-case.interceptor";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.useGlobalInterceptors(new SnakeCaseInterceptor());
	// app.useGlobalInterceptors(new CamelCaseInterceptor());
	//
	// transform: true => auto transform payloads to DTO instances using class-transformer (plainToInstance)
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
	);
	app.setGlobalPrefix("api");

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
