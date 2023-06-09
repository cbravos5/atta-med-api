import { Controller, Get, Post, Body, Query, UseGuards, HttpCode } from '@nestjs/common';
import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchPatientDto } from '../dto/search-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(200)
  create(@Body() request: CreatePatientDto) {
    return this.patientsService.create(request);
  }

  @Get()
  @ApiQuery({ name: 'searchText', type: 'string' })
  search(@Query() request: SearchPatientDto) {
    return this.patientsService.search(request);
  }
}
