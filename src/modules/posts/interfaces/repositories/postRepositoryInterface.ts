import Post from '../../models/post';

export default interface IPostRepository {
  create(userId: number, title: string, content: string): Promise<Post>
  save(post: Post): Promise<Post>
  find(query: string | undefined): Promise<Post[]>
  findById(id: number): Promise<Post | undefined>
  update(id: number, title: string, content: string): Promise<Post>
  delete(id: number): Promise<void>
}
