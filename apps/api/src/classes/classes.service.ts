import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { RestApiService } from 'src/common/services/restapi.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClassesService extends RestApiService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  create(createClassDto: CreateClassDto) {
    return this.handleOperation(() => this.prisma.classes.create({
      data: createClassDto
    }));
  }

  async findAll() {
    return this.handleOperation(() => this.prisma.classes.findMany({
      select: {
        id: true,
        name: true,
        level: true,
        formTeacher: {
          select: {
            id: true,
            name: true,
            email: true,
            contactNumber: true,
          },
        },
      },
    }));
  }

  async findOne(id: number) {
    return this.handleOperation(() => this.prisma.classes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        level: true,
        formTeacher: {
          select: {
            id: true,
            name: true,
            email: true,
            contactNumber: true,
          },
        },
      },
    }));
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    console.log(updateClassDto);
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
