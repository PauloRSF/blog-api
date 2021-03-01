import supertest from 'supertest';

import connection from '../../../config/typeorm/connection';
import app from '../../../server';
import UserEntity from '../infra/typeorm/entities/userEntity';

import seeds from './seeds';

describe('Sua aplicação deve ter o endpoint GET `/user/:id`', () => {
  beforeEach(async () => {
    await connection.loadSeeds(UserEntity, seeds);
  });

  afterEach(async () => {
    await connection.synchronize();
  })

  beforeAll(async () => {
    await connection.create();
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possível listar um usuário específico com sucesso', (done) => {
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
          .get('/user/1')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;
            expect(body.id).toBe(1);
            expect(body.displayName).toBe('Lewis Hamilton');
            expect(body.email).toBe('lewishamilton@gmail.com');
            expect(body.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
            done();
          });
      });
  });

  it('Será validado que não é possível listar um usuário inexistente', (done) => {
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
          .get('/user/9999')
          .set('Authorization', token)
          .expect(404)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('Usuário não existe');
            done();
          });
      });
  });

  it('Será validado que não é possível listar um determinado usuário sem o token na requisição', (done) => {
    supertest(app)
      .get('/user/1')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível listar um determinado usuário com o token inválido', (done) => {
    supertest(app)
      .get('/user/1')
      .set('Authorization', 'mo3183bfbahaf')
      .expect(401)
      .then((responseSales) => {
        const { body } = responseSales;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
