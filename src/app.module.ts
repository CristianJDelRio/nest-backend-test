import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { HealthModule } from './health/health.module';
import { PostsModule } from './posts/posts.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    CommentsModule,
    HealthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
