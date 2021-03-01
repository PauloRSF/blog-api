import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  it('Será validado que é possível fazer login com sucesso', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: '123456'
      })
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.token).not.toBeNull();
        done();
      });
  });

  it('Será validado que não é possível fazer login sem o campo `email`', (done) => {
    supertest(app)
      .post('/login')
      .send({
        password: '123456'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"email" is required');
        done();
      });
  });

  it('Será validado que não é possível fazer login sem o campo `password`', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"password" is required');
        done();
      });
  });

  it('Será validado que não é possível fazer login com o campo `email` em branco', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: '',
        password: '123456'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"email" is not allowed to be empty');
        done();
      });
  });

  it('Será validado que não é possível fazer login com o campo `password` em branco', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'lewishamilton@gmail.com',
        password: ''
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"password" is not allowed to be empty');
        done();
      });
  });

  it('Será validado que não é possível fazer login com um usuário que não existe', (done) => {
    supertest(app)
      .post('/login')
      .send({
        email: 'senna@gmail.com',
        password: '123456'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Campos inválidos');
        done();
      });
  });
});
