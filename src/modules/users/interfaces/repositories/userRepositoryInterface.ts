import User from '../../models/user';

export default interface IUserRepository {
  create(name: string, email: string, tag: string, password: string): Promise<User>
  save(user: User): Promise<User>
  list(): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: number): Promise<User | undefined>
  delete(id: number): Promise<void>
}
