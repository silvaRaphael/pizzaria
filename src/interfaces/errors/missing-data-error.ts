export class MissingDataError extends Error {
  public statusCode: number = 400;

  constructor(message = 'Dados faltando') {
    super(message);

    this.name = 'MissingDataError';

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, MissingDataError);
  }
}
