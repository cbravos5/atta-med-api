import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetApppointmentsDto } from './dto/get-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiQuery({ name: 'when' })
  findByDate(@Query() request: GetApppointmentsDto) {
    return this.appointmentsService.findByDate(request.when);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.cancel(id)
  }
}
