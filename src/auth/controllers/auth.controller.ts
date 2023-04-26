import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto } from '../dto/login-request-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  create(@Body() request: LoginRequestDto) {
    return  this.authService.signIn(request);
  }
}
