import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMedicDto } from './dto/create-medic.dto';
import { SearchMedicDto } from './dto/search-medic.dto';
import { MedicsService } from './medics.service';

@ApiTags('Medics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Post()
  @HttpCode(200)
  create(@Body() request: CreateMedicDto) {
    return this.medicsService.create(request);
  }

  @Get()
  @ApiQuery({ name: 'searchText', type: 'string' })
  search(@Query() request: SearchMedicDto) {
    return this.medicsService.search(request);
  }
}
