import dotenv from 'dotenv';

import app from './server';

dotenv.config();

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
