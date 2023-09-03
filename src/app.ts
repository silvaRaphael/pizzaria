import './infrastructure/config';

import express from 'express';
import { create } from 'express-handlebars';

import routes from './interfaces/routes';
import webRoutes from './interfaces/web/routes';

const app = express();

const hbs = create({
  extname: '.hbs',
  helpers: {
    defaultPath: () => 'http://localhost:3000',
    isEqual(value1: any, value2: any) {
      return value1 === value2;
    },
    isDifferent(value1: any, value2: any) {
      return value1 !== value2;
    },
  },
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes);
app.use('/', webRoutes);

export { app };
