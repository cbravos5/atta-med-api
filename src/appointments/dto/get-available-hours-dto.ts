import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsUUID } from "class-validator";

export class GetAvailableHoursDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(d => Date)
  when: Date;

  @ApiProperty()
  @IsUUID()
  medicId: string;    
}