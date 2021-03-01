import User from '@modules/users/models/user';

export default class Post {
  id!: number;
  title!: string;
  content!: string;
  user!: User;
  userId!: number;
}
