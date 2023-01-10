import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable cors to allow resources to be requested from another domain.
   * 
   * Read: https://docs.nestjs.com/security/cors#cors
   */
  app.enableCors();

  /**
   * To protect against various well-known web vulnerabilities.
   * 
   * Read: https://docs.nestjs.com/security/helmet#helmet
   */
  app.use(helmet());
  /**
   * Setup global pipes.
   *
   * Read: https://docs.nestjs.com/pipes#global-scoped-pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * If set to true, validator will strip validated (returned) object of any
       * properties that do not use any validation decorators.
       *
       * Read: https://docs.nestjs.com/techniques/validation#stripping-properties
       */
      whitelist: true,
      /**
       * If set to true, instead of stripping non-whitelisted properties
       * validator will throw an exception.
       */
      forbidNonWhitelisted: true,
      /**
       * Automatically transform payloads to be objects typed according to their DTO classes.
       *
       * Read: https://docs.nestjs.com/techniques/validation#transform-payload-objects
       */
      transform: true,
    }),
  );

  /** 
   * Initialize Swagger using `SwaggerModule` class
   * 
   * Read: https://docs.nestjs.com/openapi/introduction
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Supreme Bassoon API')
    .setDescription('Core API engine for code test')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(8000);
}
bootstrap();
