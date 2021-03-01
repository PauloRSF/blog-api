import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint POST `/user`', () => {
  it('Será validado que é possível cadastrar um usuário com sucesso', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(201)
      .then((response) => {
        const { body } = response;
        expect(body.token).not.toBeNull();
        done();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"displayName" length must be at least 8 characters long');
        done();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"email" must be a valid email');
        done();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: '@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"email" must be a valid email');
        done();
      });
  });

  it('Será validado que o campo `email` é obrigatório', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"email" is required');
        done();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '12345',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"password" must be at least 6 characters long');
        done();
      });
  });

  it('Será validado que o campo `password` é obrigatório', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('"password" is required');
        done();
      });
  });

  it('Validar que não é possível cadastrar um usuário com email já existente', (done) => {
    supertest(app)
      .post('/user')
      .send({
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
      })
      .expect(201).then(() => {
        supertest(app)
          .post('/user')
          .send({
            displayName: 'Rubinho Barrichello',
            email: 'rubinho@gmail.com',
            password: '123456',
            image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg'
          })
          .expect(409)
          .then((response) => {
            const { body } = response;
            expect(body.message).toBe('Usuário já existe');
            done();
          });
      });
  });
});
