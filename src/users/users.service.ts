import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {

    }

    async findAll() {

        return await this.usersRepository.find();
    }
    async findUserByEmail(email: string) {
        return await this.usersRepository.findOne({ where: { email: email } });
    }
    async create(data: CreateUserDto) {
        const user = await this.usersRepository.create(data);
        this.usersRepository.save(user);
        return user;
    }
    findUserById(id: number) {
        return {
            id,
            name: 'ali',
            username: 'ali123',
        };
    }
    findUserByUserName(username: number) {
        return {
            id: 1,
            name: 'ali',
            username: 'ali123',
        };
    }
}
