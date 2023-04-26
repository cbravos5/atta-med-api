import { Module } from '@nestjs/common';
import { PatientsService } from './services/patients.service';
import { PatientsController } from './controllers/patients.controller';
import { PrismaService } from 'src/repository/prisma.service';
import { PatientsRepository } from './repositories/patients.repository';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService, PatientsRepository],
  exports: [PatientsRepository]
})

export class PatientsModule {}
