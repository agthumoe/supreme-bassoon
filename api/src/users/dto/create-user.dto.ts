import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Unique email of a user',
    example: 'alice@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password to be hashed',
    example: 'password',
    minLength: 6,
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Name of a user',
    example: 'alice',
  })
  name?: string;
}
