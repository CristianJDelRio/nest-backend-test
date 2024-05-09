import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private readonly usersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.usersUrl = `${this.configService.get<string>('vendorDns')}/users`;
  }

  async findAll(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await lastValueFrom(
        this.httpService.get<User[]>(this.usersUrl),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(userId: string | number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await lastValueFrom(
        this.httpService.get<User>(`${this.usersUrl}/${userId}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error finding user with id: ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
