import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Subject } from "@repo/shared";

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  // @Length(2, 50)
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Contact number is required' })
  @IsString()
  @IsPhoneNumber('SG', { message: 'Invalid Singapore phone number' })
  contactNumber: string;

  @IsNotEmpty({ message: 'Subject is required' })
  @IsString()
  @IsEnum(Subject)
  subject: Subject;
}
