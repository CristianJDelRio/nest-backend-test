import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
}
