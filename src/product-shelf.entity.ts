import { PrimaryGeneratedColumn, Column, Unique, ManyToOne, Entity } from 'typeorm';
import { Shelf } from './shelf.entity';
import { Product } from './product.entity';

@Entity()
@Unique(['shelf', 'product'])
export class ProductShelf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @ManyToOne(type => Shelf, shelf => shelf.products)
  shelf: Shelf;

  @ManyToOne(type => Product, product => product.shelfs)
  product: Product;
}
