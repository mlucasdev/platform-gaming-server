import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileGameController } from './profile-game.controller';
import { ProfileGameService } from './profile-game.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileGameController],
  providers: [ProfileGameService],
})
export class ProfileGameModule {}
