import './infrastructure/config';

import express from 'express';

import routes from './interfaces/routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
