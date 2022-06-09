import { Genre } from 'src/genres/entities/genre.entity';

export class Game {
  id?: string;
  title: string;
  coverImageUrl: string;
  description: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;
  genres?: Genre[];
  createdAt?: Date;
  updatedAt?: Date;
}
