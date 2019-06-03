import { Entity, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export class Location {
  @ApiModelProperty()
  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitude: number;

  @ApiModelProperty()
  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  longitude: number;
}
