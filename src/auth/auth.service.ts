import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register';
import { LoginAuthDto } from './dto/login';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;


// in register
// whats your gard?
@Injectable()
export class AuthService {
  constructor(

    private readonly usersService: UsersService
  ) { }
  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.usersService.findUserByEmail(registerAuthDto.email);
    if (user) {
      console.log(user)
      throw new HttpException('User already exists', 400)
    }
    // registerAuthDto.password = await bycrypt.hash(registerAuthDto.password, 10)
    registerAuthDto.password = await bcrypt.hash(registerAuthDto.password, saltOrRounds);
    return await this.usersService.create(registerAuthDto)
  }
  login(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }
}
