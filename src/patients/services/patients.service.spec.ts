import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/repository/prisma.service';
import { PatientsRepository } from '../repositories/patients.repository';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: PatientsRepository;

  const mockedPatient: Patient = {
    id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    cpf: '48201786955',
    age: 24,
    name: 'Gabriel Ryan José Assis', 
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: 'MALE'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, PrismaService, PatientsRepository],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<PatientsRepository>(PatientsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    jest.spyOn(repository, 'findByCpf').mockImplementation(() => null);
    jest.spyOn(repository, 'create').mockImplementation(async () => mockedPatient);

    expect(await service.create(mockedPatient)).toBe(mockedPatient);
  });

  it('should throw conflict', async () => {
    jest.spyOn(repository, 'findByCpf').mockImplementation(async () => mockedPatient);

    await expect(service.create(mockedPatient)).rejects.toThrow(ConflictException);
  });
});
