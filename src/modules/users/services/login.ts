import { inject, injectable } from 'inversify';

import loginSchema from '../validators/schemas/loginSchema';
import validateSchema from '@shared/validation/validateSchema';

import ContainerSymbols from '@shared/container/symbols';
import IUserRepository from '../interfaces/repositories/userRepositoryInterface';

import CreateUserTokenService from './createUserToken';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class LoginService {
  private userRepository: IUserRepository;

  constructor (
    @inject(ContainerSymbols.UserRepository)
      _userRepository: IUserRepository
  ) {
    this.userRepository = _userRepository;
  }

  public async execute (email: string, password: string): Promise<string> {
    validateSchema(loginSchema, { email, password })

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new APIError('Campos inválidos', 400);
    }

    const token = new CreateUserTokenService().execute(user.id);

    return token;
  }
}
