import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "@/categories/categories.service";
import { CreateCategoryDto } from "@/categories/dto/create-category.dto";
import { Category } from "@/categories/entities/category.entity";
import { toDto } from "@/common/utils";

@Controller("categories")
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
		console.log(createCategoryDto.userID);
		return await this.categoriesService.create(createCategoryDto);
	}

	@Get()
	async findAll() {
		const categories = await this.categoriesService.findAll();
		return toDto(categories, Category);
	}
}
