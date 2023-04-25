import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateMedicDto } from './dto/create-medic.dto';
import { SearchMedicDto } from './dto/search-medic.dto';
import { MedicsService } from './medics.service';

@ApiTags('Medics')
@ApiBearerAuth()
@Controller('medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Post()
  create(@Body() request: CreateMedicDto) {
    return this.medicsService.create(request);
  }

  @Get()
  @ApiQuery({ name: 'searchText', type: 'string' })
  search(@Query() request: SearchMedicDto) {
    return this.medicsService.search(request);
  }
}
