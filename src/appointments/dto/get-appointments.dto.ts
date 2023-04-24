import { Type } from "class-transformer";

export class GetApppointmentsDto {
  @Type(() => Date)
  when?: Date;
}