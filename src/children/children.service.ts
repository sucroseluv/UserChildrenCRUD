import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(createChildDto: CreateChildDto, parentId) {
    const userChildren = await this.prisma.child.findMany({
      where: { parentId },
    });
    if (userChildren.length >= 5) {
      throw new BadRequestException(
        'You have already added the maximum number of children',
      );
    }
    return await this.prisma.child.create({
      data: { ...createChildDto, parentId },
    });
  }

  findAll() {
    return this.prisma.child.findMany({});
  }

  findAllByParentId(parentId) {
    return this.prisma.child.findMany({ where: { parentId } });
  }

  findOne(id: number) {
    return this.prisma.child.findUnique({ where: { id } });
  }

  async findOneWithParent(id: number, parentId: number) {
    const child = await this.findOne(id);
    if (child?.parentId !== parentId) {
      throw new ForbiddenException(`It's not your child`);
    }
    return child;
  }

  update(id: number, updateArticleDto: UpdateChildDto) {
    return this.prisma.child.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.child.delete({ where: { id } });
  }
}
