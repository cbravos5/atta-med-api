import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/repository/prisma.service';
import { LoginRequestDto } from './dto/login-request-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(request: LoginRequestDto) {
    const user = await this.prisma.user.findFirst({ where: { email: request.email } });

    if (!user) 
      throw new UnauthorizedException('Wrong email/password.');

    const validPassword = await verify(user.password, request.password);

    if (!validPassword)
      throw new UnauthorizedException('Wrong email/password.');

    const payload = { email: user.email, sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET || '',
    });

    return {
      user: {
        id: user.id,
        email: user.email
      },
      token,
    };
  }
}