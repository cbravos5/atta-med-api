import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/repository/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const patientExists = await this.prisma.patient.findFirst({
      where: { cpf: createPatientDto.cpf },
    });

    if (patientExists)
      throw new HttpException('Patient already exists', HttpStatus.BAD_REQUEST);

    return await this.prisma.patient.create({ data: createPatientDto });
  }

  async search(request: SearchPatientDto) {
    return await this.prisma.patient.findMany({
      where: {
        OR: [
          { name: { contains: request.searchText } },
          { cpf: { contains: request.searchText } },
        ]
      }
    })
  }
}
