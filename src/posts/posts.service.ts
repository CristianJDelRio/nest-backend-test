import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { PaginationDto } from '../common/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private userRepository: UsersRepository,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Post[]> {
    const posts: Post[] = await this.postsRepository.findAll(paginationDto);
    return Promise.all(
      posts.map(async (post: Post) => {
        const user: User = await this.userRepository.findOne(post.userId);
        const comments: Comment[] = await this.findPostsComments(post.id);

        return { ...post, user, comments };
      }),
    );
  }

  findPostsComments(postId: number | string): Promise<Comment[]> {
    return this.postsRepository.findPostComments(postId);
  }

  findOne(postId: string | number): Promise<Post> {
    return this.postsRepository.findOne(postId);
  }
}
