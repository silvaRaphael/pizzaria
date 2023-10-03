import { Request } from 'express';

export const pageContext = (
	req: Request,
	value?: any,
): {
	url: string;
	urlSteps: string[];
	query: any;
} => {
	const url = req.url.split('?')[0];
	const urlSteps = url.split('/');
	urlSteps.shift();

	return {
		url,
		urlSteps,
		query: req.query,
		token: (req.session as any).token,
		userId: (req.session as any).userId,
		...value,
	};
};
