import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/repository/prisma.service";
import { CreatePatientDto } from "../dto/create-patient.dto";

@Injectable()
export class PatientsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.patient.findFirst({
      where: { id },
    });
  }

  async findByCpf(cpf: string) {
    return await this.prisma.patient.findFirst({
      where: { cpf },
    });
  }

  async create(patient: CreatePatientDto) {
    return await this.prisma.patient.create({ data: patient });
  }

  async findByNameAndCpf(searchText: string) {
    return await this.prisma.patient.findMany({
      where: {
        OR: [
          { name: { contains: searchText } },
          { cpf: { contains: searchText } },
        ]
      }
    })
  }
}