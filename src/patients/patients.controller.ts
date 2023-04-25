import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchPatientDto } from './dto/search-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Patients')
@ApiBearerAuth()
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
