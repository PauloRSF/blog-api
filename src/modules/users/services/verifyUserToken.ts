import jwt from 'jsonwebtoken';

import ITokenPayload from '@shared/auth/interfaces/tokenPayload';

import { APIError } from '@shared/errors/apiError';

export default class VerifyUserTokenService {
  public execute (token: string): ITokenPayload {
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as ITokenPayload;
    } catch (err) {
      throw new APIError('Token expirado ou inválido', 401);
    }

    return decodedToken;
  }
}
