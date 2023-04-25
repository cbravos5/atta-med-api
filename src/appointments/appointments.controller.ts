import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetApppointmentsDto } from './dto/get-appointments.dto';
import { GetAvailableHoursDto } from './dto/get-available-hours-dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

  @Get('available')
  getAvailable(@Query() request: GetAvailableHoursDto) {
    return this.appointmentsService.getAvailableHours(request);
  }
}
