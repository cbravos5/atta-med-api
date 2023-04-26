import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/repository/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
