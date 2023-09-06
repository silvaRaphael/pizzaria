import { Router } from 'express';

import homeRoutes from './home-routes';
import pizzaRoutes from './pizza';

const router = Router();

router.use(homeRoutes);
router.use(pizzaRoutes);

export default router;
