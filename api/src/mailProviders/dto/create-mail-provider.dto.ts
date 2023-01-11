import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMailProviderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of a mail provider',
    example: 'gmail',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'host name of a mail provider',
    example: 'smtp.gmail.com',
  })
  host: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'port number of a mail provider',
    example: '465',
  })
  port: number;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Whether to use secure protocol or not.',
    example: 'true',
    type: Boolean,
  })
  secure: boolean;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'mail provider username',
    example: 'alice@gmail.com',
  })
  username: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'mail provider password',
    example: 'password#123',
  })
  password: string;
  @IsNumber()
  @ApiProperty({
    description: 'Search index for ordering',
    example: '0',
  })
  searchIndex: number;
}
