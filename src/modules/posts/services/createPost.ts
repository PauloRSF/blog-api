import { inject, injectable } from 'inversify';

import Post from '../models/post';

import ContainerSymbols from '@shared/container/symbols';
import IPostRepository from '../interfaces/repositories/postRepositoryInterface';

import postSchema from '../validators/schemas/postSchema';
import validateSchema from '@shared/validation/validateSchema';

@injectable()
export default class CreatePostService {
  private postRepository: IPostRepository;

  constructor (
    @inject(ContainerSymbols.PostRepository)
      _postRepository: IPostRepository
  ) {
    this.postRepository = _postRepository;
  }

  public async execute (userId: number, title: string, content: string): Promise<Post> {
    validateSchema(postSchema, { title, content })

    const post = await this.postRepository.create(userId, title, content);

    return post;
  }
}
