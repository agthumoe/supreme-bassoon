import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { MutableEntity } from 'src/common/entities/mutable.entity';

export class UserEntity extends MutableEntity implements User {
  @ApiProperty({
    description: 'Unique email of a user',
  })
  email: string;

  @ApiProperty({
    description: 'Unique username of a user',
  })
  username: string;

  @Exclude()
  @ApiProperty({ description: 'Password to be hashed' })
  password: string;

  @ApiProperty({ description: 'Full name', required: false, nullable: true })
  name: string | null;

  constructor(partial: Partial<UserEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
