import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorService {
  handlePrismaError(error: unknown): never {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': { // 唯一约束错误
          const target = error.meta?.target as string[];
          throw new HttpException({
            message: `${target?.[0]} already exists`,
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
          }, HttpStatus.CONFLICT);
        }

        case 'P2025': // 记录不存在
          throw new HttpException({
            message: 'Record not found',
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          }, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException({
            message: 'Database error occurred',
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST);
      }
    }

    if (error instanceof Error) {
      throw new HttpException({
        message: error.message,
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw error;
  }
} 