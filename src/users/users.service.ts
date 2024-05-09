import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: number | string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
