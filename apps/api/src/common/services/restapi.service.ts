import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const statusCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 204,
};

type OperationType = keyof typeof statusCodes;

@Injectable()
export class RestApiService {
  protected async handleOperation<T>(operationType: OperationType, operation: () => Promise<T>): Promise<{ statusCode: number; message: string; data?: T }> {
    try {
      const result = await operation();
      return this.successResponse(result, operationType) as any;
    } catch (error) {
      console.log('Prisma error', error);
      throw this.handlePrismaError(error);
    }
  }

  protected successResponse<T>(data: T, operationType: OperationType) {
    return { statusCode: statusCodes[operationType] || 200, message: "success", data };
  }

  private handlePrismaError(error: unknown): Error {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2003': // Foreign key constraint error
          console.log('Foreign key constraint error', error);
          return new HttpException({
            message: 'Foreign key constraint error',
            errorCode: 'FOREIGN_KEY_CONSTRAINT_ERROR',
            statusCode: HttpStatus.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST);

        case 'P2002': { // Unique constraint error
          const target = error.meta?.target as string[];
          const field = target.length ? target.join('_') : 'Unknown';
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