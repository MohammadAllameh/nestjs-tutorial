import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    password: string;
}
