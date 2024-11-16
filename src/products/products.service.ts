import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductsEntity from 'src/entities/products.entity';
import userGuard from 'src/users/dto/userGuard.dto';

// add comment 
// add comment 2

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private product_repository: Repository<ProductsEntity>
    ) { }
    async create(createProductDto: CreateProductDto) {
        const new_product = await this.product_repository.save(createProductDto);
        return new_product;
    }

    async findAll() {
        return await this.product_repository.find(
            //     {
            //     relations: {
            //         user: true
            //     }
            // }
        );
    }

    async findOne(id: number) {
        const product = await this.product_repository.findOne(
            {
                relations: {
                    user: true
                },
                where: { id: id }
            }
        )
        if (!product) throw new HttpException("Product not Found", 404);
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const chack = await this.product_repository.update({ id: id, user: updateProductDto.user }, { ...updateProductDto })
        if (chack.affected === 0) throw new HttpException("Product not Found", 404);
        return chack;
    }

    async remove(id: number, user: userGuard) {
        const chack = await this.product_repository
            .createQueryBuilder('products')
            .leftJoinAndSelect('products.user', 'users')
            .where('products.id = :id', { id })
            .andWhere('products.user = :user', { user: user.id })
            .getOne();
        console.log(chack);
        if (!chack) throw new HttpException("Product not Found", 404);
        await this.product_repository.remove(chack);
        return {}
    }
}
