import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/repository/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { JwtStrategy } from '../jwt.strategy';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersRepository, JwtService, JwtStrategy, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    const mockerUser: User = {
      id: 'cd9315e8-0b97-43ec-9400-9e7e793b20b4',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'email@attamed.com',
      password: await hash('attamed123'),
      role: 'ADMIN',
    };

    jest.spyOn(usersRepository, 'findByEmail').mockImplementation(async () => mockerUser);

    expect(
      await service.signIn({ email: 'email@attamed.com', password: 'attamed123' }),
    ).toHaveProperty('token');
  });
});
