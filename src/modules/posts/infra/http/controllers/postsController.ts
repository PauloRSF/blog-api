import { Request, Response } from 'express';

import { container } from '@shared/container';

import CreatePostService from '@modules/posts/services/createPost';
import SearchPostsService from '@modules/posts/services/searchPosts';
import RetrievePostService from '@modules/posts/services/retrievePost';
import UpdatePostService from '@modules/posts/services/updatePost';
import DeletePostService from '@modules/posts/services/deletePost';

import { APIError } from '@shared/errors/apiError';

export default class PostController {
  public async list (req: Request, res: Response): Promise<Response> {
    const searchPostsService = container.resolve(SearchPostsService);

    const posts = await searchPostsService.execute('');

    return res.json(posts);
  }

  public async search (req: Request, res: Response): Promise<Response> {
    const { q: query } = req.query;
    const searchPostsService = container.resolve(SearchPostsService);

    const posts = await searchPostsService.execute(query as string);

    return res.json(posts);
  }

  public async retrieve (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;

    const retrievePostService = container.resolve(RetrievePostService);

    const post = await retrievePostService.execute(Number(postId));

    return res.json(post);
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { title, content } = req.body;

    if (!req.user) {
      throw new APIError('Nenhum usuário relacionado ao token', 400)
    }

    const createPostService = container.resolve(CreatePostService);
    const post = await createPostService.execute(req.user.id, title, content);

    return res.status(201).json(post);
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const { title, content } = req.body;

    if (!req.user) {
      throw new APIError('Nenhum usuário relacionado ao token', 400)
    }

    const updatePostService = container.resolve(UpdatePostService);
    const post = await updatePostService.execute(req.user.id, Number(postId), title, content);

    return res.json(post);
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;

    if (!req.user) {
      throw new APIError('Nenhum usuário relacionado ao token', 400)
    }

    const deletePostService = container.resolve(DeletePostService);
    await deletePostService.execute(req.user.id, Number(postId));

    return res.status(204).send();
  }
}
