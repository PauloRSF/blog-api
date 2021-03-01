import supertest from 'supertest';

import app from '../../../server';

import connection from '@config/typeorm/connection';

import UserEntity from '@modules/users/infra/typeorm/entities/userEntity';
import userSeeds from '@modules/users/tests/seeds';

describe('Sua aplicação deve ter o endpoint POST `/post`', () => {
  beforeEach(async () => {
    await connection.loadSeeds(UserEntity, userSeeds);
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

  it('Será validado que é possível cadastrar um blogpost com sucesso', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then((response) => {
        const { body } = response;
        const token = body.token;

        supertest(app)
          .post('/post')
          .send({
            title: 'Fórmula 1',
            content: 'O campeão do ano!'
          })
          .set('Authorization', token)
          .expect(201)
          .then((response) => {
            const { body } = response;
            expect(body.title).toBe('Fórmula 1');
            expect(body.content).toBe('O campeão do ano!');
            expect(body.userId).toBe(1);
            done();
          });
      });
  });

  it('Será validado que não é possível cadastrar um blogpost sem o campo `title`', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then((response) => {
        const { body } = response;
        const token = body.token;

        supertest(app)
          .post('/post')
          .send({
            content: 'O campeão do ano!'
          })
          .set('Authorization', token)
          .expect(400)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('"title" is required');
            done();
          });
      });
  });

  it('Será validado que não é possível cadastrar um blogpost sem o campo `content`', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then((response) => {
        const { body } = response;
        const token = body.token;

        supertest(app)
          .post('/post')
          .send({
            title: 'O campeão do ano!'
          })
          .set('Authorization', token)
          .expect(400)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('"content" is required');
            done();
          });
      });
  });

  it('Será validado que não é possível cadastrar um blogpost sem o token', (done) => {
    supertest(app)
      .post('/post')
      .send({
        title: 'Fórmula 1',
        content: 'O campeão do ano!'
      })
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível cadastrar um blogpost com o token inválido', (done) => {
    supertest(app)
      .post('/post')
      .send({
        title: 'Fórmula 1',
        content: 'O campeão do ano!'
      })
      .set('Authorization', 'kwngu4425h2')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
