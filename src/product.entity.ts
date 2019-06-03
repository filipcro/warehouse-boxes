import { PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import { ProductShelf } from './product-shelf.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
@Unique(['code'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column()
  code: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @OneToMany(type => ProductShelf, productShelf => productShelf.product)
  shelfs: ProductShelf[];
}
