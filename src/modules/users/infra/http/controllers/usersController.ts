import { Request, Response } from 'express';

import { container } from '@shared/container';

import CreateUserService from '@modules/users/services/createUser';
import LoginService from '@modules/users/services/login';
import ListUsersService from '@modules/users/services/listUsers';
import CreateUserTokenService from '@modules/users/services/createUserToken';
import RetrieveUserService from '@modules/users/services/retrieveUser';
import DeleteUserService from '@modules/users/services/deleteUser';

import { APIError } from '@shared/errors/apiError';

export default class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return res.json(users);
  }

  public async retrieve (req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const retrieveUserService = container.resolve(RetrieveUserService);

    const user = await retrieveUserService.execute(Number(userId));

    return res.json(user);
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { displayName, email, image, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(displayName, email, image, password);
    const token = new CreateUserTokenService().execute(user.id);

    return res.status(201).json({ token });
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);

    if (req.user) {
      await deleteUserService.execute(req.user.id);
    } else {
      throw new APIError('Nenhum usuário relacionado ao token', 400)
    }

    return res.status(204).send();
  }

  public async login (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const loginService = container.resolve(LoginService);

    const token = await loginService.execute(email, password);

    return res.json({ token });
  }
}
