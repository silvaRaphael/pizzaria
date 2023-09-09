import { Router } from 'express';

import { pageContext } from '../../utils/page-context';

const router = Router();

router.get('/', (req, res) => {
  if (req.query.s) {
    return res.render('home', {
      title: `Pesquisa - ${req.query.s}`,
      ...pageContext(req, { url: undefined }),
    });
  }

  res.render('pages/home', { title: 'Pizzaria', ...pageContext(req) });
});

export default router;
