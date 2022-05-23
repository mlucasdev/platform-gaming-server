import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  create(createGameDto: CreateGameDto) {
    return 'Criar um novo jogo.';
  }

  findAll() {
    return 'Buscar todos os jogos.';
  }
}
