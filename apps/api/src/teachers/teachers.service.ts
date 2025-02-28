import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) { }

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      return await this.prisma.teachers.create({
        data: createTeacherDto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = error.meta?.target as string[];
          if (target?.includes('email')) {
            throw new HttpException(
              'Email already exists',
              HttpStatus.CONFLICT
            );
          }
        }
        throw new HttpException(
          'Database error occurred',
          HttpStatus.BAD_REQUEST
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.teachers.findMany();
  }

  findOne(id: number) {
    return this.prisma.teachers.findUnique({
      where: { id }
    });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    console.log(updateTeacherDto);
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
