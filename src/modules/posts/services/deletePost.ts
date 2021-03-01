import { inject, injectable } from 'inversify';

import ContainerSymbols from '@shared/container/symbols';
import IPostRepository from '../interfaces/repositories/postRepositoryInterface';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class DeletePostService {
  private postRepository: IPostRepository;

  constructor (
    @inject(ContainerSymbols.PostRepository)
      _postRepository: IPostRepository
  ) {
    this.postRepository = _postRepository;
  }

  public async execute (userId: number, id: number): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new APIError('Post não existe', 404)
    }

    if (post.user.id !== userId) {
      throw new APIError('Usuário não autorizado', 401)
    }

    this.postRepository.delete(id);
  }
}
