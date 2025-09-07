import { Expose } from "class-transformer";

export class Category {
	id: string;
	@Expose({ name: "user_id" })
	userID: string;
	name: string;
	description: string | null;
	color: string | null;
	@Expose({ name: "created_at" })
	createdAt: Date;
	@Expose({ name: "updated_at" })
	updatedAt: Date;
}
