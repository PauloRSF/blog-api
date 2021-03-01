import { inject, injectable } from 'inversify';

import ContainerSymbols from '@shared/container/symbols';
import { APIError } from '@shared/errors/apiError';
import IUserRepository from '../interfaces/repositories/userRepositoryInterface';
import User from '../models/user';

@injectable()
export default class ListUsersService {
  private userRepository: IUserRepository;

  constructor (
    @inject(ContainerSymbols.UserRepository)
      _userRepository: IUserRepository
  ) {
    this.userRepository = _userRepository;
  }

  public async execute (): Promise<User[]> {
    const user = await this.userRepository.list();

    if (!user) {
      throw new APIError('Usuário não existe', 404);
    }

    return user;
  }
}
