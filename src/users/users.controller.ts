import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/helpers/multer.config';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async findAllUser() {
        return await this.usersService.findAll();
    }
    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar', multerOptions))
    async uploadAvatar(@UploadedFile() file) {
        console.log(file);
        return {};
    }
}
