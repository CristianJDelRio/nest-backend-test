import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { PaginationDto } from '../common/pagination.dto';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: PostsRepository;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findPostComments: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsRepository = module.get<PostsRepository>(PostsRepository);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts with user and comments', async () => {
      const posts: Post[] = [
        {
          userId: 1,
          id: 1,
          title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        },
      ];
      const user: User = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      };
      const comments: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: 'id labore ex et quam laborum',
          email: 'Eliseo@gardner.biz',
          body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
        },
      ];

      jest.spyOn(postsRepository, 'findAll').mockResolvedValue(posts);
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(service, 'findPostsComments').mockResolvedValue(comments);

      const paginationDto: PaginationDto = { start: 0, size: 10 };
      const result = await service.findAll(paginationDto);

      expect(result).toEqual([{ ...posts[0], user, comments }]);
      expect(postsRepository.findAll).toHaveBeenCalledWith(paginationDto);
      expect(usersRepository.findOne).toHaveBeenCalledWith(posts[0].userId);
      expect(service.findPostsComments).toHaveBeenCalledWith(posts[0].id);
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const post: Post = {
        id: 1,
        userId: 1,
        title: 'Test Post',
        body: 'Test Body',
      };

      jest.spyOn(postsRepository, 'findOne').mockResolvedValue(post);

      expect(await service.findOne(1)).toEqual(post);
      expect(postsRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findPostsComments', () => {
    it('should return an array of comments for a post', async () => {
      const comments: Comment[] = [
        {
          id: 1,
          postId: 1,
          name: 'Test Comment',
          email: 'test@example.com',
          body: 'Test Comment Body',
        },
      ];

      jest
        .spyOn(postsRepository, 'findPostComments')
        .mockResolvedValue(comments);

      expect(await service.findPostsComments(1)).toEqual(comments);
      expect(postsRepository.findPostComments).toHaveBeenCalledWith(1);
    });
  });
});
