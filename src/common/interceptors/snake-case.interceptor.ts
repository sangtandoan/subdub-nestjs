import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import * as changeKeys from "change-case/keys";
import { map, Observable } from "rxjs";

export class SnakeCaseInterceptor implements NestInterceptor {
	intercept(
		_context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(map((data) => changeKeys.snakeCase(data)));
	}
}
