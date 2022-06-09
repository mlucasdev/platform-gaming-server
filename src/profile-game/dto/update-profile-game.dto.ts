import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateProfileGameDto } from './create-profile-game.dto';

export class UpdateProfileGameDto extends OmitType(CreateProfileGameDto, [
  'gameId',
  'profileId',
] as const) {
  @IsUUID()
  @ApiProperty({
    description: 'ID do perfil que terá o jogo removido',
    example: '2b28e46a-edd5-4741-b82f-425e3f0229c1',
  })
  profileId: string;
}
