import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register';
import { LoginAuthDto } from './dto/login';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

// in register
// whats your gard?
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async register(registerAuthDto: RegisterAuthDto) {
        const user = await this.usersService.findUserByEmail(
            registerAuthDto.email,
        );
        if (user) {
            throw new HttpException('User already exists', 400);
        }
        // registerAuthDto.password = await bycrypt.hash(registerAuthDto.password, 10)
        registerAuthDto.password = await bcrypt.hash(
            registerAuthDto.password,
            saltOrRounds,
        );
        return await this.usersService.create(registerAuthDto);
    }

    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.usersService.findUserByEmail(
            loginAuthDto.email,
        );
        if (!user) {
            throw new HttpException('User not found', 400);
        }
        const isPasswordMatch = await bcrypt.compare(
            loginAuthDto.password,
            user.password,
        );
        if (!isPasswordMatch) {
            throw new HttpException('Wrong Password', 400);
        }
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
        return {
            access_token: accessToken,
        };
    }
}
