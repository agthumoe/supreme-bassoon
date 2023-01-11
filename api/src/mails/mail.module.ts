import { Logger, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProcessor } from './mail.processor';
import { BullModule } from '@nestjs/bull';
import { queues } from 'src/common/constants/queue.constant';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [MailController],
  providers: [MailService, MailProcessor, Logger],
  imports: [
    PrismaModule,
    BullModule.registerQueueAsync({
      name: queues.mail,
    }),
  ],
  exports: [MailService, MailProcessor]
})
export class MailModule { }
