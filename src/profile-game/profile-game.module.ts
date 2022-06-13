import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileGameController } from './profile-game.controller';
import { ProfileGameService } from './profile-game.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileGameController],
  providers: [ProfileGameService],
})
export class ProfileGameModule {}
