import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { MailProviderController } from './mail-provider.controller';
import { MailProviderService } from './mail-provider.service';

@Module({
  controllers: [MailProviderController],
  providers: [MailProviderService, Logger],
  imports: [PrismaModule],
  exports: [MailProviderService],
})
export class MailProviderModule {}
