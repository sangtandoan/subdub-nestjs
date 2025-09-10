import { Subscription } from "@/subscriptions/entities/subscription.entity";

export class User {
	id: string;
	email: string;
	password: string | null;
	roles?: Role[];
	permissions?: Permission[];
	subscriptions?: Subscription[];
	createdAt: Date;
	updatedAt: Date;
}

export class Role {
	id: string;
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Permission {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}
