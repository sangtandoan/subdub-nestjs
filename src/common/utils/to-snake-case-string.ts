import * as changeCase from "change-case";

export function toSnakeCaseString(str: string): string {
	return changeCase.snakeCase(str);
}
