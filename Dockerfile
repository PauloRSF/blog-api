FROM node:14.15.0-alpine3.12

WORKDIR /code

COPY . .

RUN yarn install

CMD ["yarn", "dev"]

EXPOSE 3333
