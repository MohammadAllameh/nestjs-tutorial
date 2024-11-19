import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import CodesEntity from 'src/entities/codes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, CodesEntity]),
        JwtModule.register({
            secret: 'sdfsdWI@$U828429834JDLAF&!!*#$(!)#%&!#$^^!@#*!(#R&!*(#$*&(!#*$&(*',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
