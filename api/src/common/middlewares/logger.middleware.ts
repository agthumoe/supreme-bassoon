import { Request, Response, NextFunction } from 'express';
import {
  Inject,
  Injectable,
  NestMiddleware,
  Logger,
  LoggerService,
} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.getHeader('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        LoggerMiddleware.name,
      );
    });

    next();
  }
}
