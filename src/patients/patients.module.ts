import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
})

export class PatientsModule {}
