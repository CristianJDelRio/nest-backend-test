import { Controller, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }
}
