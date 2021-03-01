import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint GET `/post`', () => {
  it('Será validado que é possível listar blogpost com sucesso', (done) => {
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
          .get('/post')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;

            expect(body[0].title).toBe('Post do Ano');
            expect(body[0].content).toBe('Melhor post do ano');
            expect(body[0].user.displayName).toBe('Lewis Hamilton');
            expect(body[0].user.email).toBe('lewishamilton@gmail.com');
            expect(body[0].user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
            done();
          });
      });
  });

  it('Será validado que não é possível listar blogpost sem token', (done) => {
    supertest(app)
      .get('/post')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível listar blogpost com token inválido', (done) => {
    supertest(app)
      .get('/post')
      .set('Authorization', 'gakhubde631903')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
