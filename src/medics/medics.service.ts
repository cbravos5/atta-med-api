import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Medic } from '@prisma/client';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { SearchMedicDto } from './dto/search-medic.dto';

@Injectable()
export class MedicsService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicDto: CreateMedicDto) {
    const medicExists = await this.prisma.medic.findFirst({
      where: { crm: createMedicDto.crm },
    });

    if (medicExists)
      throw new HttpException('Medic already exists', HttpStatus.BAD_REQUEST);

    return await this.prisma.medic.create({ data: createMedicDto });
  }

  async search(request: SearchMedicDto) {
    return await this.prisma.medic.findMany({
      where: {
        OR: [
          { name: { contains: request.searchText } },
          { crm: { contains: request.searchText } },
        ],
      },
    });
  }
}
