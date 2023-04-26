import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Medic } from '@prisma/client';
import { PrismaService } from 'src/repository/prisma.service';
import { MedicsRepository } from '../repositories/medics.repository';
import { MedicsService } from './medics.service';

describe('MedicsService', () => {
  let service: MedicsService;
  let repository: MedicsRepository;

  const mockedMedic: Medic = {
    id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    crm: 'CRM/SP-123456',
    name: 'Caleb Gabriel Almada',
    specialty: 'Cardiologia',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicsService, PrismaService, MedicsRepository],
    }).compile();

    service = module.get<MedicsService>(MedicsService);
    repository = module.get<MedicsRepository>(MedicsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a medic', async () => {
    jest.spyOn(repository, 'findByCrm').mockImplementation(() => null);
    jest.spyOn(repository, 'create').mockImplementation(async () => mockedMedic);

    expect(await service.create(mockedMedic)).toBe(mockedMedic);
  });

  it('should throw conflict', async () => {
    jest.spyOn(repository, 'findByCrm').mockImplementation(async () => mockedMedic);

    await expect(service.create(mockedMedic)).rejects.toThrow(ConflictException);
  });
});
