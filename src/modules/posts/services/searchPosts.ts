import { inject, injectable } from 'inversify';

import Post from '../models/post';

import ContainerSymbols from '@shared/container/symbols';
import IPostRepository from '../interfaces/repositories/postRepositoryInterface';

@injectable()
export default class SearchPostsService {
  private postRepository: IPostRepository;

  constructor (
    @inject(ContainerSymbols.PostRepository)
      _postRepository: IPostRepository
  ) {
    this.postRepository = _postRepository;
  }

  public async execute (query: string | undefined): Promise<Post[]> {
    const posts = await this.postRepository.find(query);

    return posts;
  }
}
