import { ApiProperty } from '@nestjs/swagger';
import { ImmutableEntity } from './immutable.entity';

export class MutableEntity extends ImmutableEntity {
  @ApiProperty({
    description: 'User uid who last updated',
    required: false,
    nullable: true,
  })
  updatedBy: string | null;
  @ApiProperty({
    description: 'Updated datetime stamptz',
    required: false,
    nullable: true,
  })
  updatedAt: Date;

  constructor(partial: Partial<MutableEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}