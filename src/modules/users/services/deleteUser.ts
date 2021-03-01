import { inject, injectable } from 'inversify';

import ContainerSymbols from '@shared/container/symbols';
import IUserRepository from '../interfaces/repositories/userRepositoryInterface';

@injectable()
export default class DeleteUserService {
  private userRepository: IUserRepository;

  constructor (
    @inject(ContainerSymbols.UserRepository)
      _userRepository: IUserRepository
  ) {
    this.userRepository = _userRepository;
  }

  public async execute (id: number): Promise<void> {
    this.userRepository.delete(id);
  }
}
