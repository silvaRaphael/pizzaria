import { Router } from 'express';

import { pageContext } from '../../../utils/page-context';

const router = Router();

router.get('/coberturas', (req, res) => {
  res.render('pizza/pizza-topping', {
    title: 'Pizza - Coberturas',
    ...pageContext(req),
  });
});

export default router;
