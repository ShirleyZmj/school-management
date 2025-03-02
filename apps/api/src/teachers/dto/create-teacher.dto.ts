import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  contactNumber: string;

  @IsNotEmpty({ message: 'Subject is required' })
  @IsString()
  subject: string;
}
