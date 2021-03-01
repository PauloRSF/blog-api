import { NextFunction, Request, Response } from 'express';

import { container } from '@shared/container';

import VerifyUserTokenService from '@modules/users/services/verifyUserToken';
import RetrieveUserService from '@modules/users/services/retrieveUser';

import { APIError } from '@shared/errors/apiError';

async function tokenAuthentication (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    throw new APIError('Token não encontrado', 401);
  }

  const decodedToken = new VerifyUserTokenService().execute(authorization);

  let user;

  try {
    user = await container.resolve(RetrieveUserService).execute(decodedToken.id);
  } catch (err) {
    throw new APIError('Token expirado ou inválido', 401);
  }

  req.user = user;
  return next();
}

export default tokenAuthentication;
