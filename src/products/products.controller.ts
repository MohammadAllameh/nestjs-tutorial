import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto)
    if (createProductDto.price >= 1000) {
      throw new Error('price must be less than 1000');
    }
    // return this.productsService.create(createProductDto);
    return { message: "ok", data: createProductDto }
  }

  @Get()
  //findAll(@Body createProductDto: CreateProductDto) {
  //findAll(@Query createProductDto: CreateProductDto) {
  //findAll(@Param('id') id:string) {

  findAll() {
    // return this.productsService.findAll();
    return []
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.productsService.findOne(+id);
    return { id }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.productsService.update(+id, updateProductDto);
    return { id }
  }
  @Put(':id')
  updateAllitem(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.productsService.update(+id, updateProductDto);
    return { id }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
    // return { id }
  }
}
