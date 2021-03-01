# Blog API

Projeto desenvolvido como teste técnico para vaga de Software Engineer.

[![Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![TypeScript](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)](https://www.typescriptlang.org/)

***

## :memo: Descrição

O projeto foi desenvolvido com Typescript, TypeORM e Jest.

## :rocket: Como rodar

Antes de rodar o projeto, você deve criar um arquivo .env na pasta raiz, com os seguintes conteúdos:
```
DATABASE_URL=postgres://blog_api:Cae46h1gFRaT24dS@database:5432/blog_api_db
JWT_SECRET=imveryskilledatkeepingsecrets
JWT_EXPIRATION=86400000
```

Você pode rodar de forma manual ou usando o Dockerfile fornecido. Após clonar o projeto e entrar no diretório criado, escolha uma das opções:

### 1) Manual:
Você irá precisar:
* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/getting-started/install)
* [PostgreSQL](https://www.postgresql.org/download/)

Depois de instalar todos os requerimentos, execute os seguintes comandos:
```console
$ sudo -u postgres psql -c 'CREATE ROLE blog_api with PASSWORD 'Cae46h1gFRaT24dS' LOGIN;
$ yarn install
$ yarn dev
```

### 2) Com Docker:
Você precisará instalar o [Docker](https://www.docker.com/get-started) e o [Docker-compose](https://docs.docker.com/compose/gettingstarted/). Após isso, execute o seguinte comando:
```console
$ sudo docker-compose up
```

:tada: Pronto! A versão de desenvolvimento será iniciada e você pode utilizar o projeto através da URL `http://localhost:3333`.

## :white_check_mark: Como rodar os testes
Você pode executar os tests com o seguinte comando:
```console
$ yarn test
# ou, se estiver usando o docker-compose:
$ sudo docker-compose exec server yarn test
```
