import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, UsersRepository],
  imports: [ConfigModule, HttpModule],
})
export class PostsModule {}
