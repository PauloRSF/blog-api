import { injectable } from 'inversify';
import { Repository, getRepository } from 'typeorm';

import Post from '../../../models/post';

import PostEntity from '../entities/postEntity';

import IPostRepository from '@modules/posts/interfaces/repositories/postRepositoryInterface';

@injectable()
export default class PostRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor () {
    this.repository = getRepository<Post>(PostEntity);
  }

  async find (query: string): Promise<Post[]> {
    let dbQuery = this.repository.createQueryBuilder();

    if (query && query.trim() !== '') {
      dbQuery = dbQuery
        .where(`post.title ILIKE '%${query}%'`)
        .orWhere(`post.content ILIKE '%${query}%'`)
    }

    return dbQuery.leftJoinAndSelect('post.user', 'user').getMany();
  }

  async create (userId: number, title: string, content: string): Promise<Post> {
    const post = this.repository.create({ userId, title, content });
    await this.repository.save(post);

    return post;
  }

  async save (post: Post): Promise<Post> {
    await this.repository.save(post);

    return post;
  }

  async update (id: number, title: string, content: string): Promise<Post> {
    await this.repository.update({ id }, { title, content });
    const post = await this.repository
      .createQueryBuilder()
      .addSelect('post.userId')
      .select()
      .where({ id })
      .getOneOrFail();

    return post;
  }

  async findById (id: number): Promise<Post | undefined> {
    return this.repository.findOne({ id }, { relations: ['user'] });
  }

  async delete (id: number): Promise<void> {
    this.repository.delete({ id });
  }
}
