import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateProfileGameDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do jogo que terá relação com o perfil',
    example: 'a0c22c4c-96e4-464a-998c-a1cba399bc42',
  })
  profileId: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do jogo que terá relação com o perfil',
    example: '77d8a231-35cc-454b-a2ab-61afefb699d5',
  })
  gameId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Identificar se o jogo vai ser favoritado',
    example: false,
  })
  favorite: boolean;
}
