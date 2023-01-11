import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { MutableEntity } from 'src/common/entities/mutable.entity';

export class CustomerEntity extends MutableEntity implements Customer {
  @ApiProperty({
    description: 'Unique email of a customer',
  })
  email: string;

  @ApiProperty({ description: 'Full name of a customer', required: false, nullable: true })
  name: string | null;

  constructor(partial: Partial<CustomerEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}