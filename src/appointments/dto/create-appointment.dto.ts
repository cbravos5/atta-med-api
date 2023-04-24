import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  when: Date;  

  @ApiProperty()
  @IsUUID()
  patientId: string;

  @ApiProperty()
  @IsUUID()
  medicId: string;     
}
