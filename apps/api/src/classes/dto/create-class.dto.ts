import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  formTeacherId: number;
}
