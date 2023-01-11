import { ApiProperty } from '@nestjs/swagger';
import { MailProvider } from '@prisma/client';
import { MutableEntity } from 'src/common/entities/mutable.entity';

export class MailProviderEntity extends MutableEntity implements MailProvider {
  @ApiProperty({ description: 'Name of a mail provider', example: 'gmail' })
  name: string;
  @ApiProperty({
    description: 'host name of a mail provider',
    example: 'smtp.gmail.com',
  })
  host: string;
  @ApiProperty({
    description: 'port number of a mail provider',
    example: '465',
  })
  port: number;
  @ApiProperty({
    description: 'Whether to use secure protocol or not.',
    example: 'true',
    type: Boolean,
  })
  secure: boolean;
  @ApiProperty({
    description: 'mail provider username',
    example: 'alice@gmail.com',
  })
  username: string;
  @ApiProperty({
    description: 'mail provider password',
    example: 'password#123',
  })
  password: string;

  @ApiProperty({
    description: 'index for ordering',
    example: '1',
  })
  searchIndex: number;

  constructor(partial: Partial<MailProviderEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
