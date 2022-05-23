import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  create() {
    return 'Criar um novo jogo.';
  }

  findAll() {
    return 'Buscar todos os jogos.';
  }
}
