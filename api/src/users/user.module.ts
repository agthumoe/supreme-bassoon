import { Logger, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, Logger],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UsersModule { }
