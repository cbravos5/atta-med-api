import { Test, TestingModule } from '@nestjs/testing';
import { MedicsRepository } from 'src/medics/repositories/medics.repository';
import { PatientsRepository } from 'src/patients/repositories/patients.repository';
import { PrismaService } from 'src/repository/prisma.service';
import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentsRepository } from './repositories/appointments.repository';
import { AppointmentsService } from './services/appointments.service';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [AppointmentsService, PrismaService, AppointmentsRepository, MedicsRepository, PatientsRepository],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
