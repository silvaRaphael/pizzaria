import { Router } from 'express';

import { pageContext } from '../../utils/page-context';
import { WebAuthMiddleware } from '../../middlewares/web-auth-middleware';

const router = Router();

router.get(
	'/usuarios',
	(req, res, next) => WebAuthMiddleware(req, res, next),
	(req, res) => {
		res.render('pages/user/user', {
			title: 'Usuários',
			...pageContext(req),
		});
	},
);

export default router;
