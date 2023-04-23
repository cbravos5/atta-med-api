import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchPatientDto } from './dto/search-patient.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() request: CreatePatientDto) {
    return this.patientsService.create(request);
  }

  @Get()
  @ApiQuery({ name: 'searchText', type: 'string' })
  search(@Query() request: SearchPatientDto) {
    return this.patientsService.search(request);
  }
}
