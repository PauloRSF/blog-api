import { inject, injectable } from 'inversify';

import User from '../models/user';

import userSchema from '../validators/schemas/userSchema';
import validateSchema from '@shared/validation/validateSchema';

import ContainerSymbols from '@shared/container/symbols';
import IUserRepository from '../interfaces/repositories/userRepositoryInterface';
import IHashProvider from '@shared/providers/interfaces/hashProviderInterface';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class CreateUserService {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor (
    @inject(ContainerSymbols.UserRepository)
      _userRepository: IUserRepository,
    @inject(ContainerSymbols.HashProvider)
      _hashProvider: IHashProvider
  ) {
    this.userRepository = _userRepository;
    this.hashProvider = _hashProvider;
  }

  public async execute (displayName: string, email: string, image: string, password: string): Promise<User> {
    validateSchema(userSchema, { displayName, email, image, password })

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new APIError('Usuário já existe', 409);
    }

    const hashedPassword = await this.hashProvider.hash(password);
    const user = await this.userRepository.create(displayName, email, image, hashedPassword);

    return user;
  }
}
