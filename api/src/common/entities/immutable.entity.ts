import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export class ImmutableEntity extends BaseEntity {
  @ApiProperty({
    description: 'User uid who created',
    required: false,
    nullable: true,
  })
  createdBy: string | null;
  @ApiProperty({
    description: 'Created datetime stamptz',
    required: false,
    nullable: true,
  })
  createdAt: Date;

  constructor(partial: Partial<ImmutableEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
