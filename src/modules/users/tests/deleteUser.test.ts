import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint DELETE `/user/me`', () => {
  it('Será validado que é possível excluir meu usuário com sucesso', (done) => {
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
          .delete('/user/me')
          .set('Authorization', `${token}`)
          .expect(204, done);
      });
  });

  it('Será validado que não é possivel excluir meu usuário com token inválido', (done) => {
    supertest(app)
      .delete('/user/me')
      .set('Authorization', 'nhfur53sbyf84')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });

  it('Será validado que não é possivel excluir meu usuário sem o token', (done) => {
    supertest(app)
      .delete('/user/me')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });
});
