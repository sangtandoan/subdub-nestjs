import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { DrizzleQueryError } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DatabaseError } from "pg";
import { CreateCategoryDto } from "@/categories/dto/create-category.dto";
import { Category } from "@/categories/entities/category.entity";
import { handleUniqueKeyError } from "@/common/utils/exceptions/handle-unique-key";
import { DATABASE_CONNECTION } from "@/database/database.module";
import * as categoriesSchema from "./schemas/categories.schema";

@Injectable()
export class CategoriesService {
	constructor(
		@Inject(DATABASE_CONNECTION)
		private readonly categoriesRepo: NodePgDatabase<typeof categoriesSchema>,
	) {}

	async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
		try {
			const [category] = await this.categoriesRepo
				.insert(categoriesSchema.categories)
				.values({
					name: createCategoryDto.name,
					description: createCategoryDto.description,
					userID: createCategoryDto.userID,
				})
				.returning();

			return category;
		} catch (error) {
			throw handleUniqueKeyError(error, "Category with this name already exists.");
		}
	}

	async findAll(): Promise<Category[]> {
		return await this.categoriesRepo.query.categories.findMany();
	}
}
