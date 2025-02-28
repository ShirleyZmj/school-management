import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ValidationError {
  property: string;
  constraints: Record<string, string>;
  children?: ValidationError[];
}

interface HttpExceptionResponse {
  message: ValidationError[];
  error: string;
  statusCode: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'Validation failed',
      errors: this.formatErrors(exception),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private formatErrors(exception: unknown) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as HttpExceptionResponse;
      console.log('Validation Error Response:', JSON.stringify(response, null, 2));

      console.log("response", response);

      if (Array.isArray(response.message)) {
        return response.message
          .filter(error => error.constraints) // 只处理有 constraints 的错误
          .map(error => {
            const [type, message] = Object.entries(error.constraints)[0];
            return {
              field: error.property,
              type,
              message,
            };
          });
      }
    }
    return [{ message: 'Internal server error' }];
  }
} 