import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Shelf } from './shelf.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column(type => Location)
  location: Location;

  @OneToMany(type => Shelf, shelf => shelf.warehouse)
  shelfs: Shelf[];
}
