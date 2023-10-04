export class ExpiredTokenError extends Error {
	public statusCode: number = 401;

	constructor(message: string = 'Sua sessão expirou!') {
		super(message);

		this.name = 'ExpiredTokenError';

		if (Error.captureStackTrace)
			Error.captureStackTrace(this, ExpiredTokenError);
	}
}
