import { Logger, Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, Logger],
  imports: [PrismaModule],
  exports: [CustomerService],
})
export class CustomerModule { }
