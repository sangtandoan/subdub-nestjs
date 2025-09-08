import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";
import { toSnakeCaseObject } from "@/common/utils";

export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost) {
		let errorResponse: unknown;
		let statusCode: number;

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (typeof exception.getStatus !== "function") {
			errorResponse = {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Internal server error",
			};
			statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

			this.logger.error(exception);
		} else {
			statusCode = exception.getStatus();

			if (typeof exception.getResponse() === "object") {
				errorResponse = exception.getResponse();
			} else {
				errorResponse = {
					message: exception.getResponse(),
					statusCode: statusCode,
					error: exception.name.replace("Exception", ""),
				};
			}
		}

		response.status(statusCode).json(toSnakeCaseObject(errorResponse));
	}
}
