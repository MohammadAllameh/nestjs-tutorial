import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {

    }

    async findAll() {

        return await this.usersRepository.find();
    }
    async create() {
        const user = await this.usersRepository.create({
            age: 14,
            email: 'mYxJ7s@example.com',
            firstname: 'ali',
            lastname: 'allameh',
            password: 'skljjfl;kjsdfk'
        });
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
