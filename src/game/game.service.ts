import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  games: Game[] = [];
  create(createGameDto: CreateGameDto) {
    const game: Game = { id: 1, ...createGameDto };
    this.games.push(game);
    return game;
  }

  findAll() {
    return 'Buscar todos os jogosa.';
  }
}
