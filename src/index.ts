import 'reflect-metadata';
import dotenv from 'dotenv';

import connection from './config/typeorm/connection';
import app from './server';

dotenv.config();
connection.create();

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
