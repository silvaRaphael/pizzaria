import { Router } from 'express';

import { pageContext } from '../../../utils/page-context';
import { WebAuthMiddleware } from '../../../middlewares/web-auth-middleware';

const router = Router();

router.get(
	'/coberturas',
	(req, res, next) => WebAuthMiddleware(req, res, next),
	(req, res) => {
		res.render('pages/pizza/pizza-topping', {
			title: 'Pizza - Coberturas',
			...pageContext(req),
		});
	},
);

export default router;
