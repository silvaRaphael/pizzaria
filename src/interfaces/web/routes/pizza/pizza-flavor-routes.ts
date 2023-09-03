import { Router } from 'express';

const router = Router();

router.get('/sabores', (req, res) => {
  res.render('pizza/pizza-flavor', {
    title: 'Pizza - Sabores',
    path: req.url,
  });
});

export default router;
