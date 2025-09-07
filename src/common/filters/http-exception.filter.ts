import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { toSnakeCaseObject } from "@/common/utils";

export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const statusCode = exception.getStatus();

		const errorResponse = {
			message: exception.message,
			statusCode: statusCode,
			error: exception.name.replace("Exception", ""),
		};

		response.status(statusCode).json(toSnakeCaseObject(errorResponse));
	}
}
