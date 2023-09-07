export class InvalidTokenError extends Error {
  public statusCode: number = 400;

  constructor(message: string = 'Token inválido') {
    super(message);

    this.name = 'InvalidTokenError';

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, InvalidTokenError);
  }
}
