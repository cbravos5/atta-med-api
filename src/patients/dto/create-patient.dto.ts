import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { IsEnum, IsNotEmpty, Validate } from "class-validator";
import { IsCpf } from "../validators/IsCpf";

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  age: number;
  
  @ApiProperty()
  @Validate(IsCpf)
  cpf: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;
}
