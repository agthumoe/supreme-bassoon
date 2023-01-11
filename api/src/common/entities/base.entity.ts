import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({
    description: 'Serial autoincrement interger',
  })
  id: number;

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }
}