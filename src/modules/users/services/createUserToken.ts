import jwt from 'jsonwebtoken';
import { exit } from 'process';

export default class CreateUserTokenService {
  public execute (id: number): string {
    let token;

    try {
      token = jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_EXPIRATION
      });
    } catch (err) {
      console.error(err);
      exit(1);
    }

    return token;
  }
}
