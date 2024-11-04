import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity])
  ],
  exports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
