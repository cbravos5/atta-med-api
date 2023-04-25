import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAvailableHoursDto } from './dto/get-available-hours-dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

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

    const existsAppointment = await this.prisma.appointment.findFirst({
      where: {
        when: createAppointmentDto.when,
        medicId: createAppointmentDto.medicId,
        isCancelled: false,
      },
    });

    if (existsAppointment)
      throw new ConflictException(
        'Medic already have an appointment at this date',
      );

    const medic = await this.prisma.medic.findFirst({
      where: { id: createAppointmentDto.medicId },
    });

    if (!medic) throw new BadRequestException('Medic not found');

    const patient = await this.prisma.patient.findFirst({
      where: { id: createAppointmentDto.patientId },
    });

    if (!patient) throw new BadRequestException('Patient not found');

    return await this.prisma.appointment.create({
      data: createAppointmentDto,
    });
  }

  async findByDate(when: Date = new Date()) {
    const startPeriod = dayjs(when).startOf('day').toDate();
    const endperiod = dayjs(when).endOf('day').toDate();

    return this.prisma.appointment.findMany({
      where: { when: { gte: startPeriod, lte: endperiod } },
      include: { medic: true, patient: true },
    });
  }

  async cancel(id: string) {
    await this.prisma.appointment.update({
      where: { id: id },
      data: { isCancelled: true },
    });
  }

  async getAvailableHours(getAvailableHoursDto: GetAvailableHoursDto) {
    const periods = this.generatePeriods(getAvailableHoursDto.when);

    const startPeriod = dayjs(getAvailableHoursDto.when)
      .startOf('day')
      .toDate();
    const endperiod = dayjs(getAvailableHoursDto.when).endOf('day').toDate();

    const todayAppointments = await this.prisma.appointment.findMany({
      where: {
        when: { gte: startPeriod, lte: endperiod },
        medicId: getAvailableHoursDto.medicId,
        isCancelled: false,
      },
    });

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
    const startHourString = '06:00'.split(':');
    const endHoursString = '22:00'.split(':');
    const periodMinutes = Number('30') || 30;

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
