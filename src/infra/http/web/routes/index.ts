import { Router } from 'express';

import authRoutes from './auth-routes';
import homeRoutes from './home-routes';
import pizzaRoutes from './pizza';
import clientRoutes from './client-routes';
import orderRoutes from './order-routes';
import userRoutes from './user-routes';

const router = Router();

router.use(authRoutes);
router.use(homeRoutes);
router.use(pizzaRoutes);
router.use(clientRoutes);
router.use(orderRoutes);
router.use(userRoutes);

router.use((_, res) => {
	res.status(404).redirect('/');
});

export default router;
