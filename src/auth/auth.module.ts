import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/repository/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30m' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, JwtStrategy, UsersRepository],
})

export class AuthModule {}
