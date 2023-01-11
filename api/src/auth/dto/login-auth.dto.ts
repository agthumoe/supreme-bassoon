import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class LoginAuthDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'Unique username',
    minLength: 5,
    example: 'admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password to be hashed',
    minLength: 6,
  })
  password: string;
}
