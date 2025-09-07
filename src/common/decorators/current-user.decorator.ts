import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as types from "../types";

export const CurrentUser = createParamDecorator(
	(data, ctx: ExecutionContext): types.CurrentUser => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
