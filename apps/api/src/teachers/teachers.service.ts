import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RestApiService } from 'src/common/services/restapi.service';

@Injectable()
export class TeachersService extends RestApiService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createTeacherDto: CreateTeacherDto) {
    return this.handleOperation(() => this.prisma.teachers.create({
      data: createTeacherDto
    }));
  }

  findAll() {
    return this.handleOperation(() => this.prisma.teachers.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        contact_number: true,
      }
    }));
  }

  findOne(id: number) {
    return this.handleOperation(() => this.prisma.teachers.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        contact_number: true,
      }
    }));
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    console.log(updateTeacherDto);
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
