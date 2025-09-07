import { Module } from "@nestjs/common";
import { CategoriesController } from "@/categories/categories.controller";
import { CategoriesService } from "@/categories/categories.service";
import { DatabaseModule } from "@/database/database.module";

@Module({
	imports: [DatabaseModule],
	providers: [CategoriesService],
	controllers: [CategoriesController],
})
export class CategoriesModule {}
