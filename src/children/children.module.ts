import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ChildrenController],
  providers: [ChildrenService],
  imports: [PrismaModule],
})
export class ChildrenModule {}
