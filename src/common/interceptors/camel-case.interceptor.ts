import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import * as changeKeys from "change-case/keys";
import { Observable } from "rxjs";

export class CamelCaseInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest();
		const body = request.body;
		if (body && typeof body === "object") {
			request.body = changeKeys.camelCase(body);
		}

		return next.handle();
	}
}
