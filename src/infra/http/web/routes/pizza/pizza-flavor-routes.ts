import { Router } from 'express';

import { WebAuthMiddleware } from '../../../middlewares/web-auth-middleware';
import { pageContext } from '../../../utils/page-context';

const router = Router();

router.get(
	'/sabores',
	(req, res, next) => WebAuthMiddleware(req, res, next),
	(req, res) => {
		res.render('pages/pizza/pizza-flavor', {
			title: 'Pizza - Sabores',
			...pageContext(req),
		});
	},
);

export default router;
