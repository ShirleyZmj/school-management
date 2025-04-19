import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { Subject } from '@repo/shared';

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachersService],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a teacher', async () => {
    const { data: teacher } = await service.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: Subject.ENGLISH,
      contactNumber: '91192020',
    });

    expect(teacher).toBeDefined();
    expect(teacher?.name).toBe('John Doe');
    expect(teacher?.email).toBe('john.doe@example.com');
    expect(teacher?.subject).toBe(Subject.ENGLISH);
    expect(teacher?.contactNumber).toBe('91192020');
  });
}); 