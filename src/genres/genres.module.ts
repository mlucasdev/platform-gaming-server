import { Module } from '@nestjs/common';
import { GenreService } from './genres.service';
import { GendersController } from './genres.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GendersController],
  providers: [GenreService],
})
export class GendersModule {}
