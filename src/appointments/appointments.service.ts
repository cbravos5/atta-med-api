import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // appointments are expected to be in 30min periods
    const existsAppointment = await this.prisma.appointment.findFirst({
      where: {
        when: createAppointmentDto.when,
        medicId: createAppointmentDto.medicId,
        isCancelled: false,
      },
    });

    if (existsAppointment)
      throw new HttpException(
        'Medic already have and appointment at this date',
        HttpStatus.CONFLICT,
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
    await this.prisma.appointment.update({ where: { id: id }, data: { isCancelled: true } });
  }
}
