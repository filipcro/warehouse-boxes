import { PrimaryGeneratedColumn, Column, Unique, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { ProductShelf } from './product-shelf.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
@Unique(['code'])
export class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column()
  code: string;

  @ManyToOne(type => Warehouse, warehouse => warehouse.shelfs)
  warehouse: Warehouse;

  @OneToMany(type => ProductShelf, productShelf => productShelf.shelf)
  products: ProductShelf[];
}
