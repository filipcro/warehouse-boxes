import { Controller, Get, Post, Body, Delete, Param, Patch, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from './warehouse.entity';
import { Shelf } from './shelf.entity';

@Controller('warehouses')
export class WarehouseController {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Shelf)
    private readonly shelfRepository: Repository<Shelf>,
  ) {}

  @Get()
  findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new NotFoundException();
    }
    return warehouse;
  }

  @Post()
  create(@Body() warehouse: Warehouse): Promise<Warehouse> {
    return this.warehouseRepository.save(warehouse);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.warehouseRepository.delete(id);
  }

  @Patch(':id')
  async replace(@Param('id') id: number, @Body() warehouse: Warehouse): Promise<Warehouse> {
    await this.warehouseRepository.update(id, warehouse);
    return this.warehouseRepository.findOne(id);
  }

}
