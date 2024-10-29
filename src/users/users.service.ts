import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll() {
        return [
            { name: 'ali', username: 'ali123' },
        ]
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
