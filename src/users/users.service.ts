import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({ where: { email: createUserDto.email }});

    if (userExists) throw new ConflictException('User already exists');

    const hashedPassword = await hash(createUserDto.password);

    await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async remove(id: string) {
    const userExists = this.prisma.user.findFirst({ where: { id: id } });

    if (!userExists) throw new NotFoundException('User not found');

    return await this.prisma.user.delete({ where: { id } });
  }
}
