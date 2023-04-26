import { Test, TestingModule } from '@nestjs/testing';
import { MedicsController } from './controllers/medics.controller';
import { MedicsService } from './services/medics.service';

describe('MedicsController', () => {
  let controller: MedicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicsController],
      providers: [MedicsService],
    }).compile();

    controller = module.get<MedicsController>(MedicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
