import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  private readonly games: Game[] = [];
  create(randomId: number, createGameDto: CreateGameDto): CreateGameDto {
    const game: Game = { id: randomId, ...createGameDto };
    this.games.push(game);
    return game;
  }

  findAll(): CreateGameDto[] {
    return this.games;
  }

  findOne(id: number): CreateGameDto {
    const game: Game = this.games.find((element) => element.id === id);
    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto): CreateGameDto {
    let game: Game = this.games.find((element) => element.id === id);
    game = { id: id, ...updateGameDto };
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === id) {
        return (this.games[i] = game);
      }
    }
  }

  delete(id: number): object {
    for (let i = 0; i < this.games.length; i++) {
      if (id === this.games[i].id) {
        const game = this.games[i];
        this.games.splice(1, i);
        return { message: `${game.title} deletado com sucesso!` };
      }
    }
  }
}
