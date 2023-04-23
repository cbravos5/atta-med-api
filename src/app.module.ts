import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './repository/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { MedicsModule } from './medics/medics.module';

@Module({
  imports: [PrismaModule, PatientsModule, MedicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
