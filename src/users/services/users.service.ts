import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';


@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(createUserDto.email);

    if (userExists) throw new ConflictException('User already exists');

    const hashedPassword = await hash(createUserDto.password);

    await this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword
    })
  }

  async findAll() {
    return await this.usersRepository.getAll();
  }

  async remove(id: string) {
    const userExists = this.usersRepository.findOne(id);

    if (!userExists) throw new NotFoundException('User not found');

    return await this.usersRepository.delete(id);
  }
}
