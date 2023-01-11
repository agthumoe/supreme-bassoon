import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unknown issue in server side';
    if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'The requested data not found';
    } else if (exception.code === 'P2002') {
      status = HttpStatus.BAD_REQUEST;
      message =
        'Duplicated entries, there is an existing data with your inputs.';
    } else if (exception.code === 'P2011') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Null constraint violation';
    }
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
    });
  }
}
