import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse() as Record<string, any>;

      // Format the response
      const errorResponse = {
        statusCode: status,
        errorCode: res['errorCode'] || 'VALIDATION_ERROR',
        message: res['message'] || exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      response.status(status).json(errorResponse);
    } else {
      // Handle unknown exceptions
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        errorCode: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
