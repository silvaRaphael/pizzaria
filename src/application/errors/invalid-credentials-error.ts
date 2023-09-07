export class InvalidCredentialsError extends Error {
  public statusCode: number = 401;

  constructor(message = 'Credenciais inválidas') {
    super(message);

    this.name = 'InvalidCredentialsError';

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, InvalidCredentialsError);
  }
}
