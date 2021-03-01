import { Container } from 'inversify';

import ContainerSymbols from './symbols';

import IUserRepository from '@modules/users/interfaces/repositories/userRepositoryInterface';
import UserRepository from '@modules/users/infra/typeorm/repositories/userRepository';

export const container = new Container();

container.bind<IUserRepository>(
  ContainerSymbols.UserRepository
).to(
  UserRepository
).inSingletonScope();
