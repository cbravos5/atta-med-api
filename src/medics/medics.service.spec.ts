import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/repository/prisma.service';
import { MedicsRepository } from './repositories/medics.repository';
import { MedicsService } from './services/medics.service';

describe('MedicsService', () => {
  let service: MedicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicsService, PrismaService, MedicsRepository],
    }).compile();

    service = module.get<MedicsService>(MedicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
