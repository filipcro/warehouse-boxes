import { Controller, Get, Post, Body, Delete, Param, NotFoundException, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shelf } from './shelf.entity';
import { ProductShelf } from './product-shelf.entity';
import { Product } from './product.entity';

@Controller('warehouses/:warehousesId/shelfs/:shelfId/products')
export class ProductShelfController {
  constructor(
    @InjectRepository(Shelf)
    private readonly shelfRepository: Repository<Shelf>,
    @InjectRepository(ProductShelf)
    private readonly productShelfRepository: Repository<ProductShelf>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  @Get()
  async findAll(@Param('shelfId') id: number): Promise<ProductShelf[]> {
    try {
      const { products } = await this.shelfRepository
        .findOneOrFail(id, { relations: ['products', 'products.product'] });
      return products;
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Get(':productId')
  async find(
    @Param('productId') productId: number,
    @Param('shelfId') shelfId: number,
  ): Promise<ProductShelf> {
    try {
      const shelf = await this.shelfRepository.findOneOrFail(shelfId);
      const product = await this.productRepository.findOneOrFail(productId);
      const productShelf = await this.productShelfRepository.findOneOrFail({ product, shelf });
      return productShelf;
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Patch(':productId')
  async update(
    @Param('productId') productId: number,
    @Param('shelfId') shelfId: number,
    @Body('count') count: number,
  ): Promise<ProductShelf> {
      try {
        const shelf = await this.shelfRepository.findOneOrFail(shelfId);
        const product = await this.productRepository.findOneOrFail(productId);
        const productShelf = await this.productShelfRepository.findOneOrFail({ product, shelf });
        productShelf.count = count;
        return this.productShelfRepository.save(productShelf);
      } catch (ex) {
        throw new NotFoundException();
      }
    }

  @Post()
  async create(
    @Body('productId') productId: number,
    @Body('count') count: number,
    @Param('shelfId') shelfId: number,
  ): Promise<ProductShelf> {
    try {
      const shelf = await this.shelfRepository.findOneOrFail(shelfId);
      const product = await this.productRepository.findOneOrFail(productId);
      return this.productShelfRepository.save({ product, shelf, count });
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Delete(':productId')
  async delete(
    @Param('productId') productId: number,
    @Param('shelfId') shelfId: number,
  ) {
    try {
      const shelf = await this.shelfRepository.findOneOrFail(shelfId);
      const product = await this.productRepository.findOneOrFail(productId);
      const productShelf = await this.productShelfRepository.findOneOrFail({ product, shelf });
      this.productShelfRepository.delete(productShelf);
    } catch (ex) {
      throw new NotFoundException();
    }
  }
}
