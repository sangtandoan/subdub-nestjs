import { toSnakeCaseString } from "@/common/utils/to-snake-case-string";

// Your Date data is disappearing because the recursive toSnakeCase function you are using is designed to iterate over the keys of generic objects.
// A Date object, while technically an object, has no enumerable properties, so when the function tries to iterate over it,
// it finds nothing and returns an empty object, effectively making your data "disappear."
// To fix this, you need to add a specific check for the Date object inside your function.

// The toSnakeCaseObject function should return the Date object as is, preventing it from being incorrectly processed.
export function toSnakeCaseObject(obj: unknown) {
	if (obj == null || typeof obj !== "object" || obj instanceof Date) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => toSnakeCaseObject(item));
	}

	const newObj = {};
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const newKey = toSnakeCaseString(key);
			const value = obj[key];

			newObj[newKey] = toSnakeCaseObject(value);
		}
	}

	return newObj;
}
