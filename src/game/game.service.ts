import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
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
    const game: Game = this.games.find((element) => element.id === id);
    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    let game: Game = this.games.find((element) => element.id === id);
    game = { id: id, ...updateGameDto };
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === id) {
        return (this.games[i] = game);
      }
    }
  }
}
