import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByDateAndMedic(when: Date, medicId: string) {
    return await this.prisma.appointment.findFirst({
      where: {
        when,
        medicId,
        isCancelled: false,
      },
    });
  }

  async create(appointment: CreateAppointmentDto) {
    return await this.prisma.appointment.create({
      data: appointment,
    });
  }

  async findByDate(startPeriod: Date, endPeriod: Date) {
    return this.prisma.appointment.findMany({
      where: { when: { gte: startPeriod, lte: endPeriod } },
      include: { medic: true, patient: true },
    });
  }

  async setToCancelled(id: string) {
    await this.prisma.appointment.update({
      where: { id: id },
      data: { isCancelled: true },
    });
  }

  async findByMedic(startPeriod: Date, endPeriod: Date, medicId: string) {
    return await this.prisma.appointment.findMany({
      where: {
        when: { gte: startPeriod, lte: endPeriod },
        medicId: medicId,
        isCancelled: false,
      },
    });
  }
}
