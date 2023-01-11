import { ApiProperty } from '@nestjs/swagger';
import { Mail } from '@prisma/client';
import { ImmutableEntity } from 'src/common/entities/immutable.entity';

export class MailEntity extends ImmutableEntity implements Mail {
  @ApiProperty({
    description: 'Unique mail Uuid',
  })
  mailUuid: string;
  @ApiProperty({
    description: 'Number of retried count',
  })
  retriedCount: number;
  @ApiProperty({
    description: 'Sender name',
  })
  fromName: string;
  @ApiProperty({
    description: 'Sender email',
  })
  fromEmail: string;
  @ApiProperty({
    description: 'Receiver name',
  })
  toName: string;
  @ApiProperty({
    description: 'Receiver email',
  })
  toEmail: string;
  @ApiProperty({
    description: 'Subject of the mail',
  })
  subject: string;
  @ApiProperty({
    description: 'Mail contents',
  })
  body: string;
}
