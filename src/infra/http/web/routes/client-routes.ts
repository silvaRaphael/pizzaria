import { Router } from 'express';

import { pageContext } from '../../utils/page-context';

const router = Router();

router.get('/clientes', (req, res) => {
  res.render('client/client', {
    title: 'Cliente',
    ...pageContext(req),
  });
});

export default router;
