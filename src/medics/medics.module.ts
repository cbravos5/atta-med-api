import { Module } from '@nestjs/common';
import { MedicsService } from './services/medics.service';
import { MedicsController } from './controllers/medics.controller';
import { PrismaService } from 'src/repository/prisma.service';
import { MedicsRepository } from './repositories/medics.repository';

@Module({
  controllers: [MedicsController],
  providers: [MedicsService, PrismaService, MedicsRepository],
  exports: [MedicsRepository]
})
export class MedicsModule {}
