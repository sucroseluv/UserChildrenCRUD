import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChildEntity } from './entities/child.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaClientExceptionValidationBirthFilter } from '../prisma-client-exception/prisma-client-exception.filter';

@Controller('profile/children')
@ApiTags('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(PrismaClientExceptionValidationBirthFilter)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ChildEntity })
  async create(@Req() req: Request, @Body() createChildDto: CreateChildDto) {
    const parentId = req.user['id'];
    const child = await this.childrenService.create(createChildDto, parentId);
    return new ChildEntity(child);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChildEntity, isArray: true })
  async findAll(@Req() req: Request) {
    const parentId = req.user['id'];
    const children = await this.childrenService.findAllByParentId(parentId);
    return children.map((child) => new ChildEntity(child));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChildEntity })
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const child = await this.childrenService.findOneWithParent(
      id,
      req.user['id'],
    );
    return new ChildEntity(child);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseFilters(PrismaClientExceptionValidationBirthFilter)
  @ApiCreatedResponse({ type: ChildEntity })
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    await this.childrenService.findOneWithParent(id, req.user['id']);
    return new ChildEntity(
      await this.childrenService.update(id, updateChildDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChildEntity })
  async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    await this.childrenService.findOneWithParent(id, req.user['id']);
    return new ChildEntity(await this.childrenService.remove(id));
  }
}
