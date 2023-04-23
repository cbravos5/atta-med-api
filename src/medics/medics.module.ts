import { Module } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';
import { PrismaService } from 'src/repository/prisma.service';

@Module({
  controllers: [MedicsController],
  providers: [MedicsService, PrismaService]
})
export class MedicsModule {}
