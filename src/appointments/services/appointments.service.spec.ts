import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Appointment, Medic, Patient } from '@prisma/client';
import { MedicsRepository } from 'src/medics/repositories/medics.repository';
import { PatientsRepository } from 'src/patients/repositories/patients.repository';
import { PrismaService } from 'src/repository/prisma.service';
import { AppointmentsRepository } from '../repositories/appointments.repository';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentsRepository: AppointmentsRepository;
  let patientsRepository: PatientsRepository;
  let medicsRepository: MedicsRepository;

  const mockedAppointment: Appointment = {
    id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    isCancelled: false,
    medicId: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    patientId: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    when: new Date('2023-04-24T14:30:00.000Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockedPatient: Patient = {
    id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    cpf: '48201786955',
    age: 24,
    name: 'Gabriel Ryan José Assis',
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: 'MALE',
  };

  const mockedMedic: Medic = {
    id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
    crm: 'CRM/SP-123456',
    name: 'Caleb Gabriel Almada',
    specialty: 'Cardiologia',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        PrismaService,
        AppointmentsRepository,
        MedicsRepository,
        PatientsRepository,
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentsRepository = module.get<AppointmentsRepository>(AppointmentsRepository);
    patientsRepository = module.get<PatientsRepository>(PatientsRepository);
    medicsRepository = module.get<MedicsRepository>(MedicsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an appointment', async () => {
    jest.spyOn(patientsRepository, 'findOne').mockImplementation(async () => mockedPatient);
    jest.spyOn(medicsRepository, 'findOne').mockImplementation(async () => mockedMedic);
    jest.spyOn(appointmentsRepository, 'findByDateAndMedic').mockImplementation(() => null);

    jest.spyOn(service, 'create').mockImplementation(async () => mockedAppointment);

    expect(await service.create(mockedAppointment)).toBe(mockedAppointment);
  });

  it('should be an invalid time period', async () => {
    await expect(
      service.create({
        ...mockedAppointment,
        when: new Date('2023-04-24T00:45:00.000Z'),
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should get appointments', async () => {
    const appointments = [
      {
        ...mockedAppointment,
        patient: mockedPatient,
        medic: mockedMedic,
      },
    ];

    jest.spyOn(appointmentsRepository, 'findByDate').mockImplementation(async () => appointments);

    expect(await service.findByDate(new Date())).toBe(appointments);
  });
});
