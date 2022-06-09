import { User } from 'src/users/entities/user.entity';

export class Profile {
  id?: string;
  title: string;
  imageURL: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
