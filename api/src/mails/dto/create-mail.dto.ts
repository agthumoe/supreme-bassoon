import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateMailDto {
  @ApiProperty({
    description: 'Receiver name',
    example: 'Bob',
  })
  @IsString()
  toName: string;
  @ApiProperty({
    description: 'Receiver email',
    example: 'bob@gmail.com',
  })
  @IsEmail()
  @IsString()
  toEmail: string;
  @ApiProperty({
    description: 'Subject of the mail',
    example: 'Sample email',
  })
  @IsString()
  subject: string;
  @ApiProperty({
    description: 'Mail contents',
    example: 'Sample mail contents',
  })
  @IsString()
  body: string;
}
