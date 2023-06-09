import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { GetApppointmentsDto } from '../dto/get-appointments.dto';
import { GetAvailableHoursDto } from '../dto/get-available-hours-dto';
import { AppointmentsService } from '../services/appointments.service';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @HttpCode(200)
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

  @Get('available')
  getAvailable(@Query() request: GetAvailableHoursDto) {
    return this.appointmentsService.getAvailableHours(request);
  }
}
