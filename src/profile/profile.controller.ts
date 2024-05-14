import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { PrismaClientExceptionValidationBirthFilter } from '../prisma-client-exception/prisma-client-exception.filter';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getInfo(@Req() req: Request) {
    return new UserEntity(await this.usersService.findOne(req.user['id']));
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseFilters(PrismaClientExceptionValidationBirthFilter)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(
      await this.usersService.update(req.user['id'], updateUserDto),
    );
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Req() req: Request) {
    return new UserEntity(await this.usersService.remove(req.user['id']));
  }
}
