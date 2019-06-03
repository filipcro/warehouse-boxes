import { Controller, Get, Param, Post, Patch, Body, NotFoundException, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductShelf } from './product-shelf.entity';

@Controller('products')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  @Get(':id/shelfs')
  async findShelfs(@Param('id') id: number): Promise<ProductShelf[]> {
    try {
      const { shelfs } = await this.productRepository
        .findOne(id, {relations: ['shelfs', 'shelfs.shelf']});
      return shelfs;
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  @Patch(':id')
  async replace(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.productRepository.delete(id);
  }
}
