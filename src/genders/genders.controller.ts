import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';

@ApiTags('gender')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @Get()
  findAll(): Promise<Gender[]> {
    return this.gendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenderDto) {
    return this.gendersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gendersService.remove(id);
  }
}
