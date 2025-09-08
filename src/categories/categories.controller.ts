import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CategoriesService } from "@/categories/categories.service";
import { CreateCategoryDto } from "@/categories/dto/create-category.dto";
import { UpdateCategoryDto } from "@/categories/dto/update-category.dto";
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

	@Get(":id")
	async findOne(@Param("id", ParseUUIDPipe) id: string) {
		return toDto(await this.categoriesService.findOne(id), Category);
	}

	@Patch(":id")
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return await this.categoriesService.update(id, updateCategoryDto);
	}
}
