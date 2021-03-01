import supertest from 'supertest';

import app from '../../../server';

describe('Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`', () => {
  it('Será validado que é possível buscar um blogpost pelo `title`', (done) => {
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
          .get('/post/search?q=Vamos que vamos')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;

            expect(body[0].id).toBe(2);
            expect(body[0].title).toBe('Vamos que vamos');
            expect(body[0].content).toBe('Foguete não tem ré');
            expect(body[0].user.id).toBe(1);
            expect(body[0].user.displayName).toBe('Lewis Hamilton');
            expect(body[0].user.email).toBe('lewishamilton@gmail.com');
            expect(body[0].user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');

            done();
          });
      });
  });

  it('Será validado que é possível buscar um blogpost pelo `content`', (done) => {
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
          .get('/post/search?q=Foguete não tem ré')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;

            expect(body[0].id).toBe(2);
            expect(body[0].title).toBe('Vamos que vamos');
            expect(body[0].content).toBe('Foguete não tem ré');
            expect(body[0].user.id).toBe(1);
            expect(body[0].user.displayName).toBe('Lewis Hamilton');
            expect(body[0].user.email).toBe('lewishamilton@gmail.com');
            expect(body[0].user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');

            done();
          });
      });
  });

  it('Será validado que é possível buscar todos os blogpost quando passa a busca vazia', (done) => {
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
          .get('/post/search?q=')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            const { body } = response;
            const firstBlogPost = body[0];
            const secondBlogPost = body[1];
            expect(firstBlogPost.id).toBe(1);
            expect(firstBlogPost.title).toBe('Post do Ano');
            expect(firstBlogPost.content).toBe('Melhor post do ano');
            expect(firstBlogPost.user.id).toBe(1);
            expect(firstBlogPost.user.displayName).toBe('Lewis Hamilton');
            expect(firstBlogPost.user.email).toBe('lewishamilton@gmail.com');
            expect(firstBlogPost.user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');

            expect(secondBlogPost.id).toBe(2);
            expect(secondBlogPost.title).toBe('Vamos que vamos');
            expect(secondBlogPost.content).toBe('Foguete não tem ré');
            expect(secondBlogPost.user.id).toBe(1);
            expect(secondBlogPost.user.displayName).toBe('Lewis Hamilton');
            expect(secondBlogPost.user.email).toBe('lewishamilton@gmail.com');
            expect(secondBlogPost.user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
            done();
          });
      });
  });

  it('Será validado que é possível buscar um blogpost inexistente e retornar array vazio', (done) => {
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
          .get('/post/search?q=Não existe')
          .expect(200)
          .set('Authorization', token)
          .then((response) => {
            const { body } = response;
            expect(body).toStrictEqual([]);
            done();
          });
      });
  });

  it('Será validado que não é possível buscar um blogpost sem o token', (done) => {
    supertest(app)
      .get('/post/search?q=vamos que vamos')
      .set('Authorization', '')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token não encontrado');
        done();
      });
  });

  it('Será validado que não é possível buscar um blogpost com o token inválido', (done) => {
    supertest(app)
      .get('/post/search?q=vamos que vamos')
      .set('Authorization', 'g4twg')
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe('Token expirado ou inválido');
        done();
      });
  });
});
