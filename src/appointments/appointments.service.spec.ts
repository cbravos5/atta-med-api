import { Test, TestingModule } from '@nestjs/testing';
import { MedicsRepository } from 'src/medics/repositories/medics.repository';
import { PatientsRepository } from 'src/patients/repositories/patients.repository';
import { PrismaService } from 'src/repository/prisma.service';
import { AppointmentsRepository } from './repositories/appointments.repository';
import { AppointmentsService } from './services/appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService, PrismaService, AppointmentsRepository, MedicsRepository, PatientsRepository],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
