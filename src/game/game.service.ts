import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  games: Game[] = [];
  create(randomId: number, createGameDto: CreateGameDto) {
    const game: Game = { id: randomId, ...createGameDto };
    this.games.push(game);
    return game;
  }

  findAll() {
    return this.games;
  }

  findOne(id: number) {
    return this.games.find(element => element.id == id)
  }
}
