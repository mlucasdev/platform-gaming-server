import { Module } from '@nestjs/common';
import { GenreService } from './genres.service';
import { GendersController } from './genres.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GendersController],
  providers: [GenreService],
})
export class GendersModule {}
