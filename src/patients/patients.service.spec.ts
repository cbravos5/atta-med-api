import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/repository/prisma.service';
import { PatientsRepository } from './repositories/patients.repository';
import { PatientsService } from './services/patients.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, PrismaService, PatientsRepository],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
