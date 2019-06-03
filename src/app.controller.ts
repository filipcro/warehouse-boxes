import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shelf } from './shelf.entity';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Shelf)
    private readonly shelfRepository: Repository<Shelf>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  @Get()
  async getHello(): Promise<object> {
    const productCount = await this.productRepository.count();
    const warehouseCount = await this.warehouseRepository.count();
    const shelfCount = await this.shelfRepository.count();

    return {
      productCount,
      warehouseCount,
      shelfCount,
    };
  }
}
