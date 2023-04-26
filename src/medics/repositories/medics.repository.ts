import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateMedicDto } from '../dto/create-medic.dto';

@Injectable()
export class MedicsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.medic.findFirst({
      where: { id },
    });
  }

  async findByCrm(crm: string) {
    return await this.prisma.medic.findFirst({
      where: { crm },
    });
  }

  async create(medic: CreateMedicDto) {
    return await this.prisma.medic.create({ data: medic });
  }

  async findByNameCrm(searchText: string) {
    return await this.prisma.medic.findMany({
      where: {
        OR: [
          { name: { contains: searchText } },
          { crm: { contains: searchText } },
        ],
      },
    });
  }
}
