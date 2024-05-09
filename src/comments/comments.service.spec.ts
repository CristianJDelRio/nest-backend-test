import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { Comment } from './comment.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  let repository: CommentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    repository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const result: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: 'id labore ex et quam laborum',
          email: 'Eliseo@gardner.biz',
          body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
        },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
