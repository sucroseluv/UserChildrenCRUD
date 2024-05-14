import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { PrismaClientExceptionValidationBirthFilter } from '../prisma-client-exception/prisma-client-exception.filter';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signIn')
  @HttpCode(200)
  @ApiOkResponse({ type: AuthEntity })
  signIn(@Body() { login, password }: LoginDto) {
    return this.authService.login(login, password);
  }

  @Post('signUp')
  @UseFilters(PrismaClientExceptionValidationBirthFilter)
  @ApiCreatedResponse({ type: UserEntity })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.userService.create(createUserDto));
  }
}
