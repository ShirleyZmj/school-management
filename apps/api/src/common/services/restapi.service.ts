import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RestApiService {
  protected async handleOperation<T>(operation: () => Promise<T>): Promise<{ statusCode: number; message: string; data?: T }> {
    try {
      const result = await operation();
      return this.successResponse(result);
    } catch (error) {
      throw this.handlePrismaError(error);
    }
  }

  protected successResponse<T>(data: T) {
    return { statusCode: 200, message: "success", data };
  }

  private handlePrismaError(error: unknown): Error {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': { // Unique constraint error
          const target = error.meta?.target as string[];
          const field = target?.[0] || 'Unknown';
          return new HttpException({
            message: `${field} already exists`,
            errorCode: `${field.toUpperCase()}_ALREADY_EXISTS`,
            statusCode: HttpStatus.CONFLICT,
          }, HttpStatus.CONFLICT);
        }

        case 'P2025': // Record not found
          return new HttpException({
            message: 'Record not found',
            errorCode: 'RECORD_NOT_FOUND',
            statusCode: HttpStatus.NOT_FOUND,
          }, HttpStatus.NOT_FOUND);

        default:
          return new HttpException({
            message: 'Database error occurred',
            errorCode: 'DATABASE_ERROR',
            statusCode: HttpStatus.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST);
      }
    }

    if (error instanceof Error) {
      return new HttpException({
        message: error.message || 'Internal Server Error',
        errorCode: 'INTERNAL_SERVER_ERROR',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return error as Error;
  }
} 