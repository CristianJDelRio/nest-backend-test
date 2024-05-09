import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsRepository {
  private readonly commentsUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.commentsUrl = `${this.configService.get<string>('vendorDns')}/comments`;
  }

  async findAll(): Promise<Comment[]> {
    try {
      const response: AxiosResponse<Comment[]> = await lastValueFrom(
        this.httpService.get<Comment[]>(this.commentsUrl),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
