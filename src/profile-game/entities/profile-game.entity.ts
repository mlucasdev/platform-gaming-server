import { Game } from 'src/game/entities/game.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

export class ProfileGame {
  id?: string;
  game: Game;
  profile: Profile;
  favorite: boolean;
}
