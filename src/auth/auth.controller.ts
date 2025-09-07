import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { LocalAuthGuard } from "src/auth/guards/local.guard";
import { LoginDto } from "@/auth/dto/login.dto";
import { GoogleAuthGuard } from "@/auth/guards/google.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import * as types from "@/common/types";
import { toDto } from "@/common/utils";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UserDto } from "@/users/dto/user.dto";
import { UsersService } from "@/users/users.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	@Post("login")
	@UseGuards(LocalAuthGuard)
	async handleLogin(@CurrentUser() user: types.CurrentUser): Promise<LoginDto> {
		const payload = { email: user.email };
		const accessToken = await this.jwtService.signAsync(payload);

		return {
			accessToken,
		};
	}

	@Post("register")
	async handleRegister(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersService.create(createUserDto);
		return toDto(user, UserDto);
	}

	@Get("google")
	@UseGuards(GoogleAuthGuard)
	handleGoogleLogin() {}

	@Get("google/callback")
	@UseGuards(GoogleAuthGuard)
	handleGoogleCallback(@Request() req) {
		return req.user;
	}
}
