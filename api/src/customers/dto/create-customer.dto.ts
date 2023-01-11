import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Unique email of a customer',
    example: 'alice@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Name of a customer',
    example: 'alice'
  })
  name?: string;
}