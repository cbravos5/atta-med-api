import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/repository/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email }});
  }

  async create(user: CreateUserDto) {
    await this.prisma.user.create({
      data: user
    });
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}