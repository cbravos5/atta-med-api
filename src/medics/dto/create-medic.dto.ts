import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMedicDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  crm: string;
  
  @ApiProperty()
  @IsNotEmpty()
  specialty: string
}