import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    });
  }
}
