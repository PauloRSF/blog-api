import supertest from 'supertest';

import connection from '../../../config/typeorm/connection';
import app from '../../../server';
import UserEntity from '../infra/typeorm/entities/userEntity';

import seeds from './seeds';

describe('Sua aplicação deve ter o endpoint GET `/user`', () => {
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

  it('Será validado que é possível listar todos os usuários', (done) => {
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
          .get('/user')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;
            const firstUser = body[0];
            const secondUser = body[1];
            expect(firstUser.displayName).toBe('Lewis Hamilton');
            expect(firstUser.email).toBe('lewishamilton@gmail.com');
            expect(firstUser.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
            expect(secondUser.displayName).toBe('Michael Schumacher');
            expect(secondUser.email).toBe('MichaelSchumacher@gmail.com');
            expect(secondUser.image).toBe('https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg');
            done();
          });
      });
  });

  it('Será validado que não é possível listar usuários sem o token na requisição', (done) => {
    supertest(app)
      .get('/user')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível listar usuários com o token inválido', (done) => {
    supertest(app)
      .get('/user')
      .set('Authorization', 'mo3183bfbahaf')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
