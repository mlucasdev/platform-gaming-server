import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRespondeDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login, recebendo um token de autenticação',
  })
  login(@Body() dto: LoginDto): Promise<LoginRespondeDto> {
    return this.authService.login(dto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retornar usuário autenticado no momento',
  })
  @ApiBearerAuth()
  profile() {
    return 'Autenticação bem sucedida';
  }
}
