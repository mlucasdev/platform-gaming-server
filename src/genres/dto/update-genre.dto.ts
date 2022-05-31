import { PartialType } from '@nestjs/swagger';
import { CreateGenderDto } from './create-genre.dto';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {}
