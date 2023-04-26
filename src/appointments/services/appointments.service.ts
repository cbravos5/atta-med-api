import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { MedicsRepository } from 'src/medics/repositories/medics.repository';
import { PatientsRepository } from 'src/patients/repositories/patients.repository';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { GetAvailableHoursDto } from '../dto/get-available-hours-dto';
import { AppointmentsRepository } from '../repositories/appointments.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private medicsRepository: MedicsRepository,
    private patientsRepository: PatientsRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // appointments are expected to be in time periods
    const validAppointmentHours = this.generatePeriods(
      createAppointmentDto.when,
    );

    if (
      !validAppointmentHours.find(
        (date) =>
          date.toISOString() === createAppointmentDto.when.toISOString(),
      )
    )
      throw new BadRequestException(
        'Provided datetime is not a valid appointment time',
      );

    const existsAppointment = await this.appointmentsRepository.findByDateAndMedic(
      createAppointmentDto.when,
      createAppointmentDto.medicId,
    );

    if (existsAppointment)
      throw new ConflictException(
        'Medic already have an appointment at this date',
      );

    const medic = await this.medicsRepository.findOne(
      createAppointmentDto.medicId,
    );

    if (!medic) throw new BadRequestException('Medic not found');

    const patient = await this.patientsRepository.findOne(
      createAppointmentDto.patientId,
    );

    if (!patient) throw new BadRequestException('Patient not found');

    return await this.appointmentsRepository.create(createAppointmentDto);
  }

  async findByDate(when: Date = new Date()) {
    const startPeriod = dayjs(when).startOf('day').toDate();
    const endPeriod = dayjs(when).endOf('day').toDate();

    return this.appointmentsRepository.findByDate(startPeriod, endPeriod);
  }

  async cancel(id: string) {
    await this.appointmentsRepository.setToCancelled(id);
  }

  async getAvailableHours(getAvailableHoursDto: GetAvailableHoursDto) {
    const periods = this.generatePeriods(getAvailableHoursDto.when);

    const startPeriod = dayjs(getAvailableHoursDto.when)
      .startOf('day')
      .toDate();
    const endPeriod = dayjs(getAvailableHoursDto.when).endOf('day').toDate();

    const todayAppointments = await this.appointmentsRepository.findByMedic(
      startPeriod,
      endPeriod,
      getAvailableHoursDto.medicId,
    );

    return {
      availablePeriods: periods.filter(
        (period) =>
          !todayAppointments.find(
            ({ when }) => when.toISOString() === period.toISOString(),
          ),
      ),
    };
  }

  private generatePeriods(date: Date) {
    const { startTime, endTime, periodMinutes } = this.getTimePeriod();

    const startDateTime = dayjs(date)
      .startOf('day')
      .add(startTime.hour, 'hours')
      .add(startTime.minutes, 'minutes');

    const endDatetime = dayjs(date)
      .startOf('day')
      .add(endTime.hour, 'hours')
      .add(endTime.minutes, 'minutes');

    const appointmentPeriods: Date[] = [];
    let currentDateTime = startDateTime;

    while (currentDateTime.isBefore(endDatetime)) {
      appointmentPeriods.push(currentDateTime.toDate());

      currentDateTime = currentDateTime.add(periodMinutes, 'minutes');
    }

    return appointmentPeriods;
  }

  private getTimePeriod() {
    const startHourString = process.env.START_HOUR_STRING || '06:00'.split(':');
    const endHoursString = process.env.END_HOUR_STRING || '22:00'.split(':');
    const periodMinutes = 30;

    const startTime = {
      hour: Number(startHourString[0]) || 6,
      minutes: Number(startHourString[1] || 0),
    };

    const endTime = {
      hour: Number(endHoursString[0]) || 6,
      minutes: Number(endHoursString[1] || 0),
    };

    return { startTime, endTime, periodMinutes };
  }
}
