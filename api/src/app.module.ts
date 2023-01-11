import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { HealthModule } from './health/health.module';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './users/user.module';
import { CustomerModule } from './customers/customer.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    CustomerModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
