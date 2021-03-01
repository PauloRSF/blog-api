import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint PUT `/post/:id`', () => {
  it('Será validado que é possível editar um blogpost com sucesso', (done) => {
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
          .put('/post/1')
          .set('Authorization', token)
          .send({
            title: 'Fórmula 1 editado',
            content: 'O campeão do ano! editado'
          })
          .expect(200)
          .then((response) => {
            const { body } = response;

            expect(body.title).toBe('Fórmula 1 editado');
            expect(body.content).toBe('O campeão do ano! editado');
            expect(body.userId).toBe(1);
            done();
          });
      });
  });

  it('Será validado que não é possível editar um blogpost com outro usuário', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'MichaelSchumacher@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then((response) => {
        const { body } = response;
        const token = body.token;

        supertest(app)
          .put('/post/1')
          .send({
            title: 'Fórmula 1 editado',
            content: 'O campeão do ano! editado'
          })
          .set('Authorization', token)
          .expect(401)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('Usuário não autorizado');
            done();
          });
      });
  });

  it('Será validado que não possível editar um blogpost sem token', async (done) => {
    supertest(app)
      .put('/post/1')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado'
      })
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não possível editar um blogpost com token inválido', (done) => {
    supertest(app)
      .put('/post/1')
      .send({
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado'
      })
      .set('Authorization', 'et462g5r')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });

  it('Será validado que não possível editar um blogpost sem o campo `title`', (done) => {
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
          .put('/post/1')
          .send({
            content: 'O campeão do ano! editado'
          })
          .set('Authorization', token)
          .expect(400)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('"title" is required');

            supertest(app)
              .put('/post/1')
              .send({
                content: 'O campeão do ano! editado'
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
  });

  it('Será validado que não possível editar um blogpost sem o campo `content`', (done) => {
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
          .put('/post/1')
          .send({
            title: 'Fórmula 1 editado'
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
});
