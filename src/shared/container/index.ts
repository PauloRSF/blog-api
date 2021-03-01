import { Container } from 'inversify';

import ContainerSymbols from './symbols';

import IUserRepository from '@modules/users/interfaces/repositories/userRepositoryInterface';
import UserRepository from '@modules/users/infra/typeorm/repositories/userRepository';

import IPostRepository from '@modules/posts/interfaces/repositories/postRepositoryInterface';
import PostRepository from '@modules/posts/infra/typeorm/repositories/postRepository';

import IHashProvider from '../providers/interfaces/hashProviderInterface';
import Argon2HashProvider from '../providers/implementations/Argon2HashProvider';

export const container = new Container();

container.bind<IUserRepository>(
  ContainerSymbols.UserRepository
).to(
  UserRepository
).inSingletonScope();

container.bind<IPostRepository>(
  ContainerSymbols.PostRepository
).to(
  PostRepository
).inSingletonScope();

container.bind<IHashProvider>(
  ContainerSymbols.HashProvider
).to(
  Argon2HashProvider
).inSingletonScope();
