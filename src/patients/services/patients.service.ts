import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/repository/prisma.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { SearchPatientDto } from '../dto/search-patient.dto';
import { PatientsRepository } from '../repositories/patients.repository';

@Injectable()
export class PatientsService {
  constructor(private patientRepository: PatientsRepository) {}

  async create(createPatientDto: CreatePatientDto) {
    const patientExists = await this.patientRepository.findByCpf(createPatientDto.cpf);

    if (patientExists)
      throw new ConflictException('Patient already exists');

    return await this.patientRepository.create(createPatientDto);
  }

  async search(request: SearchPatientDto) {
    return await this.patientRepository.findByNameAndCpf(request.searchText);
  }
}
