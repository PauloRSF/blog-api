import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint GET `post/:id`', () => {
  it('Será validado que é possível listar um blogpost com sucesso', (done) => {
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
          .get('/post/1')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;

            expect(body.id).toBe(1);
            expect(body.title).toBe('Post do Ano');
            expect(body.content).toBe('Melhor post do ano');
            expect(body.user.id).toBe(1);
            expect(body.user.displayName).toBe('Lewis Hamilton');
            expect(body.user.email).toBe('lewishamilton@gmail.com');
            expect(body.user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
            done();
          });
      });
  });

  it('Será validado que não é possível listar um blogpost sem token', (done) => {
    supertest(app)
      .get('/post/1')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível listar um blogpost com token inválido', (done) => {
    supertest(app)
      .get('/post/1')
      .set('Authorization', 'gakhubde631903')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });

  it('Será validado que não é possível listar um blogpost inexistente', (done) => {
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
          .get('/post/999')
          .set('Authorization', token)
          .expect(404)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('Post não existe');
            done();
          });
      });
  });
});
