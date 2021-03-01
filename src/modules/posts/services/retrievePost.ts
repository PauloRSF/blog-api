import { inject, injectable } from 'inversify';

import Post from '../models/post';

import ContainerSymbols from '@shared/container/symbols';
import IPostRepository from '../interfaces/repositories/postRepositoryInterface';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class RetrievePostService {
  private postRepository: IPostRepository;

  constructor (
    @inject(ContainerSymbols.PostRepository)
      _postRepository: IPostRepository
  ) {
    this.postRepository = _postRepository;
  }

  public async execute (id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new APIError('Post não existe', 404);
    }

    return post;
  }
}
