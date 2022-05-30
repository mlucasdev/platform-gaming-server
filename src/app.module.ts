import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { PrismaModule } from './prisma/prisma.module';
import { GendersModule } from './genders/genders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GameModule, PrismaModule, GendersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
