import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './warehouse.entity';
import { Shelf } from './shelf.entity';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ShelfController } from './shelf.controller';
import { ProductShelf } from './product-shelf.entity';
import { ProductShelfController } from './product-shelf.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/data.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([
      Warehouse,
      Shelf,
      Product,
      ProductShelf,
    ]),
  ],
  controllers: [
    AppController,
    WarehouseController,
    ProductController,
    ShelfController,
    ProductShelfController,
  ],
})
export class AppModule {}
