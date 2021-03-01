import { inject, injectable } from 'inversify';

import Post from '../models/post';

import ContainerSymbols from '@shared/container/symbols';
import IPostRepository from '../interfaces/repositories/postRepositoryInterface';

import postSchema from '../validators/schemas/postSchema';
import validateSchema from '@shared/validation/validateSchema';

import { APIError } from '@shared/errors/apiError';

@injectable()
export default class UpdatePostService {
  private postRepository: IPostRepository;

  constructor (
    @inject(ContainerSymbols.PostRepository)
      _postRepository: IPostRepository
  ) {
    this.postRepository = _postRepository;
  }

  public async execute (userId: number, id: number, title: string, content: string): Promise<Post> {
    validateSchema(postSchema, { title, content })

    if (id !== userId) {
      throw new APIError('Usuário não autorizado', 401)
    }
    let post;
    try {
      post = await this.postRepository.update(id, title, content);
    } catch (err) {
      console.log(err);
      throw err;
    }

    return post;
  }
}
