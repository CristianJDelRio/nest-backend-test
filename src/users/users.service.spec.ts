import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  const users: User[] = [
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      address: {
        street: 'Skiles Walks',
        suite: 'Suite 351',
        city: 'Roscoeview',
        zipcode: '33263',
        geo: {
          lat: '-31.8129',
          lng: '62.5342',
        },
      },
      phone: '(254)954-1289',
      website: 'demarco.info',
      company: {
        name: 'Keebler LLC',
        catchPhrase: 'User-centric fault-tolerant solution',
        bs: 'revolutionize end-to-end systems',
      },
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      address: {
        street: 'Norberto Crossing',
        suite: 'Apt. 950',
        city: 'South Christy',
        zipcode: '23505-1337',
        geo: {
          lat: '-71.4197',
          lng: '71.7478',
        },
      },
      phone: '1-477-935-8478 x6430',
      website: 'ola.org',
      company: {
        name: 'Considine-Lockman',
        catchPhrase: 'Synchronised bottom-line interface',
        bs: 'e-enable innovative applications',
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue(users);

      expect(await service.findAll()).toBe(users);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single user when given a numeric id', async () => {
      const user: User = users[0];

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(1)).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should return a single user when given a string id', async () => {
      const user: User = users[0];

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne('1')).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith('1');
    });
  });
});
