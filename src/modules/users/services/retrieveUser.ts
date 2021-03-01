import { inject, injectable } from 'inversify';

import User from '../models/user';

import ContainerSymbols from '@shared/container/symbols';
import IUserRepository from '../interfaces/repositories/userRepositoryInterface';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class RetrieveUserService {
  private userRepository: IUserRepository;

  constructor (
    @inject(ContainerSymbols.UserRepository)
      _userRepository: IUserRepository
  ) {
    this.userRepository = _userRepository;
  }

  public async execute (id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new APIError('Usuário não existe', 404);
    }

    return user;
  }
}
