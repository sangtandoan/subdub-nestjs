import { ClassConstructor, instanceToPlain, plainToInstance } from "class-transformer";

export function toDto<T, V>(entity: T, dtoClass: ClassConstructor<V>) {
	if (Array.isArray(entity)) {
		return entity.map((item) => toDto(item, dtoClass));
	} else {
		const dto = Object.create(dtoClass.prototype);
		Object.assign(dto, entity);
		return instanceToPlain(dto);
	}
}
