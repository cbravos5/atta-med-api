import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/repository/prisma.service';
import { PatientsController } from './controllers/patients.controller';
import { PatientsRepository } from './repositories/patients.repository';
import { PatientsService } from './services/patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [PatientsService, PrismaService, PatientsRepository],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
