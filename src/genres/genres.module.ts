import { Module } from '@nestjs/common';
import { GendersService } from './genres.service';
import { GendersController } from './genres.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GendersController],
  providers: [GendersService],
})
export class GendersModule {}
