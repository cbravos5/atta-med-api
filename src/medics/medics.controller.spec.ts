import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/repository/prisma.service';
import { MedicsController } from './controllers/medics.controller';
import { MedicsRepository } from './repositories/medics.repository';
import { MedicsService } from './services/medics.service';

describe('MedicsController', () => {
  let controller: MedicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicsController],
      providers: [MedicsService, PrismaService, MedicsRepository],
    }).compile();

    controller = module.get<MedicsController>(MedicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
