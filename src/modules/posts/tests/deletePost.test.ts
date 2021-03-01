import supertest from 'supertest';

import app from '../../../server';

import connection from '@config/typeorm/connection';

import PostEntity from '../infra/typeorm/entities/postEntity';
import postSeeds from '@modules/posts/tests/seeds';

import UserEntity from '@modules/users/infra/typeorm/entities/userEntity';
import userSeeds from '@modules/users/tests/seeds';

describe('Sua aplicação deve ter o endpoint DELETE `post/:id`', () => {
  beforeEach(async () => {
    await connection.loadSeeds(UserEntity, userSeeds);
    await connection.loadSeeds(PostEntity, postSeeds);
  });

  afterEach(async () => {
    await connection.synchronize();
  });

  beforeAll(async () => {
    await connection.create();
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possível deletar um blogpost com sucesso', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then(({ body }) => {
        const token = body.token;

        supertest(app)
          .delete('/post/1')
          .set('Authorization', token)
          .expect(204).then(() => {
            done();
          });
      });
  });

  it('Será validado que não é possível deletar um blogpost com outro usuário', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'MichaelSchumacher@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then(({ body }) => {
        const token = body.token;

        supertest(app)
          .delete('/post/1')
          .set('Authorization', token)
          .expect(401)
          .then(({ body }) => {
            expect(body.message).toBe('Usuário não autorizado');
            done();
          });
      });
  });

  it('Será validado que não é possível deletar um blogpost inexistente', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then(({ body }) => {
        const token = body.token;

        supertest(app)
          .delete('/post/111')
          .set('Authorization', token)
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe('Post não existe');
            done();
          });
      });
  });

  it('Será validado que não é possível deletar um blogpost sem o token', (done) => {
    supertest(app)
      .delete('/post/1')
      .set('Authorization', '')
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível deletar um blogpost com o token inválido', (done) => {
    supertest(app)
      .delete('/post/1')
      .set('Authorization', 'kwngu4425h2')
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
