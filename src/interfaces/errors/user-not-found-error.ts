export class UserNotFoundError extends Error {
  public statusCode: number = 404;

  constructor(message = 'Usuário não encontrado') {
    super(message);

    this.name = 'UserNotFoundError';

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, UserNotFoundError);
  }
}
