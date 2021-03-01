import argon2 from 'argon2';
import { injectable } from 'inversify';

import IHashProvider from '../interfaces/hashProviderInterface';

@injectable()
export default class Argon2HashProvider implements IHashProvider {
  async verify (hash: string, plaintext: string): Promise<boolean> {
    return await argon2.verify(hash, plaintext);
  }

  async hash (plaintext: string): Promise<string> {
    return await argon2.hash(plaintext);
  }
}
