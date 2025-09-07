export class OAuthAccount {
	id: string;
	userId: string;
	provider: string; // e.g., 'google', 'github'
	providerId: string;
	accessToken: string | null;
	refreshToken: string | null;
	tokenExpiresAt: Date | null;
	scope: string | null;
	createdAt: Date;
	updatedAt: Date;
}
