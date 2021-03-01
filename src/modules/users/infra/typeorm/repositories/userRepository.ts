import { injectable } from 'inversify';
import { Repository, getRepository } from 'typeorm';

import User from '../../../models/user';
import UserEntity from '../entities/userEntity';
import IUserRepository from '@modules/users/interfaces/repositories/userRepositoryInterface';

@injectable()
export default class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor () {
    this.repository = getRepository<User>(UserEntity);
  }

  async create (displayName: string, email: string, image: string, password: string): Promise<User> {
    const user = this.repository.create({ displayName, email, image, password });
    await this.repository.save(user);

    return user;
  }

  async list (): Promise<User[]> {
    return this.repository.find();
  }

  async save (user: User): Promise<User> {
    await this.repository.save(user);

    return user;
  }

  async findByEmail (email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findById (id: number): Promise<User | undefined> {
    return this.repository.findOne({ id });
  }

  async delete (id: number): Promise<void> {
    this.repository.delete({ id });
  }
}
