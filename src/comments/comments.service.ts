import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.findAll();
  }
}
