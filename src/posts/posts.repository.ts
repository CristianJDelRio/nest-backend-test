import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Post } from './post.entity';
import { Comment } from '../comments/comment.entity';
import { PaginationDto } from '../common/pagination.dto';

@Injectable()
export class PostsRepository {
  private readonly postsUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.postsUrl = `${this.configService.get<string>('vendorDns')}/posts`;
  }

  async findAll({ size, start }: PaginationDto): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await lastValueFrom(
        this.httpService.get<Post[]>(this.postsUrl),
      );
      return response.data.slice(start, size + 1);
    } catch (error) {
      throw new HttpException(
        'Error fetching posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(postId: number | string): Promise<Post> {
    const response: AxiosResponse<Post> = await lastValueFrom(
      this.httpService.get<Post>(`${this.postsUrl}/${postId}`),
    );
    console.log(response.config.headers);
    return response.data;
  }

  async findPostComments(postId: number | string): Promise<Comment[]> {
    const response: AxiosResponse<Comment[]> = await lastValueFrom(
      this.httpService.get<Comment[]>(`${this.postsUrl}/${postId}/comments`),
    );
    return response.data;
  }
}
