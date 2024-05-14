import { Child } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChildEntity implements Child {
  constructor(data: Partial<ChildEntity>) {
    Object.assign(this, data);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  middlename: string | null;

  @ApiProperty()
  birth: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  parentId: number;
}
