import { Router } from 'express';

import { pageContext } from '../../../utils/page-context';

const router = Router();

router.get('/sabores', (req, res) => {
  res.render('pages/pizza/pizza-flavor', {
    title: 'Pizza - Sabores',
    ...pageContext(req),
  });
});

export default router;
