import { BillingCycle, SubscriptionStatus } from "../types";

export class Subscription {
	id: string;
	userId: string;
	name: string;
	description: string | null;
	cost: number;
	currency: string;
	billingCycle: BillingCycle;
	startDate: Date;
	endDate: Date | null;
	status: SubscriptionStatus;
	categoryId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
