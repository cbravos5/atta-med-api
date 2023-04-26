import { Module } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { PrismaService } from 'src/repository/prisma.service';
import { AppointmentsRepository } from './repositories/appointments.repository';
import { MedicsRepository } from 'src/medics/repositories/medics.repository';
import { PatientsRepository } from 'src/patients/repositories/patients.repository';
import { AppointmentsController } from './controllers/appointments.controller';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService, AppointmentsRepository, MedicsRepository, PatientsRepository]
})
export class AppointmentsModule {}
