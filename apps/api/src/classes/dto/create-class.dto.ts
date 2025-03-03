import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";
import { Level } from "@repo/shared/src/types";

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNumber()
  @IsNotEmpty()
  formTeacherId: number;
}
