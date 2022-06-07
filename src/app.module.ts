import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { PrismaModule } from './prisma/prisma.module';
import { GendersModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfileGameModule } from './profile-game/profile-game.module';

@Module({
  imports: [
    GameModule,
    PrismaModule,
    GendersModule,
    UsersModule,
    ProfilesModule,
    ProfileGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
