import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Put,
    UseGuards,
    Request,
    HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import userGuard from 'src/users/dto/userGuard.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { ProductForBiddenRespnonse } from './dto/forbidden.dto';
@ApiTags('products')
@Controller('products')
@ApiBearerAuth('access-token')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({
        status: 403,
        description: 'Forbidden',
        type: ProductForBiddenRespnonse,
    })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({
        status: 200,
        description: 'Created',
        type: CreateProductDto,
    })
    @ApiHeader({ name: 'Lang', required: true, description: 'send preffed ' })
    create(@Body() createProductDto: CreateProductDto, @Request() req) {
        const user: userGuard = req.user;
        createProductDto.user = user;
        // return this.productsService.create(createProductDto);
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(@I18n() i18n: I18nContext) {
        throw new HttpException(
            i18n.t('tr.item_not_found', { args: { item: 'username' } }),
            400,
        );
        // return { message: i18n.t('tr.hello') }
        // return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'send preffed ',
    })
    update(
        @Param('id') id: number,
        @Body() updateProductDto: UpdateProductDto,
        @Request() req,
    ) {
        const user: userGuard = req.user;
        updateProductDto.user = user;
        // return this.productsService.update(+id, updateProductDto);
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number, @Request() req) {
        const user: userGuard = req.user;

        return this.productsService.remove(id, user);
    }
}
