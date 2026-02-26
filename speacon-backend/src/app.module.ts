import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SpeakersModule } from './speakers/speakers.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SpeakersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
