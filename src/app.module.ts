import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ChildrenModule } from './children/children.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule,
    ChildrenModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    ProfileModule,
  ],
})
export class AppModule {}
