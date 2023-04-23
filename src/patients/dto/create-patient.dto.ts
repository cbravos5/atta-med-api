import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class CreatePatientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  gender: Gender;
}
