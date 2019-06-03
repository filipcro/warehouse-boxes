import { Controller, Get, Post, Body, Delete, Param, Patch, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from './warehouse.entity';
import { Shelf } from './shelf.entity';

@Controller('warehouses/:warehousesId/shelfs')
export class ShelfController {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Shelf)
    private readonly shelfRepository: Repository<Shelf>,
  ) {}

  @Get()
  async findAll(@Param('warehousesId') id: number): Promise<Shelf[]> {
    try {
      const { shelfs } = await this.warehouseRepository.findOneOrFail(id, { relations: ['shelfs'] });
      return shelfs;
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Shelf> {
    try {
      const shelf = await this.shelfRepository.findOneOrFail(id);
      return shelf;
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  @Post()
  async create(@Param('warehousesId') id: number, @Body() shelf: Shelf): Promise<Shelf> {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new NotFoundException();
    }

    shelf.warehouse = warehouse;
    return this.shelfRepository.save(shelf);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.shelfRepository.delete(id);
  }

}
