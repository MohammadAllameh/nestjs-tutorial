import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register';
import { LoginAuthDto } from './dto/login';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import CodesEntity from 'src/entities/codes.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

const saltOrRounds = 10;

// in register
// whats your gard?
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(CodesEntity)
        private readonly codesRepository: Repository<CodesEntity>,
        private readonly mailerService: MailerService,
    ) {}
    async register(registerAuthDto: RegisterAuthDto) {
        // const user = await this.usersService.findUserByEmail(
        //     registerAuthDto.email,
        // );
        // if (user) {
        //     console.log(user);
        //     throw new HttpException('User already exists', 400);
        // }
        // // registerAuthDto.password = await bycrypt.hash(registerAuthDto.password, 10)
        // registerAuthDto.password = await bcrypt.hash(
        //     registerAuthDto.password,
        //     saltOrRounds,
        // );
        setImmediate(async () => {
            await this.mailerService.sendMail({
                template: 'welcome.html',
                text: 'hello',
                subject: 'Welcome',
                to: registerAuthDto.email,
                // attachments: [
                //     {
                //         filename: 'logo.png',
                //         path: 'https://yourwebsite.com/logo.png',
                //         cid: 'logo'
                //     }
                // ]
                // context: {
                //     name: registerAuthDto.firstname,
                //     family: registerAuthDto.lastname
                // }
            });
        });
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err));
        return { message: 'good' };
        // return await this.usersService.create(registerAuthDto);
    }
    // add localain
    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.usersService.findUserByEmail(
            loginAuthDto.email,
        );
        // const isPasswordMatch = await bcrypt.compare(
        //     loginAuthDto.password,
        //     user.password,
        // );
        // if (!isPasswordMatch) {
        //     throw new HttpException('Wrong Password', 400);
        // }
        if (!user) {
            throw new HttpException('User not found', 400);
        }
        const currentTime = new Date();

        if (loginAuthDto.code) {
            const codeCheck = await this.codesRepository.findOne({
                where: {
                    code: loginAuthDto.code,
                    email: loginAuthDto.email,
                    is_used: false,
                },
            });

            if (codeCheck) {
                const timeDiff =
                    (currentTime.getTime() -
                        new Date(codeCheck.created_at).getTime()) /
                    1000; // به ثانیه تبدیل کردن
                if (timeDiff > 120) {
                    throw new HttpException('Code expired', 400);
                }
                await this.codesRepository.update(
                    { id: codeCheck.id },
                    { is_used: true },
                );
                const accessToken = this.jwtService.sign({
                    sub: user.id,
                    email: user.email,
                });
                return {
                    access_token: accessToken,
                };
            } else {
                throw new HttpException('Code is not valid', 400);
            }
        } else {
            const existingCode = await this.codesRepository.findOne({
                where: { email: loginAuthDto.email, is_used: false },
                order: { created_at: 'DESC' },
            });

            if (existingCode) {
                const timeDiff =
                    (currentTime.getTime() -
                        new Date(existingCode.created_at).getTime()) /
                    1000; // به ثانیه تبدیل کردن
                if (timeDiff < 120) {
                    throw new HttpException(
                        'Please wait before requesting a new code',
                        400,
                    );
                }
            }

            const otp = await this.generateOTPCode();
            await this.codesRepository.save({
                code: otp,
                email: loginAuthDto.email,
            });
            // add function to send email

            return { code: otp };
        }
    }
    async generateOTPCode() {
        // generate 5 digit code that is not exits in database
        let code: number = null;
        while (!code) {
            const fiveDigitCode = await this.getRandomCode();
            const checkCode = await this.codesRepository.findOne({
                where: { code: fiveDigitCode },
            });
            if (!checkCode) {
                code = fiveDigitCode;
                break;
            }
        }
        return code;
    }
    async getRandomCode() {
        const min = 10000;
        const max = 99999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        return otp;
    }
}
